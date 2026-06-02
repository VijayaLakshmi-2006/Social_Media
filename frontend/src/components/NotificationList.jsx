function NotificationList() {

  const notifications = [

    {
      id: 1,
      text: "Akhil liked your AI project post 🚀"
    },

    {
      id: 2,
      text: "Sanjana sent you a collaboration request 🤝"
    },

    {
      id: 3,
      text: "New developer joined your network 🌌"
    }

  ]

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl mb-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-6 text-indigo-400">

        Notifications 

      </h2>

      <div className="space-y-4">

        {
          notifications.map((item) => (

            <div

              key={item.id}

              className="bg-slate-900/60 border border-white/10 p-4 rounded-2xl hover:bg-slate-800/70 transition duration-300"
            >

              <p className="text-slate-200">

                {item.text}

              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default NotificationList