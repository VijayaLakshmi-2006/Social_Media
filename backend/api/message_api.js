import exp from "express"

import { messagemodel } from "../models/message_model.js"

import { usermodel } from "../models/user_model.js"

import { verifytoken } from "../verifytoken.js"

export const messageapp = exp.Router()

// SEND MESSAGE

messageapp.post(

  "/",

  verifytoken("user"),

  async (req, res) => {

    try {

      const sender = req.user.id

      const {

        receiver,

        text

      } = req.body

      if (!receiver || !text) {

        return res.status(400).json({

          message: "receiver and text required"
        })
      }

      const newmessage = new messagemodel({

        sender,

        receiver,

        text
      })

      const receiverUser = await usermodel.findById(receiver)
      if (receiverUser && receiverUser.isPrivate) {
        const isFollower = receiverUser.followers.some(id => id.toString() === sender.toString())
        const isFollowing = receiverUser.following.some(id => id.toString() === sender.toString())

        if (!isFollower && !isFollowing) {
          return res.status(403).json({
            message: "You should follow the user first to send messages."
          })
        }
      }

      await newmessage.save()

      res.status(201).json({

        message: "message sent",

        payload: newmessage
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "server error"
      })
    }
  }
)


// GET CONVERSATIONS

messageapp.get(

  "/conversations",

  verifytoken("user"),

  async (req, res) => {

    try {

      const currentuserid = req.user.id

      const messages = await messagemodel.find({

        $or: [

          { sender: currentuserid },

          { receiver: currentuserid }
        ]
      }).sort({ createdAt: -1 })

      const usersmap = new Map()

      messages.forEach((msg) => {

        const senderid =

          msg.sender.toString()

        const receiverid =

          msg.receiver.toString()

        if (

          senderid !== currentuserid
        ) {

          usersmap.set(senderid, true)
        }

        if (

          receiverid !== currentuserid
        ) {

          usersmap.set(receiverid, true)
        }
      })

      const uniqueids = Array.from(

        usersmap.keys()
      )

   const users = await Promise.all(

  uniqueids.map(async (userid) => {

    const user = await usermodel.findById(userid)

    const unreadCount = await messagemodel.countDocuments({

      sender: userid,

      receiver: currentuserid,

      seen: false
    })

    return {

      ...user.toObject(),

      unreadCount
    }
  })
)

      res.status(200).json({

        payload: users
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "server error"
      })
    }
  }
)


// GET CHAT BETWEEN TWO USERS

messageapp.get(

  "/:userid",

  verifytoken("user"),

  async (req, res) => {

    try {

      const currentuserid = req.user.id

      const otheruserid = req.params.userid
await messagemodel.updateMany(

  {

    sender: otheruserid,

    receiver: currentuserid,

    seen: false
  },

  {

    seen: true
  }
)
      const messages = await messagemodel.find({

        $or: [

          {
            sender: currentuserid,
            receiver: otheruserid
          },

          {
            sender: otheruserid,
            receiver: currentuserid
          }
        ]
      })

      .sort({

        createdAt: 1
      })

      res.status(200).json({

        message: "chat messages",

        payload: messages
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "server error"
      })
    }
  }
)