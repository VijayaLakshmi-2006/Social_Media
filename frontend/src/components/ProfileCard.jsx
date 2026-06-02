import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFollowers, getFollowing } from "../services/userService"

function ProfileCard({ user }) {
  const navigate = useNavigate()
  const loggedUser = JSON.parse(localStorage.getItem("user"))
  const isMe = user?._id === loggedUser?._id

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [followersList, setFollowersList] = useState([])
  const [followingList, setFollowingList] = useState([])

  const handleShowFollowers = async () => {
    if (!isMe) return
    try {
      const data = await getFollowers()
      setFollowersList(data)
      setShowFollowers(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleShowFollowing = async () => {
    if (!isMe) return
    try {
      const data = await getFollowing()
      setFollowingList(data)
      setShowFollowing(true)
    } catch (err) {
      console.log(err)
    }
  }


  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl mb-8 shadow-xl">

      <div className="flex items-center gap-5">

        {
          user?.profileImageurl ? (

            <img

              src={user.profileImageurl}

              alt="profile"

              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
            />

          ) : (

            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-bold">

              {
                user?.firstname?.charAt(0)
              }

            </div>
          )
        }

        <div>

          <h2 className="text-3xl font-bold">

            {user?.firstname}

            {" "}

            {user?.lastname}

          </h2>

          <div className="flex items-center gap-2 mt-2">

            <div className="w-3 h-3 rounded-full bg-green-500">

            </div>

            <p className="text-green-400">

              Available for collaboration
            </p>

          </div>

          <p className="text-slate-400 mt-3 text-lg">

            {user?.bio || "Passionate developer building innovative projects."}

          </p>

        </div>

      </div>

      <div className="flex gap-10 mt-8">

        <div 
          onClick={handleShowFollowers}
          className={`${isMe ? 'cursor-pointer hover:opacity-75' : ''} transition`}
        >

          <p className="text-2xl font-bold">

            {user?.followers?.length || 0}

          </p>

          <p className="text-slate-400 text-sm">

            Followers
          </p>

        </div>

        <div
          onClick={handleShowFollowing}
          className={`${isMe ? 'cursor-pointer hover:opacity-75' : ''} transition`}
        >

          <p className="text-2xl font-bold">

            {user?.following?.length || 0}

          </p>

          <p className="text-slate-400 text-sm">

            Following
          </p>

        </div>
<button

  onClick={() => {

    navigator.clipboard.writeText(

      `${window.location.origin}/user/${user?._id}`
    )

    alert("Profile link copied 🚀")
  }}

  className="mt-5 bg-indigo-500 px-5 py-3 rounded-xl hover:bg-indigo-600 transition duration-300"
>

  Share Profile 🔗

</button>
      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold text-indigo-400 mb-4">

          Tech Stack ⚡

        </h3>

        <div className="flex flex-wrap gap-3">

          {
            user?.skills?.map((skill, index) => (

              <div

                key={index}

                className="bg-indigo-500/20 border border-indigo-400/20 px-4 py-2 rounded-full text-sm hover:scale-105 transition duration-300"
              >

                {skill}

              </div>
            ))
          }

        </div>

      </div>

      {/* FOLLOWERS MODAL */}
      {showFollowers && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-indigo-400">Your Followers</h3>
              <button onClick={() => setShowFollowers(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            <div className="space-y-4">
              {followersList.length === 0 ? (
                <p className="text-slate-400 text-center">No followers yet.</p>
              ) : (
                followersList.map(u => (
                  <div key={u._id} onClick={() => { setShowFollowers(false); navigate(`/user/${u._id}`) }} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
                    {u.profileImageurl ? (
                      <img src={u.profileImageurl} className="w-12 h-12 rounded-full object-cover" alt="profile" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">{u.firstname?.charAt(0)}</div>
                    )}
                    <p className="font-bold">{u.firstname} {u.lastname}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOLLOWING MODAL */}
      {showFollowing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-indigo-400">People You Follow</h3>
              <button onClick={() => setShowFollowing(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            <div className="space-y-4">
              {followingList.length === 0 ? (
                <p className="text-slate-400 text-center">You are not following anyone.</p>
              ) : (
                followingList.map(u => (
                  <div key={u._id} onClick={() => { setShowFollowing(false); navigate(`/user/${u._id}`) }} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
                    {u.profileImageurl ? (
                      <img src={u.profileImageurl} className="w-12 h-12 rounded-full object-cover" alt="profile" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold">{u.firstname?.charAt(0)}</div>
                    )}
                    <p className="font-bold">{u.firstname} {u.lastname}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProfileCard