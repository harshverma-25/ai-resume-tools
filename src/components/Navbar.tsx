"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

        <Link href="/" className="text-xl font-bold">
          ResumeAI
        </Link>

        <div className="flex gap-6 text-sm">

          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}

        </div>

      </div>
    </nav>
  )
}