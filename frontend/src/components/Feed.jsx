import PostCard from "./PostCard"

function Feed({

  posts = [],

  fetchPosts
}) {

  if (posts.length === 0) {

    return (

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-3xl text-center mt-6">

        <h2 className="text-3xl font-bold text-indigo-400">

          No Posts Yet 🌌

        </h2>

        <p className="text-slate-400 mt-4 text-lg">

          Start collaborating by creating your first project idea or discussion post.
        </p>

      </div>
    )
  }

  return (

    <div>

      {
        posts.map((post) => (

          <PostCard

            key={post._id}

            post={post}

            fetchPosts={fetchPosts}
          />
        ))
      }

    </div>
  )
}

export default Feed