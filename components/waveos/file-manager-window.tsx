"use client"

import React from "react"

import { useState, useEffect } from "react"

type FileManagerWindowProps = {
  isFullscreen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onToggleFullscreen: () => void
  onPositionChange: (pos: { x: number; y: number }) => void
  theme: "dark" | "light"
  accentColor: string
}

const mockFiles = [
  { name: "Documents", type: "folder" },
  { name: "Downloads", type: "folder" },
  { name: "Pictures", type: "folder" },
  { name: "Music", type: "folder" },
  { name: "Videos", type: "folder" },
  { name: "readme.txt", type: "file" },
  { name: "notes.txt", type: "file" },
  { name: "config.json", type: "file" },
]

export default function FileManagerWindow({
  isFullscreen,
  position,
  onClose,
  onToggleFullscreen,
  onPositionChange,
  theme,
  accentColor,
}: FileManagerWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const bgColor = theme === "dark" ? "#161B27" : "#F0F4F8"
  const textColor = theme === "dark" ? "white" : "#0C111C"
  const mutedColor = theme === "dark" ? "#6D737B" : "#6B7280"
  const borderColor = theme === "dark" ? "#2A3040" : "#D1D5DB"
  const hoverColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"

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
      className="absolute rounded-xl overflow-hidden shadow-2xl"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        ...(isFullscreen
          ? { top: 0, left: 0, right: 0, bottom: 48, width: "100%", height: "calc(100% - 48px)" }
          : { top: position.y, left: position.x, width: 600, height: 450 }),
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-move"
        style={{ borderBottom: `1px solid ${borderColor}` }}
        onMouseDown={handleMouseDown}
      >
        <span style={{ color: textColor }} className="font-medium">
          File Manager
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

      {/* Path Bar */}
      <div
        className="px-4 py-2"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div
          className="px-3 py-1.5 rounded-md text-sm"
          style={{ backgroundColor: theme === "dark" ? "#0C111C" : "#E8ECF4", color: mutedColor }}
        >
          /home/user
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-auto" style={{ height: "calc(100% - 100px)" }}>
        <div className="grid grid-cols-4 gap-4">
          {mockFiles.map((file) => (
            <button
              key={file.name}
              className="flex flex-col items-center gap-2 p-3 rounded-lg transition-colors cursor-pointer"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {file.type === "folder" ? (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                    fill={accentColor}
                    stroke={accentColor}
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke={mutedColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke={mutedColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span
                className="text-xs text-center truncate w-full"
                style={{ color: textColor }}
              >
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
