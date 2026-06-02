import exp from "express"

import { usermodel } from "../models/user_model.js"

import { hash, compare } from "bcryptjs"

import jwt from "jsonwebtoken"

import { verifytoken } from "../verifytoken.js"

export const authapp = exp.Router()

const { sign } = jwt

// REGISTER

authapp.post(

  "/register",

  async (req, res) => {

    try {

      const newuser = req.body

      // check email

      const existingUser = await usermodel.findOne({

        email: newuser.email
      })

      if (existingUser) {

        return res.status(400).json({

          message: "email already exists"
        })
      }

      // check username

      if (newuser.username) {

        const existingUsername = await usermodel.findOne({

          username: newuser.username
        })

        if (existingUsername) {

          return res.status(400).json({

            message: "username already exists"
          })
        }
      }

      // hash password

      newuser.password = await hash(

        newuser.password,

        12
      )

      // default role

      if (!newuser.role) {

        newuser.role = "user"
      }

      // create user

      const newuserdoc = new usermodel(

        newuser
      )

      await newuserdoc.save()

      res.status(201).json({

        message: "user registered successfully",

        payload: newuserdoc
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "registration failed"
      })
    }
  }
)

// LOGIN

authapp.post(

  "/login",

  async (req, res) => {

    try {

      const {

        email,

        password

      } = req.body

      const user = await usermodel.findOne({

        email
      })

      if (!user) {

        return res.status(400).json({

          message: "invalid email"
        })
      }

      // compare password

      const ismatched = await compare(

        password,

        user.password
      )

      if (!ismatched) {

        return res.status(400).json({

          message: "invalid password"
        })
      }

      // jwt token

      const signedtoken = sign(

        {

          id: user._id,

          email: user.email,

          role: user.role,

          firstname: user.firstname,

          lastname: user.lastname,

          profileImageurl: user.profileImageurl
        },

        process.env.Secret_key,

        {

          expiresIn: "1d"
        }
      )

      // cookie

      res.cookie(

        "token",

        signedtoken,

        {

          httpOnly: true,

          sameSite: "lax",

          secure: false,

          path: "/"
        }
      )

      // remove password

      let userobj = user.toObject()

      delete userobj.password

      res.status(200).json({

        message: "login success",

        token: signedtoken,

        payload: userobj
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "login failed"
      })
    }
  }
)

// LOGOUT

authapp.get(

  "/logout",

  (req, res) => {

    res.clearCookie(

      "token",

      {

        httpOnly: true,

        sameSite: "lax",

        secure: false,

        path: "/"
      }
    )

    res.status(200).json({

      message: "logout success"
    })
  }
)

// CHECK AUTH

authapp.get(

  "/check",

  verifytoken("user"),

  (req, res) => {

    res.status(200).json({

      message: "authenticated",

      payload: req.user
    })
  }
)

// CHANGE PASSWORD

authapp.put(

  "/password",

  verifytoken("user"),

  async (req, res) => {

    try {

      const userid = req.user?.id

      const {

        currentpassword,

        newpassword

      } = req.body

      const user = await usermodel.findById(

        userid
      )

      if (!user) {

        return res.status(404).json({

          message: "user not found"
        })
      }

      // current password check

      const ismatched = await compare(

        currentpassword,

        user.password
      )

      if (!ismatched) {

        return res.status(400).json({

          message: "invalid current password"
        })
      }

      // same password check

      const issame = await compare(

        newpassword,

        user.password
      )

      if (issame) {

        return res.status(400).json({

          message: "new password cannot be same"
        })
      }

      // update password

      user.password = await hash(

        newpassword,

        12
      )

      await user.save()

      res.status(200).json({

        message: "password updated successfully"
      })

    } catch (err) {

      console.log(err)

      res.status(500).json({

        message: "password update failed"
      })
    }
  }
)