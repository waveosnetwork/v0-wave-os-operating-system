"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"

type SettingsWindowProps = {
  isFullscreen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onToggleFullscreen: () => void
  onPositionChange: (pos: { x: number; y: number }) => void
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
  accentColor: string
  setAccentColor: (color: string) => void
}

const accentColors = [
  { name: "Teal", value: "#7AD0BD" },
  { name: "Blue", value: "#5B9BD5" },
  { name: "Purple", value: "#9B7AD0" },
  { name: "Pink", value: "#D07A9B" },
  { name: "Orange", value: "#D0A07A" },
  { name: "Green", value: "#7AD07A" },
]

export default function SettingsWindow({
  isFullscreen,
  position,
  onClose,
  onToggleFullscreen,
  onPositionChange,
  theme,
  setTheme,
  accentColor,
  setAccentColor,
}: SettingsWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const bgColor = theme === "dark" ? "#161B27" : "#F0F4F8"
  const textColor = theme === "dark" ? "white" : "#0C111C"
  const mutedColor = theme === "dark" ? "#6D737B" : "#6B7280"
  const borderColor = theme === "dark" ? "#2A3040" : "#D1D5DB"

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      onPositionChange({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, onPositionChange])

  return (
    <div
      ref={windowRef}
      className="absolute rounded-xl overflow-hidden shadow-2xl"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        ...(isFullscreen
          ? { top: 0, left: 0, right: 0, bottom: 48, width: "100%", height: "calc(100% - 48px)" }
          : { top: position.y, left: position.x, width: 500, height: 400 }),
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-move"
        style={{ borderBottom: `1px solid ${borderColor}` }}
        onMouseDown={handleMouseDown}
      >
        <span style={{ color: textColor }} className="font-medium">
          Settings
        </span>
        <div className="flex items-center gap-2">
          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isFullscreen ? (
                <path
                  d="M8 3V5C8 6.10457 7.10457 7 6 7H4M16 3V5C16 6.10457 16.8954 7 18 7H20M8 21V19C8 17.8954 7.10457 17 6 17H4M16 21V19C16 17.8954 16.8954 17 18 17H20"
                  stroke={mutedColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
                  stroke={mutedColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke={mutedColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-auto" style={{ height: "calc(100% - 52px)" }}>
        {/* Appearance Section */}
        <div className="mb-8">
          <h3
            className="text-sm font-medium mb-4"
            style={{ color: accentColor }}
          >
            Appearance
          </h3>

          {/* Theme Toggle */}
          <div className="mb-6">
            <label className="text-sm mb-3 block" style={{ color: mutedColor }}>
              Theme
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme("dark")}
                className="flex-1 py-3 px-4 rounded-lg transition-all cursor-pointer"
                style={{
                  backgroundColor: theme === "dark" ? accentColor : "transparent",
                  border: `1px solid ${theme === "dark" ? accentColor : borderColor}`,
                  color: theme === "dark" ? "#0C111C" : textColor,
                }}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme("light")}
                className="flex-1 py-3 px-4 rounded-lg transition-all cursor-pointer"
                style={{
                  backgroundColor: theme === "light" ? accentColor : "transparent",
                  border: `1px solid ${theme === "light" ? accentColor : borderColor}`,
                  color: theme === "light" ? "#0C111C" : textColor,
                }}
              >
                Light
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="text-sm mb-3 block" style={{ color: mutedColor }}>
              Accent Color
            </label>
            <div className="grid grid-cols-6 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className="w-10 h-10 rounded-full transition-all cursor-pointer"
                  style={{
                    backgroundColor: color.value,
                    border:
                      accentColor === color.value
                        ? "3px solid white"
                        : "3px solid transparent",
                    boxShadow:
                      accentColor === color.value
                        ? `0 0 0 2px ${color.value}`
                        : "none",
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3
            className="text-sm font-medium mb-4"
            style={{ color: accentColor }}
          >
            About
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span style={{ color: mutedColor }}>OS</span>
              <span style={{ color: textColor }}>WAVEos</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: mutedColor }}>Version</span>
              <span style={{ color: textColor }}>1.5</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: mutedColor }}>Created by</span>
              <span style={{ color: textColor }}>ch_se</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
