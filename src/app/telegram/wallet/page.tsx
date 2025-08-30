'use client'

import React, { useState, useEffect } from 'react'
import { useTelegram } from '@/contexts/TelegramContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

// بيانات وهمية للمعاملات
const mockTransactions = [
  {
    id: 1,
    type: 'شراء',
    network: 'شبكة الرياض',
    amount: -50,
    date: '2024-01-15',
    status: 'مكتمل',
    icon: '🏙️'
  },
  {
    id: 2,
    type: 'إضافة رصيد',
    network: 'محفظة',
    amount: 100,
    date: '2024-01-14',
    status: 'مكتمل',
    icon: '💰'
  },
  {
    id: 3,
    type: 'شراء',
    network: 'شبكة جدة',
    amount: -45,
    date: '2024-01-13',
    status: 'مكتمل',
    icon: '🌊'
  },
  {
    id: 4,
    type: 'إضافة رصيد',
    network: 'محفظة',
    amount: 200,
    date: '2024-01-12',
    status: 'مكتمل',
    icon: '💰'
  }
]

export default function WalletPage() {
  const { user, isTelegramApp, MainButton, BackButton, showAlert, showPopup } = useTelegram()
  const [walletBalance, setWalletBalance] = useState(150)
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (isTelegramApp) {
      // إظهار الزر الخلفي
      BackButton.show()
      BackButton.onClick(() => {
        window.history.back()
      })
      
      // إعداد الزر الرئيسي
      MainButton.setText('إضافة رصيد')
      MainButton.show()
      MainButton.onClick(() => setShowAddFunds(true))
    }
  }, [isTelegramApp, MainButton, BackButton])

  const handleAddFunds = () => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      showAlert('يرجى إدخال مبلغ صحيح')
      return
    }

    if (numAmount < 10) {
      showAlert('الحد الأدنى لإضافة الرصيد هو 10 ريال')
      return
    }

    // إضافة الرصيد
    setWalletBalance(prev => prev + numAmount)
    
    // إضافة معاملة جديدة
    mockTransactions.unshift({
      id: Date.now(),
      type: 'إضافة رصيد',
      network: 'محفظة',
      amount: numAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'مكتمل',
      icon: '💰'
    })

    showPopup('تم الإضافة', `تم إضافة ${numAmount} ريال لمحفظتك`)
    setAmount('')
    setShowAddFunds(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">المحفظة</h1>
          <p className="text-gray-600">إدارة رصيدك ومعاملاتك</p>
        </div>

        {/* Balance Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-2">الرصيد الحالي</p>
            <p className="text-4xl font-bold text-green-600 mb-4">{walletBalance} ريال</p>
            <div className="flex space-x-3 space-x-reverse">
              <Button
                onClick={() => setShowAddFunds(true)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                إضافة رصيد
              </Button>
              <Button
                onClick={() => showPopup('سحب رصيد', 'سيتم توجيهك لصفحة سحب الرصيد')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                سحب رصيد
              </Button>
            </div>
          </div>
        </Card>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <Card className="p-6 mb-6 bg-white border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">إضافة رصيد</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  المبلغ (ريال)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-right"
                  dir="rtl"
                  min="10"
                  step="5"
                />
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <Button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddFunds}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  تأكيد
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Transactions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">آخر المعاملات</h2>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-gray-900">{transaction.type}</h3>
                    <p className="text-sm text-gray-600">{transaction.network}</p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                  <div className="text-left">
                    <p className={`font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} ريال
                    </p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3 text-center">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => showPopup('تحويل', 'سيتم توجيهك لصفحة التحويل')}
              className="bg-blue-600 hover:bg-blue-700 text-sm"
            >
              تحويل رصيد
            </Button>
            <Button
              onClick={() => showPopup('تقارير', 'سيتم توجيهك لصفحة التقارير')}
              className="bg-indigo-600 hover:bg-indigo-700 text-sm"
            >
              تقارير
            </Button>
          </div>
        </Card>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>• اضغط على "إضافة رصيد" في Telegram</p>
          <p>• يمكنك تتبع جميع معاملاتك</p>
          <p>• الرصيد متاح للشراء فوراً</p>
        </div>
      </div>
    </div>
  )
}