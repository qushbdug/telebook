'use client'

import React, { useEffect } from 'react'
import { useTelegram } from '@/contexts/TelegramContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function TelegramHomePage() {
  const { user, isTelegramApp, MainButton, showAlert } = useTelegram()

  useEffect(() => {
    if (isTelegramApp) {
      // إخفاء الزر الرئيسي في الصفحة الرئيسية
      MainButton.hide()
    }
  }, [isTelegramApp, MainButton])

  if (!isTelegramApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
              <path d="M5 13a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.5a5 5 0 0 1 7 0"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <line x1="12" x2="12.01" y1="20" y2="20"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">تطبيق كروت الواي فاي</h1>
          <p className="text-gray-600 mb-6">هذا التطبيق يعمل داخل Telegram فقط</p>
          <Button 
            onClick={() => window.open('https://t.me/FastCard_Ym_Bot', '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            افتح في Telegram
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-white">
              <path d="M5 13a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.5a5 5 0 0 1 7 0"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <line x1="12" x2="12.01" y1="20" y2="20"></line>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">مرحباً {user?.first_name}!</h1>
          <p className="text-gray-600 text-lg">أهلاً بك في تطبيق كروت الواي فاي</p>
        </div>

        {/* Welcome Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🎉 تم تسجيلك بنجاح!</h2>
            <p className="text-gray-600 mb-4">
              يمكنك الآن استخدام جميع ميزات التطبيق
            </p>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
          </div>
        </Card>

        {/* Main Actions */}
        <div className="space-y-4 mb-8">
          <Link href="/telegram/dashboard">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
                    <path d="M5 13a10 10 0 0 1 14 0"></path>
                    <path d="M8.5 16.5a5 5 0 0 1 7 0"></path>
                    <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                    <line x1="12" x2="12.01" y1="20" y2="20"></line>
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-semibold text-gray-900">البحث عن شبكة</h3>
                  <p className="text-gray-600">اختر شبكة واشترِ بطاقة</p>
                </div>
                <div className="text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/telegram/wallet">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-semibold text-gray-900">المحفظة</h3>
                  <p className="text-gray-600">إدارة رصيدك ومعاملاتك</p>
                </div>
                <div className="text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <Card className="p-6 mb-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">إحصائيات سريعة</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">شبكات متاحة</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">150</p>
              <p className="text-sm text-gray-600">ريال في المحفظة</p>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-500">
          <p>• اضغط على أي من الخيارات أعلاه للبدء</p>
          <p>• يمكنك التنقل بين الصفحات بسهولة</p>
          <p>• جميع العمليات آمنة ومشفرة</p>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">هل تحتاج مساعدة؟</p>
          <Button
            onClick={() => showAlert('يمكنك التواصل مع الدعم عبر البوت @FastCard_Ym_Bot')}
            className="bg-gray-600 hover:bg-gray-700 text-sm"
          >
            تواصل مع الدعم
          </Button>
        </div>
      </div>
    </div>
  )
}