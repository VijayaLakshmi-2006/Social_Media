import api from "./api"

export const sendRequest = async (
  postid
) => {

  const response = await api.post(

    "/request-api/send",

    { postid }
  )

  return response.data
}

export const getRequests = async () => {

  const response = await api.get(

    "/request-api"
  )

  return response.data.payload
}

export const updateRequest = async (
  id,
  status
) => {

  const response = await api.put(

    `/request-api/${id}`,

    { status }
  )

  return response.data
}