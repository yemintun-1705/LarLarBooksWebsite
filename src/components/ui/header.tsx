'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { 
  Search, 
  Bell,
  Edit3,
  User,
  LogOut,
  Settings
} from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Left side - Menu button (handled by sidebar) */}
      <div className="flex items-center space-x-4">
        {/* This space is for the sidebar toggle, handled in sidebar component */}
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-logo-purple focus:border-transparent text-white"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Write Button */}
        <Link
          href="/write"
          className="flex items-center space-x-2 bg-logo-purple hover:bg-p1 px-4 py-2 rounded-full text-white font-medium transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>Write</span>
        </Link>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Menu */}
        {session ? (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-logo-purple rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    {session.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {session.user?.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Link>
                <hr className="my-1 border-gray-700" />
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-logo-purple text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-p1 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}