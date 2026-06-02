import api from "./api"

export const getNotifications = async () => {

  const response = await api.get(

    "/notifications-api"
  )

  return response.data.payload
}

export const markAsRead = async (id) => {

  const response = await api.put(

    `/notifications-api/${id}`
  )

  return response.data
}