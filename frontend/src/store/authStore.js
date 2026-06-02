import { create } from "zustand"

const useAuthStore = create((set) => ({

  user: null,

  setUser: (userdata) =>

    set({
      user: userdata
    }),

  logout: () =>

    set({
      user: null
    })

}))

export default useAuthStore