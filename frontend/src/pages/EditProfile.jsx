import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import RootLayout from "../components/RootLayout"

import {

  getMyProfile,

  updateProfile

} from "../services/userService"

function EditProfile() {

  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")

  const [lastname, setLastname] = useState("")

  const [bio, setBio] = useState("")

  const [skills, setSkills] = useState("")

  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {

    fetchProfile()

  }, [])

  const fetchProfile = async () => {

    try {

      const data = await getMyProfile()

      setFirstname(data.firstname || "")

      setLastname(data.lastname || "")

      setBio(data.bio || "")

      setSkills(

        data.skills?.join(", ") || ""
      )

    } catch (err) {

      console.log(err)
    }
  }

  const handleUpdate = async () => {

    try {

      const formData = new FormData()

      formData.append("firstname", firstname)

      formData.append("lastname", lastname)

      formData.append("bio", bio)

      formData.append("skills", skills)

      if (profileImage) {

        formData.append(

          "profileImage",

          profileImage
        )
      }

      await updateProfile(formData)

      alert("Profile updated successfully 🚀")

      navigate("/profile")

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <RootLayout>

      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold mb-8 text-indigo-400">

          Edit Profile 

        </h1>

        <div className="space-y-5">

          <input

            type="text"

            placeholder="First Name"

            value={firstname}

            onChange={(e) => setFirstname(e.target.value)}

            className="w-full bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none"
          />

          <input

            type="text"

            placeholder="Last Name"

            value={lastname}

            onChange={(e) => setLastname(e.target.value)}

            className="w-full bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none"
          />

          <textarea

            placeholder="Write your bio..."

            value={bio}

            onChange={(e) => setBio(e.target.value)}

            className="w-full bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none h-32"
          />

          <input

            type="text"

            placeholder="Enter skills separated by commas"

            value={skills}

            onChange={(e) => setSkills(e.target.value)}

            className="w-full bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none"
          />

          <input

            type="file"

            onChange={(e) =>

              setProfileImage(
                e.target.files[0]
              )
            }

            className="w-full bg-slate-900/70 border border-white/10 p-4 rounded-xl"
          />

          <button

            onClick={handleUpdate}

            className="w-full bg-indigo-500 p-4 rounded-xl transition duration-300 hover:scale-105 hover:bg-indigo-600"
          >

            Save Changes

          </button>

        </div>

      </div>

    </RootLayout>
  )
}

export default EditProfile