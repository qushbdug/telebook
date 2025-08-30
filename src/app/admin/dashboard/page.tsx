'use client'

import React from 'react'
import { 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Wifi,
  ShoppingCart,
  Eye,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

export default function AdminDashboardPage() {
  // بيانات تجريبية
  const stats = {
    totalUsers: 1247,
    totalProducts: 89,
    totalOrders: 3456,
    totalRevenue: 125000.00,
    monthlyGrowth: 12.5,
    activeNetworks: 8,
  }

  const recentOrders = [
    {
      id: '1',
      customer: 'أحمد محمد',
      product: 'باقة شهرية 10GB - STC',
      amount: 50.00,
      status: 'مكتمل',
      date: '2024-01-15',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
    },
    {
      id: '2',
      customer: 'فاطمة علي',
      product: 'باقة أسبوعية 5GB - موبايلي',
      amount: 25.00,
      status: 'قيد المعالجة',
      date: '2024-01-15',
      statusColor: 'text-yellow-600',
      statusBg: 'bg-yellow-100',
    },
    {
      id: '3',
      customer: 'محمد أحمد',
      product: 'باقة يومية 1GB - زين',
      amount: 5.00,
      status: 'معلق',
      date: '2024-01-15',
      statusColor: 'text-red-600',
      statusBg: 'bg-red-100',
    },
    {
      id: '4',
      customer: 'سارة خالد',
      product: 'باقة شهرية 20GB - STC',
      amount: 80.00,
      status: 'مكتمل',
      date: '2024-01-14',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-100',
    },
  ]

  const topProducts = [
    {
      name: 'باقة شهرية 10GB - STC',
      sales: 234,
      revenue: 11700.00,
      growth: 15.2,
    },
    {
      name: 'باقة أسبوعية 5GB - موبايلي',
      sales: 189,
      revenue: 4725.00,
      growth: 8.7,
    },
    {
      name: 'باقة شهرية 20GB - STC',
      sales: 156,
      revenue: 12480.00,
      growth: 22.1,
    },
    {
      name: 'باقة يومية 1GB - زين',
      sales: 298,
      revenue: 1490.00,
      growth: -3.2,
    },
  ]

  const quickActions = [
    {
      title: 'إضافة منتج جديد',
      description: 'إنشاء منتج جديد في النظام',
      icon: <Package className="w-6 h-6" />,
      href: '/admin/products/new',
      color: 'bg-blue-500',
    },
    {
      title: 'إضافة شبكة جديدة',
      description: 'إضافة شبكة اتصالات جديدة',
      icon: <Wifi className="w-6 h-6" />,
      href: '/admin/networks/new',
      color: 'bg-green-500',
    },
    {
      title: 'عرض التقارير',
      description: 'تحليل البيانات والإحصائيات',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/admin/reports',
      color: 'bg-purple-500',
    },
    {
      title: 'إدارة المستخدمين',
      description: 'عرض وإدارة حسابات المستخدمين',
      icon: <Users className="w-6 h-6" />,
      href: '/admin/customers',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك في لوحة الإدارة! 👋</h1>
          <p className="text-gray-600">نظرة عامة على أداء النظام والإحصائيات</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{stats.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+18.7%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} ريال</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+24.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
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
                <CardDescription>آخر 4 طلبات في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`w-10 h-10 ${order.statusBg} rounded-lg flex items-center justify-center`}>
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{order.customer}</h4>
                          <p className="text-sm text-gray-600">{order.product}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.amount.toFixed(2)} ريال</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusBg} ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <a
                    href="/admin/transactions"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    عرض جميع الطلبات →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
              <CardDescription>المنتجات الأكثر طلباً هذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.sales} مبيعات</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.revenue.toLocaleString()} ريال</p>
                      <div className="flex items-center">
                        {product.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الشبكات</CardTitle>
              <CardDescription>أداء الشبكات النشطة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">الشبكات النشطة</span>
                  <span className="font-semibold text-gray-900">{stats.activeNetworks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">إجمالي المنتجات</span>
                  <span className="font-semibold text-gray-900">{stats.totalProducts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">متوسط السعر</span>
                  <span className="font-semibold text-gray-900">{(stats.totalRevenue / stats.totalProducts).toFixed(2)} ريال</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أداء النظام</CardTitle>
              <CardDescription>مؤشرات الأداء الرئيسية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">معدل التحويل</span>
                  <span className="font-semibold text-gray-900">3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">متوسط قيمة الطلب</span>
                  <span className="font-semibold text-gray-900">36.15 ريال</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">معدل رضا العملاء</span>
                  <span className="font-semibold text-gray-900">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}