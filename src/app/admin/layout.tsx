'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Wifi, 
  Home, 
  Users, 
  Package, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    {
      name: 'لوحة التحكم',
      href: '/admin/dashboard',
      icon: <Home className="w-5 h-5" />,
      current: pathname === '/admin/dashboard',
    },
    {
      name: 'إدارة الشبكات',
      href: '/admin/networks',
      icon: <Wifi className="w-5 h-5" />,
      current: pathname === '/admin/networks',
    },
    {
      name: 'إدارة المنتجات',
      href: '/admin/products',
      icon: <Package className="w-5 h-5" />,
      current: pathname === '/admin/products',
    },
    {
      name: 'إدارة العملاء',
      href: '/admin/customers',
      icon: <Users className="w-5 h-5" />,
      current: pathname === '/admin/customers',
    },
    {
      name: 'المعاملات المالية',
      href: '/admin/transactions',
      icon: <CreditCard className="w-5 h-5" />,
      current: pathname === '/admin/transactions',
    },
    {
      name: 'التقارير',
      href: '/admin/reports',
      icon: <BarChart3 className="w-5 h-5" />,
      current: pathname === '/admin/reports',
    },
    {
      name: 'الإعدادات',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
      current: pathname === '/admin/settings',
    },
  ]

  const handleLogout = () => {
    // هنا سيتم إضافة منطق تسجيل الخروج
    console.log('تسجيل الخروج')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">لوحة الإدارة</span>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">مدير النظام</p>
              <p className="text-xs text-gray-500">admin@wificards.com</p>
              <div className="flex items-center mt-1">
                <Shield className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-xs text-red-600 font-medium">مشرف</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-red-50 text-red-700 border-r-2 border-red-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`mr-3 ${
                  item.current ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-500'
                }`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 right-0 left-0 p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="ghost"
            fullWidth
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:mr-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">لوحة الإدارة</span>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}