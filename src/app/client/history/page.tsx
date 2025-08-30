'use client'

import React, { useState } from 'react'
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Package,
  CreditCard,
  Calendar,
  DollarSign,
  Wifi
} from 'lucide-react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')

  // بيانات تجريبية للطلبات
  const orders = [
    {
      id: 'ORD-001',
      orderNumber: '2024-001',
      customer: 'أحمد محمد',
      email: 'ahmed@example.com',
      products: [
        {
          name: 'باقة شهرية 10GB - STC',
          quantity: 1,
          price: 50.00,
        }
      ],
      totalAmount: 50.00,
      status: 'completed',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      orderDate: '2024-01-15',
      orderTime: '14:30',
      deliveryDate: '2024-01-15',
      deliveryTime: '15:45',
      notes: 'توصيل سريع وممتاز',
    },
    {
      id: 'ORD-002',
      orderNumber: '2024-002',
      customer: 'أحمد محمد',
      email: 'ahmed@example.com',
      products: [
        {
          name: 'باقة أسبوعية 5GB - موبايلي',
          quantity: 1,
          price: 25.00,
        }
      ],
      totalAmount: 25.00,
      status: 'processing',
      paymentMethod: 'wallet',
      paymentStatus: 'paid',
      orderDate: '2024-01-14',
      orderTime: '09:15',
      deliveryDate: null,
      deliveryTime: null,
      notes: 'قيد المعالجة',
    },
    {
      id: 'ORD-003',
      orderNumber: '2024-003',
      customer: 'أحمد محمد',
      email: 'ahmed@example.com',
      products: [
        {
          name: 'باقة يومية 1GB - زين',
          quantity: 2,
          price: 5.00,
        }
      ],
      totalAmount: 10.00,
      status: 'cancelled',
      paymentMethod: 'wallet',
      paymentStatus: 'refunded',
      orderDate: '2024-01-13',
      orderTime: '16:45',
      deliveryDate: null,
      deliveryTime: null,
      notes: 'تم إلغاء الطلب من العميل',
    },
    {
      id: 'ORD-004',
      orderNumber: '2024-004',
      customer: 'أحمد محمد',
      email: 'ahmed@example.com',
      products: [
        {
          name: 'باقة شهرية 20GB - STC',
          quantity: 1,
          price: 80.00,
        }
      ],
      totalAmount: 80.00,
      status: 'completed',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'paid',
      orderDate: '2024-01-12',
      orderTime: '11:20',
      deliveryDate: '2024-01-12',
      deliveryTime: '12:30',
      notes: 'خدمة ممتازة',
    },
    {
      id: 'ORD-005',
      orderNumber: '2024-005',
      customer: 'أحمد محمد',
      email: 'ahmed@example.com',
      products: [
        {
          name: 'باقة أسبوعية 10GB - موبايلي',
          quantity: 1,
          price: 45.00,
        }
      ],
      totalAmount: 45.00,
      status: 'shipped',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      orderDate: '2024-01-11',
      orderTime: '13:10',
      deliveryDate: null,
      deliveryTime: null,
      notes: 'تم شحن الطلب',
    },
  ]

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'pending', name: 'معلق' },
    { id: 'processing', name: 'قيد المعالجة' },
    { id: 'shipped', name: 'تم الشحن' },
    { id: 'completed', name: 'مكتمل' },
    { id: 'cancelled', name: 'ملغي' },
  ]

  const dateRangeOptions = [
    { id: 'all', name: 'جميع التواريخ' },
    { id: 'today', name: 'اليوم' },
    { id: 'week', name: 'هذا الأسبوع' },
    { id: 'month', name: 'هذا الشهر' },
    { id: 'year', name: 'هذا العام' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'shipped':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل'
      case 'processing':
        return 'قيد المعالجة'
      case 'shipped':
        return 'تم الشحن'
      case 'cancelled':
        return 'ملغي'
      case 'pending':
        return 'معلق'
      default:
        return 'غير معروف'
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'بطاقة ائتمان'
      case 'bank_transfer':
        return 'تحويل بنكي'
      case 'wallet':
        return 'المحفظة'
      default:
        return 'غير معروف'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'مدفوع'
      case 'pending':
        return 'قيد الانتظار'
      case 'failed':
        return 'فشل'
      case 'refunded':
        return 'مسترد'
      default:
        return 'غير معروف'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (orderId: string) => {
    // هنا سيتم التوجيه إلى صفحة تفاصيل الطلب
    console.log('عرض الطلب:', orderId)
  }

  const handleDownloadInvoice = (orderId: string) => {
    // هنا سيتم تحميل الفاتورة
    console.log('تحميل الفاتورة:', orderId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سجل الطلبات</h1>
          <p className="text-gray-600">عرض وإدارة جميع طلباتك السابقة</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="ابحث في الطلبات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                variant="search"
                fullWidth
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRangeOptions.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              تم العثور على {filteredOrders.length} طلب
            </p>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">تصفية متقدم</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">طلب #{order.orderNumber}</h3>
                      <p className="text-sm text-gray-600">{order.orderDate} {order.orderTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="mr-2">{getStatusText(order.status)}</span>
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">المنتجات</h4>
                    <div className="space-y-2">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-600">الكمية: {product.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{product.price.toFixed(2)} ريال</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">معلومات الدفع</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">طريقة الدفع:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {getPaymentMethodText(order.paymentMethod)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">حالة الدفع:</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {getPaymentStatusText(order.paymentStatus)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">المبلغ الإجمالي:</span>
                          <span className="text-lg font-bold text-gray-900">{order.totalAmount.toFixed(2)} ريال</span>
                        </div>
                      </div>
                    </div>
                    
                    {order.deliveryDate && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">معلومات التوصيل</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">تاريخ التوصيل:</span>
                            <span className="text-sm font-medium text-gray-900">{order.deliveryDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">وقت التوصيل:</span>
                            <span className="text-sm font-medium text-gray-900">{order.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">ملاحظات</h4>
                    <p className="text-sm text-blue-800">{order.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order.id)}
                      leftIcon={<Eye className="w-4 h-4" />}
                    >
                      عرض التفاصيل
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(order.id)}
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      تحميل الفاتورة
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">رقم الطلب</p>
                    <p className="text-lg font-bold text-gray-900">{order.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لم يتم العثور على طلبات</h3>
            <p className="text-gray-600 mb-4">
              جرب تغيير معايير البحث أو إزالة بعض الفلاتر
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedStatus('all')
                setSelectedDateRange('all')
              }}
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}

        {/* Export Section */}
        {filteredOrders.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>تصدير البيانات</CardTitle>
                <CardDescription>تصدير سجل الطلبات بتنسيقات مختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                    تصدير كـ Excel
                  </Button>
                  <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                    تصدير كـ PDF
                  </Button>
                  <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                    تصدير كـ CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}