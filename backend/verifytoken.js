import jwt from "jsonwebtoken"

const { verify } = jwt

export const verifytoken = (...roles) => {

  return (req, res, next) => {

    try {

      let token

      // Authorization header

      if (

        req.headers.authorization &&

        req.headers.authorization.startsWith("Bearer ")
      ) {

        token = req.headers.authorization.split(" ")[1]
      }

      // Cookie fallback

      if (!token && req.cookies.token) {

        token = req.cookies.token
      }

      // No token

      if (!token) {

        return res.status(401).json({

          message: "token missing"
        })
      }

      // Verify token

      const decoded = verify(

        token,

        process.env.Secret_key
      )

      req.user = decoded

      // Role check
      const userRole = decoded.role?.toLowerCase()

      if (roles.length > 0) {
        // If the route requires "user" and the person is an "admin", let them through.
        // Otherwise, strictly check if their role is in the list.
        const isAuthorized = roles.includes(userRole) || (roles.includes("user") && userRole === "admin")

        if (!isAuthorized) {
          return res.status(403).json({
            message: "access denied"
          })
        }
      }

      next()

    } catch (err) {

      console.log(err)

      return res.status(403).json({

        message: "invalid token"
      })
    }
  }
}