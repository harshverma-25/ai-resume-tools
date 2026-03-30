"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

        <Link href="/" className="text-xl font-bold">
          ResumeAI
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </div>

      </div>
    </nav>
  )
}