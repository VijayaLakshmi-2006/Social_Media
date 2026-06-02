import exp from "express"

import { notificationmodel } from "../models/notification_model.js"

import { verifytoken } from "../verifytoken.js"

export const notificationapp = exp.Router()


// GET ALL NOTIFICATIONS

notificationapp.get(

  "/",

  verifytoken("user"),

  async (req, res) => {

    try {

      const userid = req.user.id

      const notifications = await notificationmodel

        .find({

          user: userid
        })

        .populate("sender")

        .populate("post")

        .sort({

          createdAt: -1
        })

      res.status(200).json({

        message: "notifications fetched successfully",

        payload: notifications
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "server error"
      })
    }
  }
)


// MARK AS READ

notificationapp.put(

  "/:id",

  verifytoken("user"),

  async (req, res) => {

    try {

      const notification = await notificationmodel.findById(

        req.params.id
      )

      if (!notification) {

        return res.status(404).json({

          message: "notification not found"
        })
      }

      notification.isread = true

      await notification.save()

      res.status(200).json({

        message: "notification marked as read",

        payload: notification
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "server error"
      })
    }
  }
)