'use client'

import React, { useState, useEffect } from 'react'
import { useTelegram } from '@/contexts/TelegramContext'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const { user, isTelegramApp, MainButton, showAlert, showPopup } = useTelegram()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isTelegramApp && user) {
      // تعيين اسم المستخدم تلقائياً إذا كان متوفراً
      if (user.first_name) {
        setName(user.first_name)
      }
      
      // إعداد الزر الرئيسي
      MainButton.setText('تأكيد التسجيل')
      MainButton.show()
      MainButton.onClick(handleSubmit)
    }
  }, [isTelegramApp, user, MainButton])

  const handleSubmit = async () => {
    if (!name.trim()) {
      showAlert('يرجى إدخال الاسم')
      return
    }

    if (!phone.trim()) {
      showAlert('يرجى إدخال رقم الهاتف')
      return
    }

    if (phone.length < 10) {
      showAlert('يرجى إدخال رقم هاتف صحيح')
      return
    }

    setLoading(true)

    try {
      // هنا يمكن إضافة API call لحفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000)) // محاكاة API call
      
      showPopup('نجح التسجيل', `مرحباً ${name}! تم تسجيلك بنجاح`)
      
      // إعادة توجيه للصفحة الرئيسية
      setTimeout(() => {
        window.location.href = '/telegram/dashboard'
      }, 2000)
      
    } catch (error) {
      showAlert('حدث خطأ أثناء التسجيل')
    } finally {
      setLoading(false)
    }
  }

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
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
              <path d="M5 13a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.5a5 5 0 0 1 7 0"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <line x1="12" x2="12.01" y1="20" y2="20"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">تسجيل المستخدم</h1>
          <p className="text-gray-600">أدخل بياناتك للبدء</p>
        </div>

        {/* Form */}
        <Card className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              الاسم الكامل
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              رقم الهاتف
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05xxxxxxxx"
              className="text-right"
              dir="rtl"
            />
          </div>

          {!isTelegramApp && (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
            </Button>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>بالضغط على "تأكيد التسجيل" في Telegram</p>
            <p>سيتم حفظ بياناتك</p>
          </div>
        </Card>

        {/* User Info */}
        {user && (
          <Card className="mt-4 p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">معلومات المستخدم:</p>
            <p className="text-sm font-medium text-gray-900">
              {user.first_name} {user.last_name || ''}
            </p>
            {user.username && (
              <p className="text-xs text-gray-500">@{user.username}</p>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}