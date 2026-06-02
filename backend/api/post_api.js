import exp from "express"

import multer from "multer"

import { postmodel } from "../models/post_model.js"

import { verifytoken } from "../verifytoken.js"

import { notificationmodel } from "../models/notification_model.js"

export const postapp = exp.Router()

// MULTER STORAGE

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() + "-" + file.originalname
    )
  }
})

const upload = multer({

  storage
})


// CREATE POST

postapp.post(

  "/post",

  verifytoken("user"),

  upload.single("image"),

  async (req, res) => {

    try {

      const newPost = new postmodel({

        user: req.user.id,

        content: req.body.content,

        posttype: req.body.posttype || "normal",

        image: req.file

          ? `https://socialmedia-clone-connectify.onrender.com/uploads/${req.file.filename}`

          : ""
      })

      await newPost.save()

      res.status(201).json({

        message: "Post created successfully 🚀",

        payload: newPost
      })

    } catch (err) {

      console.log("CREATE POST ERROR =>", err)

      res.status(500).json({

        message: "Error creating post"
      })
    }
  }
)


// GET ALL POSTS

postapp.get(

  "/posts",

  async (req, res) => {

    try {

      const postlist = await postmodel

        .find({

          ispostactive: true
        })

        .populate("user")

        .populate("replies.user")

        .sort({

          createdAt: -1
        })

      res.status(200).json({

        message: "posts fetched successfully",

        payload: postlist
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "Error fetching posts"
      })
    }
  }
)


// LIKE / UNLIKE POST

postapp.put(

  "/like",

  verifytoken("user"),

  async (req, res) => {

    try {

      const { postid } = req.body

      const userid = req.user?.id

      const post = await postmodel.findById(postid)

      if (!post) {

        return res.status(404).json({

          message: "post not found"
        })
      }

      // UNLIKE

      if (

        post.likes.includes(userid)
      ) {

        post.likes = post.likes.filter(

          (id) =>

            id.toString() !== userid
        )

      }

      // LIKE

      else {

        post.likes.push(userid)

        // CREATE NOTIFICATION

        if (

          post.user.toString() !== userid
        ) {

          await notificationmodel.create({

            user: post.user,

            sender: userid,

            type: "like",

            post: post._id,

            message: "liked your post",

            isread: false
          })
        }
      }

      await post.save()

      res.status(200).json({

        message: "like updated",

        payload: post
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "Error updating like"
      })
    }
  }
)


// REPLY TO POST

postapp.put(

  "/reply",

  verifytoken("user"),

  async (req, res) => {

    try {

      const {

        postid,

        text

      } = req.body

      const userid = req.user?.id

      const post = await postmodel.findOne({

        _id: postid,

        ispostactive: true
      })

      if (!post) {

        return res.status(404).json({

          message: "post not found"
        })
      }

      post.replies.push({

        user: userid,

        text
      })

      await post.save()

      // CREATE NOTIFICATION

      if (

        post.user.toString() !== userid
      ) {

        await notificationmodel.create({

          user: post.user,

          sender: userid,

          type: "reply",

          post: post._id,

          message: `replied: "${text}"`,

          isread: false
        })
      }

      res.status(200).json({

        message: "reply added",

        payload: post
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "Error adding reply"
      })
    }
  }
)


// DELETE POST

postapp.delete(

  "/post/:id",

  verifytoken("user"),

  async (req, res) => {

    try {

      const postid = req.params.id

      const post = await postmodel.findById(

        postid
      )

      if (!post) {

        return res.status(404).json({

          message: "post not found"
        })
      }

      // ONLY OWNER CAN DELETE

      if (

        post.user.toString() !== req.user?.id
      ) {

        return res.status(403).json({

          message: "not authorized"
        })
      }

      await post.deleteOne()

      res.status(200).json({

        message: "post deleted permanently"
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "Error deleting post"
      })
    }
  }
)