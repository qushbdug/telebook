'use client'

import React from 'react'
import { 
  Wifi, 
  CreditCard, 
  ShoppingCart, 
  History, 
  Wallet, 
  Settings, 
  Bell,
  TrendingUp,
  Users,
  Package,
  DollarSign
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

export default function ClientDashboardPage() {
  // بيانات تجريبية
  const stats = {
    totalOrders: 12,
    totalSpent: 450.00,
    activeCards: 3,
    walletBalance: 125.50,
  }

  const recentOrders = [
    {
      id: '1',
      product: 'باقة شهرية 10GB - STC',
      amount: 50.00,
      status: 'مكتمل',
      date: '2024-01-15',
      statusColor: 'text-green-600',
    },
    {
      id: '2',
      product: 'باقة أسبوعية 5GB - موبايلي',
      amount: 25.00,
      status: 'قيد المعالجة',
      date: '2024-01-14',
      statusColor: 'text-yellow-600',
    },
    {
      id: '3',
      product: 'باقة يومية 1GB - زين',
      amount: 5.00,
      status: 'مكتمل',
      date: '2024-01-13',
      statusColor: 'text-green-600',
    },
  ]

  const quickActions = [
    {
      title: 'شراء كروت جديدة',
      description: 'تصفح واشترِ كروت الواي فاي',
      icon: <ShoppingCart className="w-6 h-6" />,
      href: '/client/buy',
      color: 'bg-blue-500',
    },
    {
      title: 'إدارة المحفظة',
      description: 'أضف رصيد أو انسحب من محفظتك',
      icon: <Wallet className="w-6 h-6" />,
      href: '/client/wallet',
      color: 'bg-green-500',
    },
    {
      title: 'سجل الطلبات',
      description: 'عرض جميع طلباتك السابقة',
      icon: <History className="w-6 h-6" />,
      href: '/client/history',
      color: 'bg-purple-500',
    },
    {
      title: 'الإعدادات',
      description: 'عدّل إعدادات حسابك',
      icon: <Settings className="w-6 h-6" />,
      href: '/client/settings',
      color: 'bg-gray-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">لوحة التحكم</span>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">أهلاً، أحمد</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك، أحمد! 👋</h1>
          <p className="text-gray-600">إليك نظرة عامة على حسابك ونشاطك</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإنفاق</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSpent.toFixed(2)} ريال</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الكروت النشطة</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCards}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">رصيد المحفظة</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.walletBalance.toFixed(2)} ريال</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
                <CardDescription>الوصول السريع للميزات المهمة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>آخر الطلبات</CardTitle>
                <CardDescription>آخر 3 طلبات قمت بها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{order.product}</h4>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.amount.toFixed(2)} ريال</p>
                        <p className={`text-sm ${order.statusColor}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <a
                    href="/client/history"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    عرض جميع الطلبات →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>ميزات إضافية</CardTitle>
              <CardDescription>اكتشف المزيد من الخدمات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">تقارير الاستخدام</h3>
                  <p className="text-gray-600 mb-4">تتبع استهلاكك وإحصائيات مفصلة</p>
                  <a
                    href="/client/reports"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    عرض التقارير
                  </a>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">دعم العملاء</h3>
                  <p className="text-gray-600 mb-4">فريق دعم متخصص لمساعدتك</p>
                  <a
                    href="/client/support"
                    className="text-green-600 hover:text-green-800 font-medium hover:underline"
                  >
                    تواصل معنا
                  </a>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">الإشعارات</h3>
                  <p className="text-gray-600 mb-4">ابق على اطلاع بآخر التحديثات</p>
                  <a
                    href="/client/notifications"
                    className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                  >
                    إدارة الإشعارات
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}