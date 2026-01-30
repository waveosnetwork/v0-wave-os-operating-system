"use client"

import { useState, useCallback } from "react"
import SettingsWindow from "@/components/waveos/settings-window"
import FileManagerWindow from "@/components/waveos/file-manager-window"
import BrowserWindow from "@/components/waveos/browser-window"
import Taskbar from "@/components/waveos/taskbar"

type WindowState = {
  isOpen: boolean
  isFullscreen: boolean
  position: { x: number; y: number }
}

export default function DesktopScreen() {
  const [settingsWindow, setSettingsWindow] = useState<WindowState>({
    isOpen: false,
    isFullscreen: false,
    position: { x: 100, y: 50 },
  })
  const [fileManagerWindow, setFileManagerWindow] = useState<WindowState>({
    isOpen: false,
    isFullscreen: false,
    position: { x: 150, y: 100 },
  })
  const [browserWindow, setBrowserWindow] = useState<WindowState>({
    isOpen: false,
    isFullscreen: false,
    position: { x: 80, y: 30 },
  })
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [accentColor, setAccentColor] = useState("#7AD0BD")

  const bgColor = theme === "dark" ? "#0C111C" : "#E8ECF4"

  const handleOpenApp = useCallback((appId: string) => {
    switch (appId) {
      case "settings":
        setSettingsWindow((prev) => ({ ...prev, isOpen: true }))
        break
      case "files":
        setFileManagerWindow((prev) => ({ ...prev, isOpen: true }))
        break
      case "browser":
        setBrowserWindow((prev) => ({ ...prev, isOpen: true }))
        break
    }
  }, [])

  const openApps = [
    settingsWindow.isOpen && "settings",
    fileManagerWindow.isOpen && "files",
    browserWindow.isOpen && "browser",
  ].filter(Boolean) as string[]

  return (
    <main
      className="min-h-screen relative overflow-hidden select-none"
      style={{ backgroundColor: bgColor }}
    >
      {/* Desktop Icons */}
      <div className="p-4 flex flex-col gap-4">
        {/* Settings App */}
        <button
          onDoubleClick={() => handleOpenApp("settings")}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors w-20 cursor-pointer"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#2A3040" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke={accentColor}
                strokeWidth="2"
              />
              <path
                d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74493 20.1656 6.23584 20.3766 5.705 20.3766C5.17416 20.3766 4.66507 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95226 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87226 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74493 3.62343 6.23584 3.62343 5.705C3.62343 5.17416 3.83445 4.66507 4.21 4.29C4.58507 3.91445 5.09416 3.70343 5.625 3.70343C6.15584 3.70343 6.66493 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95226 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87226 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58507 20.2966 5.09416 20.2966 5.625C20.2966 6.15584 20.0856 6.66493 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z"
                stroke={accentColor}
                strokeWidth="2"
              />
            </svg>
          </div>
          <span
            className="text-xs text-center"
            style={{ color: theme === "dark" ? "white" : "#0C111C" }}
          >
            Settings
          </span>
        </button>

        {/* File Manager App */}
        <button
          onDoubleClick={() => handleOpenApp("files")}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors w-20 cursor-pointer"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#2A3040" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-xs text-center"
            style={{ color: theme === "dark" ? "white" : "#0C111C" }}
          >
            Files
          </span>
        </button>

        {/* Browser App */}
        <button
          onDoubleClick={() => handleOpenApp("browser")}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors w-20 cursor-pointer"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#2A3040" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke={accentColor} strokeWidth="2" />
              <line x1="2" y1="12" x2="22" y2="12" stroke={accentColor} strokeWidth="2" />
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                stroke={accentColor}
                strokeWidth="2"
              />
            </svg>
          </div>
          <span
            className="text-xs text-center"
            style={{ color: theme === "dark" ? "white" : "#0C111C" }}
          >
            Browser
          </span>
        </button>
      </div>

      {/* Settings Window */}
      {settingsWindow.isOpen && (
        <SettingsWindow
          isFullscreen={settingsWindow.isFullscreen}
          position={settingsWindow.position}
          onClose={() => setSettingsWindow((prev) => ({ ...prev, isOpen: false }))}
          onToggleFullscreen={() =>
            setSettingsWindow((prev) => ({
              ...prev,
              isFullscreen: !prev.isFullscreen,
            }))
          }
          onPositionChange={(pos) =>
            setSettingsWindow((prev) => ({ ...prev, position: pos }))
          }
          theme={theme}
          setTheme={setTheme}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />
      )}

      {/* File Manager Window */}
      {fileManagerWindow.isOpen && (
        <FileManagerWindow
          isFullscreen={fileManagerWindow.isFullscreen}
          position={fileManagerWindow.position}
          onClose={() => setFileManagerWindow((prev) => ({ ...prev, isOpen: false }))}
          onToggleFullscreen={() =>
            setFileManagerWindow((prev) => ({
              ...prev,
              isFullscreen: !prev.isFullscreen,
            }))
          }
          onPositionChange={(pos) =>
            setFileManagerWindow((prev) => ({ ...prev, position: pos }))
          }
          theme={theme}
          accentColor={accentColor}
        />
      )}

      {/* Browser Window */}
      {browserWindow.isOpen && (
        <BrowserWindow
          isFullscreen={browserWindow.isFullscreen}
          position={browserWindow.position}
          onClose={() => setBrowserWindow((prev) => ({ ...prev, isOpen: false }))}
          onToggleFullscreen={() =>
            setBrowserWindow((prev) => ({
              ...prev,
              isFullscreen: !prev.isFullscreen,
            }))
          }
          onPositionChange={(pos) =>
            setBrowserWindow((prev) => ({ ...prev, position: pos }))
          }
          theme={theme}
          accentColor={accentColor}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        theme={theme}
        accentColor={accentColor}
        openApps={openApps}
        onOpenApp={handleOpenApp}
      />
    </main>
  )
}
