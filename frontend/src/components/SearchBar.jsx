import { useState } from "react"

import { searchUsers } from "../services/userService"

function SearchBar() {

  const [keyword, setKeyword] = useState("")

  const [results, setResults] = useState([])

  const handleSearch = async (e) => {

    const value = e.target.value

    setKeyword(value)

    if (!value.trim()) {

      return setResults([])
    }

    try {

      const data = await searchUsers(value)

      setResults(data)

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="bg-slate-800 p-5 rounded-xl mb-6">

      <input

        type="text"

        placeholder="Search students, skills, developers..."

        value={keyword}

        onChange={handleSearch}

        className="w-full bg-slate-900 p-3 rounded-lg outline-none"
      />

      <div className="mt-4 space-y-3">

        {
          results.map((user) => (

            <div
              key={user._id}
              className="bg-slate-900 p-3 rounded-lg"
            >

              <p className="font-bold">

                {user.firstname}

                {" "}

                {user.lastname}

              </p>

              <p className="text-sm text-slate-400">

                {user.bio}

              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default SearchBar