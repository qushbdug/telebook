'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('البريد الإلكتروني مطلوب')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('البريد الإلكتروني غير صحيح')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // هنا سيتم إرسال البيانات إلى API
      // const response = await forgotPassword({ email })
      
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // في التطبيق الحقيقي، سيتم التحقق من الاستجابة
      // if (response.success) {
      //   setSuccess(true)
      // }
      
      // للعرض فقط
      setSuccess(true)
      
    } catch (error) {
      console.error('خطأ في إرسال طلب إعادة تعيين كلمة المرور:', error)
      setError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">تم إرسال رابط إعادة التعيين</h1>
            <p className="text-gray-600 mt-2">تحقق من بريدك الإلكتروني</p>
          </div>

          {/* Success Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle>تم إرسال الطلب بنجاح</CardTitle>
              <CardDescription>
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">ماذا يحدث بعد ذلك؟</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• تحقق من مجلد الرسائل الواردة أو الرسائل المزعجة</li>
                  <li>• انقر على رابط "إعادة تعيين كلمة المرور" في البريد</li>
                  <li>• أدخل كلمة مرور جديدة</li>
                  <li>• يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">ملاحظات مهمة</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• رابط إعادة التعيين صالح لمدة ساعة واحدة فقط</li>
                  <li>• إذا لم تستلم البريد، تحقق من عنوان البريد المدخل</li>
                  <li>• يمكنك طلب إعادة إرسال الرابط مرة أخرى</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex-col space-y-4">
              <Button
                onClick={() => {
                  setSuccess(false)
                  setEmail('')
                }}
                variant="outline"
                fullWidth
              >
                إرسال رابط آخر
              </Button>

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">نسيت كلمة المرور؟</h1>
          <p className="text-gray-600 mt-2">أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
        </div>

        {/* Forgot Password Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>إعادة تعيين كلمة المرور</CardTitle>
            <CardDescription>
              سنرسل لك رابطاً لإعادة تعيين كلمة المرور عبر البريد الإلكتروني
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Input
                label="البريد الإلكتروني"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                fullWidth
                required
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">معلومات مهمة</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• تأكد من إدخال البريد الإلكتروني المستخدم في إنشاء الحساب</li>
                  <li>• سيتم إرسال رابط إعادة التعيين إلى هذا البريد</li>
                  <li>• الرابط صالح لمدة ساعة واحدة فقط</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex-col space-y-4">
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
              </Button>

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
          </form>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">هل تحتاج مساعدة؟</h3>
            <p className="text-sm text-gray-600 mb-4">
              إذا واجهت أي مشكلة، لا تتردد في التواصل مع فريق الدعم
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
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  )
}