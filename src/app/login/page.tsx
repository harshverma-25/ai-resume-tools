"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! Check your email.")
    }
  }
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Login successful")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] border p-6 rounded-lg">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Login / Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 mb-2"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="w-full border p-2"
        >
          Sign Up
          
        </button>
        <button
  onClick={handleGoogleLogin}
  className="w-full bg-red-500 text-white p-2 mt-2"
>
  Sign in with Google
</button>

      </div>
    </div>
  )
}