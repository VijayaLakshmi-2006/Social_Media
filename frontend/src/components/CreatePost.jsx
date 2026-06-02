import { useState } from "react"
import toast from "react-hot-toast"
import { createPost } from "../services/postService"

function CreatePost({ fetchPosts }) {

  const [content, setContent] = useState("")

  const [posttype, setPosttype] = useState("normal")

  const [image, setImage] = useState(null)

  const handlePost = async () => {

    if (!content.trim()) return

    try {

      const formData = new FormData()

      formData.append("content", content)

      formData.append("posttype", posttype)

      if (image) {

        formData.append("image", image)
      }

      await createPost(formData)
toast.success(

  "Post created successfully 🚀"
)
      setContent("")

      setImage(null)

      fetchPosts()

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl">

      <textarea

        placeholder="Share your ideas, projects or thoughts..."

        value={content}

        onChange={(e) => setContent(e.target.value)}

        className="w-full h-32 bg-slate-900/70 border border-white/10 p-5 rounded-2xl outline-none resize-none"
      />

      <div className="flex flex-wrap gap-4 mt-5">

        <select

          value={posttype}

          onChange={(e) => setPosttype(e.target.value)}

          className="bg-slate-900/70 border border-white/10 px-4 py-3 rounded-xl outline-none"
        >

          <option value="normal">

            Normal
          </option>

          <option value="collaboration">

            Collaboration
          </option>

          <option value="internship">

            Internship
          </option>

          <option value="study">

            Study
          </option>

        </select>

        <input

          type="file"

          onChange={(e) =>

            setImage(e.target.files[0])
          }

          className="bg-slate-900/70 border border-white/10 px-4 py-3 rounded-xl"
        />

      </div>

      <button

        onClick={handlePost}

        className="mt-6 bg-indigo-500 px-8 py-4 rounded-2xl hover:bg-indigo-600 transition duration-300 hover:scale-105"
      >

        Post 

      </button>

    </div>
  )
}

export default CreatePost