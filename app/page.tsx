"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const router = useRouter()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    const redirectTimer = setTimeout(() => {
      router.push("/startup")
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: "#0D111D",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* WAVEos Logo */}
      <div className="mb-6">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="55" stroke="#77C8B7" strokeWidth="3" fill="none" />
          <path
            d="M25 60 Q35 40 45 60 Q55 80 65 60 Q75 40 85 60 Q95 80 95 60"
            stroke="#77C8B7"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h1
        className="text-2xl font-light tracking-wider"
        style={{ color: "rgba(255, 255, 255, 0.7)" }}
      >
        WAVEos <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>{" "}
        <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>made by ch_se</span>
      </h1>
    </main>
  )
}
