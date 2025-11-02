'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Home, 
  BookOpen, 
  Bookmark, 
  Plus, 
  Users, 
  CreditCard,
  Menu,
  X
} from 'lucide-react'

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/', active: true },
  { icon: BookOpen, label: 'My Library', href: '/library' },
  { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
  { icon: Plus, label: 'Add Book', href: '/add-book' },
  { icon: Users, label: 'Authors', href: '/authors' },
  { icon: CreditCard, label: 'Purchases', href: '/purchases' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-logo-purple rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">LarLar Books</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-logo-purple text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Reading Goal</h4>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-logo-purple h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-400">6 of 10 books read</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}