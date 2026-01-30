"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

type App = {
  id: string
  name: string
  icon: React.ReactNode
}

type TaskbarProps = {
  theme: "dark" | "light"
  accentColor: string
  openApps: string[]
  onOpenApp: (appId: string) => void
}

export default function Taskbar({ theme, accentColor, openApps, onOpenApp }: TaskbarProps) {
  const [time, setTime] = useState(new Date())
  const [showPowerMenu, setShowPowerMenu] = useState(false)
  const [showAppDrawer, setShowAppDrawer] = useState(false)
  const powerMenuRef = useRef<HTMLDivElement>(null)
  const appDrawerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (powerMenuRef.current && !powerMenuRef.current.contains(e.target as Node)) {
        setShowPowerMenu(false)
      }
      if (appDrawerRef.current && !appDrawerRef.current.contains(e.target as Node)) {
        setShowAppDrawer(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const bgColor = theme === "dark" ? "#0C111C" : "#E8ECF4"
  const textColor = theme === "dark" ? "white" : "#0C111C"
  const borderColor = theme === "dark" ? "#2A3040" : "#D1D5DB"
  const hoverBg = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  const menuBg = theme === "dark" ? "#1A202E" : "#FFFFFF"

  const apps: App[] = [
    {
      id: "settings",
      name: "Settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "files",
      name: "Files",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "browser",
      name: "Browser",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ]

  const handleSignOut = () => {
    setShowPowerMenu(false)
    router.push("/startup")
  }

  const handlePowerOff = () => {
    setShowPowerMenu(false)
    router.push("/")
  }

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-between px-4"
      style={{
        backgroundColor: bgColor,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      {/* Left side - App Drawer Button */}
      <div className="flex items-center gap-2 relative" ref={appDrawerRef}>
        <button
          onClick={() => setShowAppDrawer(!showAppDrawer)}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: showAppDrawer ? hoverBg : "transparent" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>

        {/* App Drawer */}
        {showAppDrawer && (
          <div
            className="absolute bottom-full left-0 mb-2 p-3 rounded-xl shadow-2xl min-w-[200px]"
            style={{ backgroundColor: menuBg, border: `1px solid ${borderColor}` }}
          >
            <p className="text-xs font-medium mb-2 opacity-50" style={{ color: textColor }}>
              All Apps
            </p>
            <div className="flex flex-col gap-1">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onOpenApp(app.id)
                    setShowAppDrawer(false)
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  {app.icon}
                  <span className="text-sm" style={{ color: textColor }}>
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center - Pinned/Open Apps */}
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="p-2.5 rounded-xl transition-all relative"
            style={{
              backgroundColor: openApps.includes(app.id) ? hoverBg : "transparent",
            }}
            title={app.name}
          >
            {app.icon}
            {openApps.includes(app.id) && (
              <div
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right side - System tray */}
      <div className="flex items-center gap-3">
        {/* WiFi Icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12.55C6.97656 10.9067 9.45814 10 12.0156 10C14.573 10 17.0546 10.9067 19.0312 12.55"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.42 9C4.24 6.28 8.04 4.5 12.24 4.5C16.44 4.5 20.24 6.28 23.06 9"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M8.53 16.11C9.5715 15.395 10.7946 15.0098 12.0475 15.0098C13.3004 15.0098 14.5235 15.395 15.565 16.11"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="20" r="1" fill={textColor} />
        </svg>

        {/* Battery Icon */}
        <svg
          width="24"
          height="18"
          viewBox="0 0 28 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="22"
            height="14"
            rx="3"
            stroke={textColor}
            strokeWidth="2"
          />
          <rect x="3" y="3" width="16" height="10" rx="1" fill={accentColor} />
          <rect x="24" y="5" width="3" height="6" rx="1" fill={textColor} />
        </svg>

        {/* Time */}
        <span style={{ color: textColor }} className="text-sm font-medium min-w-[70px] text-right">
          {formatTime(time)}
        </span>

        {/* Power Menu */}
        <div className="relative" ref={powerMenuRef}>
          <button
            onClick={() => setShowPowerMenu(!showPowerMenu)}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: showPowerMenu ? hoverBg : "transparent" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </button>

          {/* Power Menu Dropdown */}
          {showPowerMenu && (
            <div
              className="absolute bottom-full right-0 mb-2 p-2 rounded-xl shadow-2xl min-w-[160px]"
              style={{ backgroundColor: menuBg, border: `1px solid ${borderColor}` }}
            >
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-sm" style={{ color: textColor }}>
                  Sign Out
                </span>
              </button>
              <button
                onClick={handlePowerOff}
                className="flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors hover:bg-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
                <span className="text-sm text-red-500">
                  Power Off
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
