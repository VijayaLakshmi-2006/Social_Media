import api from "./api"

// ==========================
// MY PROFILE
// ==========================

export const getMyProfile = async () => {

  const response = await api.get(

    "/user-api/user"
  )

  return response.data.payload
}

// ==========================
// GET OTHER USER PROFILE
// ==========================

export const getUserById = async (id) => {

  const response = await api.get(

    `/user-api/user/${id}`
  )

  return response.data
}

// ==========================
// SEARCH USERS
// ==========================

export const searchUsers = async (name) => {

  const response = await api.get(

    `/user-api/search/${name}`
  )

  return response.data.payload
}

// ==========================
// GET ALL USERS
// ==========================

export const getAllUsers = async () => {

  const response = await api.get(

    "/user-api/users"
  )

  return response.data.payload
}

// ==========================
// UPDATE PROFILE
// ==========================

export const updateProfile = async (formData) => {

  const response = await api.put(

    "/user-api/user",

    formData,

    {
      headers: {

        "Content-Type":

          "multipart/form-data"
      }
    }
  )

  return response.data
}

// ==========================
// FOLLOW / UNFOLLOW USER
// ==========================

export const followUser = async (userid) => {

  const response = await api.put(

    "/user-api/follow",

    {
      targetuserid: userid
    }
  )

  return response.data
}

export const getFollowers = async () => {
  const response = await api.get("/user-api/followers")
  return response.data.payload
}

export const getFollowing = async () => {
  const response = await api.get("/user-api/following")
  return response.data.payload
}

// ==========================
// FOLLOW REQUESTS
// ==========================

export const getFollowRequests = async () => {

  const response = await api.get(

    "/user-api/follow-requests"
  )

  return response.data.payload
}

export const acceptFollowRequest = async (requesterid) => {

  const response = await api.put(

    "/user-api/accept-follow",

    { requesterid }
  )

  return response.data
}

export const rejectFollowRequest = async (requesterid) => {

  const response = await api.put(

    "/user-api/reject-follow",

    { requesterid }
  )

  return response.data
}

// ==========================
// PRIVACY
// ==========================

export const togglePrivacy = async () => {

  const response = await api.put(

    "/user-api/privacy"
  )

  return response.data
}

// ==========================
// NOTIFICATIONS
// ==========================

export const getNotifications = async () => {

  const response = await api.get(

    "/notifications-api"
  )

  return response.data.payload
}

// ==========================
// MESSAGES
// ==========================

export const getMessages = async (userid) => {

  const response = await api.get(

    `/message-api/${userid}`
  )

  return response.data.payload
}

export const sendMessage = async (messageData) => {

  const response = await api.post(

    "/message-api",

    messageData
  )

  return response.data
}

// ==========================
// REQUESTS
// ==========================

export const getRequests = async () => {

  const response = await api.get(

    "/request-api"
  )

  return response.data.payload
}

export const updateRequest = async (

  requestid,

  status

) => {

  const response = await api.put(

    `/request-api/${requestid}`,

    { status }
  )

  return response.data
}

export const getConversations = async () => {

  const response = await api.get(

    "/message-api/conversations"
  )

  return response.data.payload
}

// ==========================
// DELETE USER
// ==========================

export const deleteUser = async (userid) => {

  const response = await api.delete(

    `/user-api/user/${userid}`
  )

  return response.data
}