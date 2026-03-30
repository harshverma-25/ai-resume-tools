"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) return <p className="p-10">Loading...</p>

  return <>{children}</>
}