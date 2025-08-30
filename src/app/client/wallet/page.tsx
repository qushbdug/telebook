'use client'

import React, { useState } from 'react'
import { 
  Wallet, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  History, 
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  DollarSign,
  Calendar,
  Clock
} from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  // بيانات تجريبية
  const walletData = {
    balance: 1250.75,
    totalDeposits: 3000.00,
    totalWithdrawals: 1749.25,
    monthlySpending: 450.00,
    monthlyGrowth: 12.5,
  }

  const recentTransactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 500.00,
      method: 'credit_card',
      status: 'completed',
      date: '2024-01-15',
      time: '14:30',
      description: 'إضافة رصيد عبر البطاقة الائتمانية',
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 200.00,
      method: 'bank_transfer',
      status: 'pending',
      date: '2024-01-14',
      time: '09:15',
      description: 'سحب رصيد إلى الحساب البنكي',
    },
    {
      id: '3',
      type: 'purchase',
      amount: 50.00,
      method: 'wallet',
      status: 'completed',
      date: '2024-01-13',
      time: '16:45',
      description: 'شراء باقة شهرية 10GB - STC',
    },
    {
      id: '4',
      type: 'deposit',
      amount: 300.00,
      method: 'bank_transfer',
      status: 'completed',
      date: '2024-01-12',
      time: '11:20',
      description: 'إضافة رصيد عبر التحويل البنكي',
    },
    {
      id: '5',
      type: 'purchase',
      amount: 25.00,
      method: 'wallet',
      status: 'completed',
      date: '2024-01-11',
      time: '13:10',
      description: 'شراء باقة أسبوعية 5GB - موبايلي',
    },
  ]

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'البطاقة الائتمانية',
      icon: <CreditCard className="w-5 h-5" />,
      last4: '**** 1234',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 'bank_transfer',
      name: 'التحويل البنكي',
      icon: <Banknote className="w-5 h-5" />,
      account: 'SA1234567890123456789012',
      bank: 'البنك الأهلي السعودي',
      isDefault: false,
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Plus className="w-4 h-4 text-green-600" />
      case 'withdrawal':
        return <Minus className="w-4 h-4 text-red-600" />
      case 'purchase':
        return <Minus className="w-4 h-4 text-blue-600" />
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600'
      case 'withdrawal':
        return 'text-red-600'
      case 'purchase':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل'
      case 'pending':
        return 'قيد المعالجة'
      case 'failed':
        return 'فشل'
      default:
        return 'غير معروف'
    }
  }

  const getMethodText = (method: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المحفظة الإلكترونية</h1>
          <p className="text-gray-600">إدارة رصيدك والمعاملات المالية</p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">الرصيد الحالي</p>
                  <p className="text-3xl font-bold">{walletData.balance.toFixed(2)} ريال</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإيداعات</p>
                  <p className="text-2xl font-bold text-gray-900">{walletData.totalDeposits.toFixed(2)} ريال</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{walletData.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي السحوبات</p>
                  <p className="text-2xl font-bold text-gray-900">{walletData.totalWithdrawals.toFixed(2)} ريال</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الإنفاق الشهري</p>
                  <p className="text-2xl font-bold text-gray-900">{walletData.monthlySpending.toFixed(2)} ريال</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
              <CardDescription>إضافة رصيد أو سحب من محفظتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowAddFunds(true)}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  leftIcon={<Plus className="w-5 h-5" />}
                >
                  إضافة رصيد
                </Button>
                
                <Button
                  onClick={() => setShowWithdraw(true)}
                  variant="outline"
                  size="lg"
                  leftIcon={<Minus className="w-5 h-5" />}
                >
                  سحب رصيد
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              {[
                { id: 'overview', name: 'نظرة عامة', icon: <Wallet className="w-4 h-4" /> },
                { id: 'transactions', name: 'المعاملات', icon: <History className="w-4 h-4" /> },
                { id: 'payment-methods', name: 'طرق الدفع', icon: <CreditCard className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>آخر المعاملات</CardTitle>
                <CardDescription>آخر 5 معاملات في محفظتك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date} {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toFixed(2)} ريال
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    عرض جميع المعاملات
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Summary */}
            <Card>
              <CardHeader>
                <CardTitle>طرق الدفع</CardTitle>
                <CardDescription>طرق الدفع المرتبطة بحسابك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {method.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{method.name}</p>
                          <p className="text-xs text-gray-500">
                            {method.id === 'credit_card' ? method.last4 : method.bank}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          افتراضي
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    إضافة طريقة دفع جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'transactions' && (
          <Card>
            <CardHeader>
              <CardTitle>جميع المعاملات</CardTitle>
              <CardDescription>سجل كامل لجميع معاملاتك المالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {getMethodText(transaction.method)} • {transaction.date} {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-medium ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toFixed(2)} ريال
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'payment-methods' && (
          <Card>
            <CardHeader>
              <CardTitle>طرق الدفع</CardTitle>
              <CardDescription>إدارة طرق الدفع المرتبطة بحسابك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">
                          {method.id === 'credit_card' 
                            ? `${method.last4} • ينتهي في ${method.expiry}`
                            : `${method.bank} • ${method.account}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {method.isDefault && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          افتراضي
                        </span>
                      )}
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline" size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    إضافة طريقة دفع جديدة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}