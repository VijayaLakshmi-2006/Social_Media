import { useEffect, useState } from "react"

import {
  getRequests,
  updateRequest
} from "../services/userService"

function RequestList() {

  const [requests, setRequests] = useState([])

  useEffect(() => {

    fetchRequests()

  }, [])

  const fetchRequests = async () => {

    try {

      const data = await getRequests()

      setRequests(data)

    } catch (err) {

      console.log(err)
    }
  }

  const handleRequest = async (id, status) => {

    try {

      await updateRequest(id, status)

      fetchRequests()

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="space-y-4">

      {
        requests.map((req) => (

          <div
            key={req._id}
            className="bg-slate-800 p-5 rounded-xl"
          >

            <h2 className="text-xl font-bold">

              {req.sender?.firstname}

              {" "}

              {req.sender?.lastname}

            </h2>

            <p className="text-slate-400 mt-2">

              wants to collaborate on:

            </p>

            <p className="mt-2">

              {req.post?.content}

            </p>

            <div className="flex gap-3 mt-5">

              <button

                onClick={() =>
                  handleRequest(req._id, "accepted")
                }

                className="bg-green-500 px-4 py-2 rounded-lg"
              >

                Accept

              </button>

              <button

                onClick={() =>
                  handleRequest(req._id, "rejected")
                }

                className="bg-red-500 px-4 py-2 rounded-lg"
              >

                Reject

              </button>

            </div>

          </div>
        ))
      }

    </div>
  )
}

export default RequestList