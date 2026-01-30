"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function StartupScreen() {
  const router = useRouter()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getGreeting = () => {
    const hour = time.getHours()
    if (hour < 12) return "Good Morning, User"
    if (hour < 18) return "Good Afternoon, User"
    return "Good Evening, User"
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "#0D111D" }}
    >
      {/* Clock Section */}
      <div className="text-center mb-12">
        <div
          className="text-6xl font-light tracking-wider mb-2"
          style={{ color: "white" }}
        >
          {formatTime(time)}
        </div>
        <div
          className="text-lg"
          style={{ color: "#6D737B" }}
        >
          {formatDate(time)}
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex gap-6">
        {/* System Information Card */}
        <div
          className="rounded-xl p-6 w-64"
          style={{
            border: "1px solid #2A3040",
            backgroundColor: "rgba(13, 17, 29, 0.8)",
          }}
        >
          <h2
            className="text-lg font-medium mb-6"
            style={{ color: "#77C8B7" }}
          >
            System Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span style={{ color: "#6D737B" }}>OS</span>
              <span style={{ color: "#6D737B" }}>WAVEos</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6D737B" }}>Version</span>
              <span style={{ color: "#6D737B" }}>1.5</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div
          className="rounded-xl p-6 w-64 flex flex-col items-center"
          style={{
            border: "1px solid #2A3040",
            backgroundColor: "rgba(13, 17, 29, 0.8)",
          }}
        >
          {/* User Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "#1A1F2E" }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="#6D737B" />
              <path
                d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                stroke="#6D737B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Greeting */}
          <p
            className="text-center mb-6"
            style={{ color: "#6D737B" }}
          >
            {getGreeting()}
          </p>

          {/* Sign In Button */}
          <button
            onClick={() => router.push("/desktop")}
            className="w-full py-2 px-6 rounded-lg font-medium transition-all hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: "#7AD0BD",
              color: "#0D111D",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  )
}
