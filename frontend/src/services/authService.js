import api from "./api"

export const loginUser = async (userdata) => {

  const response = await api.post(

    "/auth-api/login",

    userdata

  )

  return response.data
}