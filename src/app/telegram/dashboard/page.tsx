'use client'

import React, { useState, useEffect } from 'react'
import { useTelegram } from '@/contexts/TelegramContext'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

// بيانات وهمية للشبكات
const mockNetworks = [
  {
    id: 1,
    name: 'شبكة الرياض',
    location: 'الرياض، المملكة العربية السعودية',
    status: 'متاحة',
    price: '50 ريال',
    icon: '🏙️'
  },
  {
    id: 2,
    name: 'شبكة جدة',
    location: 'جدة، المملكة العربية السعودية',
    status: 'متاحة',
    price: '45 ريال',
    icon: '🌊'
  },
  {
    id: 3,
    name: 'شبكة الدمام',
    location: 'الدمام، المملكة العربية السعودية',
    status: 'متاحة',
    price: '40 ريال',
    icon: '🏭'
  },
  {
    id: 4,
    name: 'شبكة مكة',
    location: 'مكة المكرمة، المملكة العربية السعودية',
    status: 'متاحة',
    price: '55 ريال',
    icon: '🕋'
  }
]

export default function DashboardPage() {
  const { user, isTelegramApp, MainButton, BackButton, showAlert, showPopup } = useTelegram()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredNetworks, setFilteredNetworks] = useState(mockNetworks)
  const [walletBalance, setWalletBalance] = useState(150) // رصيد وهمي
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null)

  useEffect(() => {
    if (isTelegramApp) {
      // إخفاء الزر الخلفي
      BackButton.hide()
      
      // إعداد الزر الرئيسي
      MainButton.setText('شراء البطاقة')
      MainButton.show()
      MainButton.onClick(() => {
        if (selectedNetwork) {
          handleBuyCard()
        } else {
          showAlert('يرجى اختيار شبكة أولاً')
        }
      })
    }
  }, [isTelegramApp, selectedNetwork, MainButton, BackButton])

  // البحث في الشبكات
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockNetworks.filter(network =>
        network.name.includes(searchQuery) ||
        network.location.includes(searchQuery)
      )
      setFilteredNetworks(filtered)
    } else {
      setFilteredNetworks(mockNetworks)
    }
  }, [searchQuery])

  const handleNetworkSelect = (network: any) => {
    setSelectedNetwork(network)
    showPopup('تم الاختيار', `تم اختيار ${network.name}`)
  }

  const handleBuyCard = () => {
    if (walletBalance < 50) {
      showAlert('رصيد غير كافي! يرجى إضافة رصيد للمحفظة')
      return
    }

    showPopup('تم الشراء', `تم شراء بطاقة ${selectedNetwork.name} بنجاح!`)
    
    // خصم من المحفظة
    setWalletBalance(prev => prev - 50)
    
    // إعادة تعيين الشبكة المختارة
    setSelectedNetwork(null)
  }

  const handleAddFunds = () => {
    showPopup('إضافة رصيد', 'سيتم توجيهك لصفحة إضافة الرصيد')
    // هنا يمكن إضافة التوجيه لصفحة إضافة الرصيد
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
              <path d="M5 13a10 10 0 0 1 14 0"></path>
              <path d="M8.5 16.5a5 5 0 0 1 7 0"></path>
              <path d="M2 8.82a15 15 0 0 1 20 0"></path>
              <line x1="12" x2="12.01" y1="20" y2="20"></line>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">مرحباً {user?.first_name}!</h1>
          <p className="text-gray-600">اختر شبكة واشترِ بطاقة</p>
        </div>

        {/* Wallet Card */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">رصيد المحفظة</p>
              <p className="text-2xl font-bold text-green-600">{walletBalance} ريال</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-600">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
          </div>
          <Button
            onClick={handleAddFunds}
            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-sm"
          >
            إضافة رصيد
          </Button>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن شبكة..."
              className="pr-10 text-right"
              dir="rtl"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Networks List */}
        <div className="space-y-3 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 text-right">الشبكات المتاحة</h2>
          {filteredNetworks.map((network) => (
            <Card
              key={network.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedNetwork?.id === network.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleNetworkSelect(network)}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="text-2xl">{network.icon}</div>
                <div className="flex-1 text-right">
                  <h3 className="font-semibold text-gray-900">{network.name}</h3>
                  <p className="text-sm text-gray-600">{network.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {network.status}
                    </span>
                    <span className="text-sm font-medium text-blue-600">{network.price}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Network Info */}
        {selectedNetwork && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="text-center">
              <div className="text-3xl mb-2">{selectedNetwork.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{selectedNetwork.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedNetwork.location}</p>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {selectedNetwork.status}
                </span>
                <span className="text-lg font-bold text-blue-600">{selectedNetwork.price}</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                اضغط على "شراء البطاقة" في Telegram لإتمام الشراء
              </p>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <div className="text-center text-sm text-gray-500">
          <p>• اختر شبكة من القائمة</p>
          <p>• اضغط على "شراء البطاقة" في Telegram</p>
          <p>• ستتم إضافة البطاقة لمحفظتك</p>
        </div>
      </div>
    </div>
  )
}