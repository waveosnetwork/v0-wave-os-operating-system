"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"

type BrowserWindowProps = {
  isFullscreen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onToggleFullscreen: () => void
  onPositionChange: (pos: { x: number; y: number }) => void
  theme: "dark" | "light"
  accentColor: string
}

export default function BrowserWindow({
  isFullscreen,
  position,
  onClose,
  onToggleFullscreen,
  onPositionChange,
  theme,
  accentColor,
}: BrowserWindowProps) {
  const [url, setUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const bgColor = theme === "dark" ? "#1A202E" : "#F3F4F6"
  const headerBg = theme === "dark" ? "#0C111C" : "#E5E7EB"
  const textColor = theme === "dark" ? "white" : "#0C111C"
  const borderColor = theme === "dark" ? "#2A3040" : "#D1D5DB"
  const inputBg = theme === "dark" ? "#2A3040" : "#FFFFFF"

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return
    isDragging.current = true
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      onPositionChange({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [onPositionChange])

  const formatUrl = (input: string): string => {
    let formattedUrl = input.trim()
    
    // Check if it's a search query or URL
    if (!formattedUrl.includes(".") || formattedUrl.includes(" ")) {
      // It's a search query
      return `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}`
    }
    
    // Add https if no protocol
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl
    }
    
    return formattedUrl
  }

  const navigate = (newUrl: string) => {
    const formattedUrl = formatUrl(newUrl)
    setCurrentUrl(formattedUrl)
    setUrl(newUrl)
    setIsLoading(true)
    
    // Update history
    const newHistory = [...history.slice(0, historyIndex + 1), formattedUrl]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      navigate(url)
    }
  }

  const openInCloakedTab = () => {
    if (!currentUrl) return
    
    const newWindow = window.open("about:blank", "_blank")
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>WAVEos Browser</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body, html { width: 100%; height: 100%; overflow: hidden; }
              iframe { width: 100%; height: 100%; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${currentUrl}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe>
          </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCurrentUrl(history[historyIndex - 1])
      setUrl(history[historyIndex - 1])
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCurrentUrl(history[historyIndex + 1])
      setUrl(history[historyIndex + 1])
    }
  }

  const refresh = () => {
    if (currentUrl) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  return (
    <div
      className="absolute rounded-xl overflow-hidden shadow-2xl flex flex-col"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        ...(isFullscreen
          ? { top: 0, left: 0, right: 0, bottom: 48, width: "100%", height: "calc(100% - 48px)" }
          : { top: position.y, left: position.x, width: 800, height: 600 }),
      }}
    >
      {/* Window Header */}
      <div
        className="h-10 flex items-center justify-between px-3 cursor-move"
        style={{ backgroundColor: headerBg }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button
            onClick={onToggleFullscreen}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button
            onClick={onToggleFullscreen}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
        </div>
        <span className="text-sm font-medium" style={{ color: textColor }}>
          Browser
        </span>
        <div className="w-14" />
      </div>

      {/* URL Bar */}
      <div
        className="h-12 flex items-center gap-2 px-3"
        style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}` }}
      >
        {/* Navigation buttons */}
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
          style={{ color: textColor }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
          style={{ color: textColor }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={refresh}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: textColor }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
          <div
            className="flex-1 flex items-center rounded-lg px-3"
            style={{ backgroundColor: inputBg, border: `1px solid ${borderColor}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" className="opacity-50">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Search or enter URL"
              className="flex-1 bg-transparent outline-none px-2 py-1.5 text-sm"
              style={{ color: textColor }}
            />
            {isLoading && (
              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: accentColor }} />
            )}
          </div>
        </form>

        {/* Open in cloaked tab button */}
        <button
          onClick={openInCloakedTab}
          disabled={!currentUrl}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-30"
          style={{ backgroundColor: accentColor, color: "#0C111C" }}
        >
          Open Cloaked
        </button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative overflow-hidden">
        {currentUrl ? (
          <iframe
            src={currentUrl}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            title="Browser Content"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <svg
              width="80"
              height="80"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="55" stroke={accentColor} strokeWidth="4" fill="none" />
              <path
                d="M25 60 Q35 40 45 60 Q55 80 65 60 Q75 40 85 60 Q95 80 95 60"
                stroke={accentColor}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2" style={{ color: textColor }}>
                WAVEos Browser
              </h2>
              <p className="text-sm opacity-60" style={{ color: textColor }}>
                Enter a URL or search term above to get started
              </p>
              <p className="text-xs opacity-40 mt-2" style={{ color: textColor }}>
                Click "Open Cloaked" to open in a disguised about:blank tab
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
