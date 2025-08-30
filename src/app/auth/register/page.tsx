'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Phone, Wifi, CheckCircle } from 'lucide-react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.username) {
      newErrors.username = 'اسم المستخدم مطلوب'
    } else if (formData.username.length < 3) {
      newErrors.username = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة'
    }

    if (!formData.firstName) {
      newErrors.firstName = 'الاسم الأول مطلوب'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'الاسم الأخير مطلوب'
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // هنا سيتم إرسال البيانات إلى API
      // const response = await registerUser(formData)
      
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // في التطبيق الحقيقي، سيتم التحقق من الاستجابة
      // if (response.success) {
      //   router.push('/auth/verify-email')
      // }
      
      // للعرض فقط - توجيه إلى صفحة التحقق
      router.push('/auth/verify-email')
      
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error)
      setErrors({ general: 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.' })
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const password = formData.password
    if (!password) return { score: 0, label: '', color: '' }
    
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    const labels = ['ضعيف جداً', 'ضعيف', 'متوسط', 'قوي', 'قوي جداً']
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500']
    
    return {
      score: Math.min(score, 5),
      label: labels[Math.min(score - 1, 4)] || '',
      color: colors[Math.min(score - 1, 4)] || ''
    }
  }

  const strength = passwordStrength()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">إنشاء حساب جديد</h1>
          <p className="text-gray-600 mt-2">انضم إلى تطبيق كروت الواي فاي</p>
        </div>

        {/* Register Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>إنشاء حساب جديد</CardTitle>
            <CardDescription>
              املأ النموذج أدناه لإنشاء حسابك
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الاسم الأول"
                  type="text"
                  name="firstName"
                  placeholder="أدخل اسمك الأول"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  leftIcon={<User className="w-4 h-4" />}
                  fullWidth
                  required
                />

                <Input
                  label="الاسم الأخير"
                  type="text"
                  name="lastName"
                  placeholder="أدخل اسمك الأخير"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  leftIcon={<User className="w-4 h-4" />}
                  fullWidth
                  required
                />
              </div>

              <Input
                label="اسم المستخدم"
                type="text"
                name="username"
                placeholder="أدخل اسم المستخدم"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
                leftIcon={<User className="w-4 h-4" />}
                fullWidth
                required
              />

              <Input
                label="البريد الإلكتروني"
                type="email"
                name="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                leftIcon={<Mail className="w-4 h-4" />}
                fullWidth
                required
              />

              <Input
                label="رقم الهاتف (اختياري)"
                type="tel"
                name="phone"
                placeholder="أدخل رقم هاتفك"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                leftIcon={<Phone className="w-4 h-4" />}
                fullWidth
              />

              <Input
                label="كلمة المرور"
                type="password"
                name="password"
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
                fullWidth
                required
              />

              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          strength.score >= 1 ? 'bg-red-500' : ''
                        } ${strength.score >= 2 ? 'bg-orange-500' : ''} ${
                          strength.score >= 3 ? 'bg-yellow-500' : ''
                        } ${strength.score >= 4 ? 'bg-blue-500' : ''} ${
                          strength.score >= 5 ? 'bg-green-500' : ''
                        }`}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <CheckCircle className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>8 أحرف على الأقل</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <CheckCircle className={`w-3 h-3 ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>حرف صغير</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <CheckCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>حرف كبير</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <CheckCircle className={`w-3 h-3 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>رقم</span>
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="تأكيد كلمة المرور"
                type="password"
                name="confirmPassword"
                placeholder="أعد إدخال كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                leftIcon={<Lock className="w-4 h-4" />}
                fullWidth
                required
              />

              <div className="space-y-3">
                <label className="flex items-start space-x-3 space-x-reverse">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                  />
                  <div className="text-sm text-gray-600">
                    <span>أوافق على </span>
                    <Link 
                      href="/terms" 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      target="_blank"
                    >
                      شروط الخدمة
                    </Link>
                    <span> و </span>
                    <Link 
                      href="/privacy" 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      target="_blank"
                    >
                      سياسة الخصوصية
                    </Link>
                    <span> الخاصة بالتطبيق</span>
                  </div>
                </label>
                
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                )}
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
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  لديك حساب بالفعل؟{' '}
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

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            بالاستمرار، أنت توافق على جميع الشروط والأحكام المذكورة أعلاه
          </p>
        </div>
      </div>
    </div>
  )
}