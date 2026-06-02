import api from "./api"

// CREATE POST

export const createPost = async (formData) => {

  const response = await api.post(

    "/post-api/post",

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

// GET POSTS

export const getPosts = async () => {

  const response = await api.get(

    "/post-api/posts"
  )

  return response.data.payload
}

// LIKE POST

export const likePost = async (postid) => {

  const response = await api.put(

    "/post-api/like",

    { postid }
  )

  return response.data
}

// REPLY POST

export const replyPost = async (

  postid,

  text

) => {

  const response = await api.put(

    "/post-api/reply",

    {

      postid,

      text
    }
  )

  return response.data
}

// DELETE POST

export const deletePost = async (postid) => {

  const response = await api.delete(

    `/post-api/post/${postid}`
  )

  return response.data
}

export const getAllPosts = async () => {

  const response = await api.get(

    "/post-api/posts"
  )

  return response.data.payload
}