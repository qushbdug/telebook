'use client'

import React, { useState } from 'react'
import { 
  Wifi, 
  Search, 
  Filter, 
  ShoppingCart, 
  Star,
  Clock,
  Zap,
  Globe,
  CreditCard
} from 'lucide-react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

export default function BuyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')

  // بيانات تجريبية للمنتجات
  const products = [
    {
      id: '1',
      name: 'باقة شهرية 10GB',
      description: 'باقة إنترنت شهرية بسعة 10 جيجابايت',
      network: 'STC',
      networkLogo: '/images/stc-logo.png',
      price: 50.00,
      duration: 30,
      dataLimit: '10GB',
      features: ['سرعة عالية', 'تغطية واسعة', 'دعم 24/7'],
      rating: 4.8,
      reviewCount: 156,
      stock: 100,
      isPopular: true,
      isNew: false,
    },
    {
      id: '2',
      name: 'باقة شهرية 20GB',
      description: 'باقة إنترنت شهرية بسعة 20 جيجابايت',
      network: 'STC',
      networkLogo: '/images/stc-logo.png',
      price: 80.00,
      duration: 30,
      dataLimit: '20GB',
      features: ['سرعة عالية', 'تغطية واسعة', 'دعم 24/7'],
      rating: 4.7,
      reviewCount: 89,
      stock: 75,
      isPopular: false,
      isNew: true,
    },
    {
      id: '3',
      name: 'باقة أسبوعية 5GB',
      description: 'باقة إنترنت أسبوعية بسعة 5 جيجابايت',
      network: 'موبايلي',
      networkLogo: '/images/mobily-logo.png',
      price: 25.00,
      duration: 7,
      dataLimit: '5GB',
      features: ['سرعة متوسطة', 'تغطية جيدة', 'سعر منافس'],
      rating: 4.5,
      reviewCount: 234,
      stock: 150,
      isPopular: true,
      isNew: false,
    },
    {
      id: '4',
      name: 'باقة يومية 1GB',
      description: 'باقة إنترنت يومية بسعة 1 جيجابايت',
      network: 'زين',
      networkLogo: '/images/zain-logo.png',
      price: 5.00,
      duration: 1,
      dataLimit: '1GB',
      features: ['سرعة عادية', 'تغطية محلية', 'سعر اقتصادي'],
      rating: 4.2,
      reviewCount: 567,
      stock: 200,
      isPopular: false,
      isNew: false,
    },
    {
      id: '5',
      name: 'باقة شهرية 50GB',
      description: 'باقة إنترنت شهرية بسعة 50 جيجابايت',
      network: 'STC',
      networkLogo: '/images/stc-logo.png',
      price: 120.00,
      duration: 30,
      dataLimit: '50GB',
      features: ['سرعة فائقة', 'تغطية شاملة', 'دعم VIP'],
      rating: 4.9,
      reviewCount: 67,
      stock: 50,
      isPopular: false,
      isNew: true,
    },
    {
      id: '6',
      name: 'باقة أسبوعية 10GB',
      description: 'باقة إنترنت أسبوعية بسعة 10 جيجابايت',
      network: 'موبايلي',
      networkLogo: '/images/mobily-logo.png',
      price: 45.00,
      duration: 7,
      dataLimit: '10GB',
      features: ['سرعة عالية', 'تغطية واسعة', 'سعر معقول'],
      rating: 4.6,
      reviewCount: 123,
      stock: 100,
      isPopular: true,
      isNew: false,
    },
  ]

  const networks = [
    { id: 'all', name: 'جميع الشبكات' },
    { id: 'stc', name: 'STC' },
    { id: 'mobily', name: 'موبايلي' },
    { id: 'zain', name: 'زين' },
  ]

  const durations = [
    { id: 'all', name: 'جميع المدد' },
    { id: '1', name: 'يوم واحد' },
    { id: '7', name: 'أسبوع' },
    { id: '30', name: 'شهر' },
  ]

  const sortOptions = [
    { id: 'popularity', name: 'الأكثر شعبية' },
    { id: 'price-low', name: 'السعر: من الأقل إلى الأعلى' },
    { id: 'price-high', name: 'السعر: من الأعلى إلى الأقل' },
    { id: 'rating', name: 'الأعلى تقييماً' },
    { id: 'newest', name: 'الأحدث' },
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.network.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesNetwork = selectedNetwork === 'all' || 
                          product.network.toLowerCase() === selectedNetwork
    
    const matchesDuration = selectedDuration === 'all' || 
                           product.duration.toString() === selectedDuration
    
    return matchesSearch && matchesNetwork && matchesDuration
  })

  const handleAddToCart = (productId: string) => {
    // هنا سيتم إضافة المنتج إلى سلة التسوق
    console.log('إضافة المنتج إلى السلة:', productId)
  }

  const handleBuyNow = (productId: string) => {
    // هنا سيتم التوجيه إلى صفحة الدفع
    console.log('شراء المنتج:', productId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">شراء كروت الواي فاي</h1>
          <p className="text-gray-600">اختر من مجموعة واسعة من كروت الإنترنت لجميع الشبكات</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                variant="search"
                fullWidth
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {networks.map(network => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>
                    {duration.name}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              تم العثور على {filteredProducts.length} منتج
            </p>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">تصفية متقدم</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-6">
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{product.network}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {product.isPopular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Zap className="w-3 h-3 mr-1" />
                        شائع
                      </span>
                    )}
                    {product.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        جديد
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 space-x-reverse mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">المدة</p>
                    <p className="text-sm font-medium text-gray-900">{product.duration} يوم</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">البيانات</p>
                    <p className="text-sm font-medium text-gray-900">{product.dataLimit}</p>
                  </div>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{product.price.toFixed(2)} ريال</p>
                    <p className="text-sm text-gray-600">المخزون: {product.stock}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleAddToCart(product.id)}
                    leftIcon={<ShoppingCart className="w-4 h-4" />}
                  >
                    إضافة للسلة
                  </Button>
                  
                  <Button
                    size="sm"
                    fullWidth
                    onClick={() => handleBuyNow(product.id)}
                    leftIcon={<CreditCard className="w-4 h-4" />}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    شراء الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Wifi className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لم يتم العثور على منتجات</h3>
            <p className="text-gray-600 mb-4">
              جرب تغيير معايير البحث أو إزالة بعض الفلاتر
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedNetwork('all')
                setSelectedDuration('all')
              }}
            >
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}