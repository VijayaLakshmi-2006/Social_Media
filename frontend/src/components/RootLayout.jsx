import { useState } from "react"

import Sidebar from "./Sidebar"

import Navbar from "./Navbar"

function RootLayout({ children }) {

  const [openMenu, setOpenMenu] = useState(false)

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-pink-500/10 blur-[140px] rounded-full"></div>

      </div>

      <Sidebar

        openMenu={openMenu}

        setOpenMenu={setOpenMenu}
      />

      <div className="md:ml-72 min-h-screen p-4 md:p-6 overflow-hidden">

        <Navbar

          openMenu={openMenu}

          setOpenMenu={setOpenMenu}
        />

        <main

          className="

            bg-white/[0.03]

            backdrop-blur-3xl

            border border-white/10

            rounded-[2rem]

            min-h-[calc(100vh-120px)]

            p-5 md:p-8

            shadow-[0_10px_60px_rgba(0,0,0,0.45)]

            overflow-hidden

          "
        >

          {children}

        </main>

      </div>

    </div>
  )
}

export default RootLayout