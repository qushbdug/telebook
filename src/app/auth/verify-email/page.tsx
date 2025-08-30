'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

export default function VerifyEmailPage() {
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResendEmail = async () => {
    setResendLoading(true)
    
    try {
      // محاكاة إرسال البريد الإلكتروني
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResendSuccess(true)
      
      // إخفاء رسالة النجاح بعد 3 ثوان
      setTimeout(() => setResendSuccess(false), 3000)
    } catch (error) {
      console.error('خطأ في إعادة إرسال البريد:', error)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">تحقق من بريدك الإلكتروني</h1>
          <p className="text-gray-600 mt-2">تم إرسال رابط التحقق إلى بريدك</p>
        </div>

        {/* Verification Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>تم إرسال رابط التحقق</CardTitle>
            <CardDescription>
              يرجى فحص بريدك الإلكتروني والنقر على رابط التحقق لتأكيد حسابك
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">ماذا يحدث بعد ذلك؟</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• تحقق من مجلد الرسائل الواردة أو الرسائل المزعجة</li>
                <li>• انقر على رابط "تأكيد الحساب" في البريد</li>
                <li>• سيتم توجيهك إلى صفحة تسجيل الدخول</li>
                <li>• يمكنك الآن تسجيل الدخول بحسابك الجديد</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">ملاحظات مهمة</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• رابط التحقق صالح لمدة 24 ساعة فقط</li>
                <li>• إذا لم تستلم البريد، تحقق من عنوان البريد المدخل</li>
                <li>• يمكنك طلب إعادة إرسال رابط التحقق</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-4">
            <Button
              onClick={handleResendEmail}
              loading={resendLoading}
              variant="outline"
              fullWidth
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              {resendLoading ? 'جاري الإرسال...' : 'إعادة إرسال رابط التحقق'}
            </Button>

            {resendSuccess && (
              <div className="w-full p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 text-center">
                  تم إرسال رابط التحقق بنجاح! تحقق من بريدك الإلكتروني
                </p>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                تذكرت كلمة المرور؟{' '}
                <Link 
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">هل تحتاج مساعدة؟</h3>
            <p className="text-sm text-gray-600 mb-4">
              إذا واجهت أي مشكلة في عملية التحقق، لا تتردد في التواصل معنا
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/support"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-sm"
              >
                مركز المساعدة
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-sm"
              >
                اتصل بنا
              </Link>
              <span className="text-gray-400">•</span>
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline text-sm"
              >
                الأسئلة الشائعة
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}