import { useEffect, useState } from "react"
import RootLayout from "../components/RootLayout"
import { searchUsers, getAllUsers } from "../services/userService"
import { useNavigate } from "react-router-dom"

function Explore() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // BACKEND IMPROVEMENT SUGGESTION: 
  // Implement pagination (limit & offset) for the `/users` endpoint 
  // and search endpoints to prevent fetching all users at once as the application scales.

  useEffect(() => {
    // Improved search behavior using a debounce to prevent excessive API calls
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        if (search.trim() === "") {
          const data = await getAllUsers()
          // Safer API response handling
          setUsers(Array.isArray(data) ? data : [])
        } else {
          const data = await searchUsers(search)
          setUsers(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error(err)
        // Better error handling
        setError("Failed to fetch users. Please try again later.")
        setUsers([])
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h1 className="text-5xl font-bold text-indigo-400 mb-8">
          Explore Developers 🌌
        </h1>

        {/* SEARCH BAR */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search developers..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-slate-900/70 border border-white/10 px-6 py-4 rounded-2xl outline-none text-lg placeholder:text-slate-500 focus:border-indigo-500 transition duration-300"
          />
        </div>

        {/* CONTENT AREA */}
        {/* Proper loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 border border-red-500/50 p-6 rounded-2xl text-center">
            <p className="text-red-200 text-xl">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-slate-800/70 border border-white/10 p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-bold text-indigo-400">
              No Developers Found 🚀
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/user/${user._id}`)}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 cursor-pointer hover:border-indigo-500 hover:scale-[1.02] transition duration-300 shadow-xl"
              >
                {/* PROFILE */}
                <div className="flex items-center gap-5">
                  {user.profileImageurl ? (
                    <img
                      src={user.profileImageurl}
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-bold">
                      {user.firstname?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-bold">
                      {user.firstname} {user.lastname}
                    </h2>
                    <p className="text-slate-400 mt-2">
                      {user.bio || "Passionate developer 🚀"}
                    </p>
                  </div>
                </div>

                {/* SKILLS */}
                {user.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-8">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-900/60 border border-indigo-500/30 px-5 py-2 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  )
}

export default Explore