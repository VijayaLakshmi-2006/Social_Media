import { useState } from "react"

import {

  FaHeart,

  FaComment,

  FaTrash

} from "react-icons/fa"

import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"

import {

  likePost,

  replyPost,

  deletePost

} from "../services/postService"

import useAuthStore from "../store/authStore"

dayjs.extend(relativeTime)

function PostCard({ post, fetchPosts }) {

  const [reply, setReply] = useState("")

  const { user } = useAuthStore()

  const handleReply = async () => {

    if (!reply.trim()) return

    try {

      await replyPost(post._id, reply)

      setReply("")

      if (fetchPosts) {

        fetchPosts()

      } else {

        window.location.reload()
      }

    } catch (err) {

      console.log(err)
    }
  }

  const handleDelete = async () => {

    try {

      await deletePost(post._id)

      if (fetchPosts) {

        fetchPosts()
      }

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl mb-6 transition duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/10">

      <div className="flex items-center gap-4">

        {
          post.user?.profileImageurl ? (

            <img

              src={post.user.profileImageurl}

              alt="profile"

              className="w-14 h-14 rounded-full object-cover"
            />

          ) : (

            <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-2xl font-bold">

              {
                post.user?.firstname?.charAt(0)
              }

            </div>
          )
        }

        <div>

          <h2 className="text-2xl font-bold uppercase">

            {post.user?.firstname}

            {" "}

            {post.user?.lastname}

          </h2>

          <div className="flex items-center gap-2 mt-1">

            <div className="w-3 h-3 rounded-full bg-green-500">

            </div>

            <p className="text-sm text-green-400">

              Active now

            </p>

          </div>

          <div className="flex items-center gap-3 text-slate-400 mt-2">

            <p>

              {post.posttype}

            </p>

            <span>

              •

            </span>

            <p>

              {
                dayjs(post.createdAt).fromNow()
              }

            </p>

          </div>

        </div>

      </div>

      <p className="mt-6 text-xl text-slate-200 leading-8">

        {post.content}

      </p>

      {
        post.image && (

          <img

            src={post.image}

            alt="post"

            className="w-full rounded-2xl mt-5 max-h-[500px] object-cover border border-white/10"
          />
        )
      }

      <div className="flex items-center gap-6 mt-6">

        <button

          onClick={async () => {

            await likePost(post._id)

            if (fetchPosts) {

              fetchPosts()

            } else {

              window.location.reload()
            }
          }}

          className="flex items-center gap-2 text-pink-400 text-lg transition duration-300 hover:scale-110"
        >

          <FaHeart />

          {post.likes?.length || 0}

        </button>

        <div className="flex items-center gap-2 text-slate-300 text-lg">

          <FaComment />

          {post.replies?.length || 0}

        </div>

      </div>

      {
        post.user?._id === user?._id && (

          <button

            onClick={handleDelete}

            className="flex items-center gap-2 mt-5 text-red-400 hover:text-red-500 transition duration-300"
          >

            <FaTrash />

            Delete Post

          </button>
        )
      }

      <div className="flex gap-3 mt-6">

        <input

          type="text"

          placeholder="Write a reply..."

          value={reply}

          onChange={(e) => setReply(e.target.value)}

          className="flex-1 bg-slate-900/70 border border-white/10 p-4 rounded-xl outline-none"
        />

        <button

          onClick={handleReply}

          className="bg-indigo-500 px-5 rounded-xl transition duration-300 hover:scale-105 hover:bg-indigo-600"
        >

          Reply

        </button>

      </div>

      <div className="space-y-4 mt-6">

        {
          post.replies?.map((item, index) => (

            <div

              key={index}

              className="bg-slate-900/70 border border-white/10 p-4 rounded-xl"
            >

              <p className="font-bold text-indigo-400">

                {
                  item.user?.firstname?.charAt(0)
                }

              </p>

              <p className="mt-2 text-slate-200">

                {item.text}

              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default PostCard