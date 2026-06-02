import api from "./api"

export const sendMessage = async (
  receiverid,
  text
) => {

  const response = await api.post(

    "/message-api",

    {
      receiverid,
      text
    }
  )

  return response.data
}

export const getMessages = async (
  userid
) => {

  const response = await api.get(

    `/message-api/${userid}`
  )

  return response.data.payload
}