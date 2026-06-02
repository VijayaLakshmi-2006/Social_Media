import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import UserProfile from "./pages/UserProfile"
import Messages from "./pages/Messages"
import Explore from "./pages/Explore"
import Notifications from "./pages/Notifications"
import EditProfile from "./pages/EditProfile"
import Requests from "./pages/Requests"
import AiAssistant from "./pages/AiAssistant"
import Admin from "./pages/Admin"
import PrivateRoute from "./components/PrivateRoute"
import { useEffect } from "react"
import useAuthStore from "./store/authStore"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
function App() {
const { setUser } = useAuthStore()
useEffect(() => {

  const storedUser = localStorage.getItem("user")

  if (storedUser) {

    setUser(

      JSON.parse(storedUser)
    )
  }

}, [])

  return (

    <Routes>

<Route

  path="/signup"

  element={<Signup />}
/>

      <Route
        path="/"
        element={<Login />}
      />

    <Route
  path="/home"
  element={
    <PrivateRoute>

      <Home />

    </PrivateRoute>
  }
/>
<Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/messages/:id?"
  element={<Messages />}
/>

<Route
  path="/notifications"
  element={<Notifications />}
/>

<Route
  path="/ai"
  element={<AiAssistant />}
/>
<Route
  path="/requests"
  element={<Requests />}
/>

<Route
  path="/edit-profile"
  element={<EditProfile />}
/>
<Route
  path="/explore"
  element={<Explore />}
/>
<Route
  path="/admin"
  element={<Admin />}
/>
<Route
  path="/user/:id"
  element={<UserProfile />}
/>
<Route

  path="*"

  element={<NotFound />}
/>

    </Routes>
  )
}

export default App