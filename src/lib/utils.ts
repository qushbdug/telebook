import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * دمج classes مع Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * تنسيق التاريخ
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  
  return new Intl.DateTimeFormat('ar-SA', defaultOptions).format(dateObj)
}

/**
 * تنسيق التاريخ القصير
 */
export function formatShortDate(date: Date | string): string {
  return formatDate(date, { month: 'short', day: 'numeric' })
}

/**
 * تنسيق الوقت
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

/**
 * تنسيق التاريخ والوقت
 */
export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`
}

/**
 * تنسيق العملة
 */
export function formatCurrency(amount: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * تنسيق الأرقام
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-SA').format(num)
}

/**
 * تنسيق النسبة المئوية
 */
export function formatPercentage(value: number, total: number): string {
  const percentage = (value / total) * 100
  return `${percentage.toFixed(1)}%`
}

/**
 * تقصير النص
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * تحويل النص إلى slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, '') // إزالة الأحرف الخاصة مع الحفاظ على العربية
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * تحويل النص إلى عنوان
 */
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * إنشاء معرف فريد
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * تأخير زمني
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * التحقق من صحة البريد الإلكتروني
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * التحقق من صحة رقم الهاتف
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * تشفير كلمة المرور
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * إنشاء رمز عشوائي
 */
export function generateRandomCode(length: number = 6): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * تحويل حجم الملف
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * التحقق من أن العنصر في المصفوفة
 */
export function isInArray<T>(item: T, array: T[]): boolean {
  return array.includes(item)
}

/**
 * إزالة العناصر المكررة من المصفوفة
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * ترتيب المصفوفة حسب الحقل
 */
export function sortBy<T>(array: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * تصفية المصفوفة
 */
export function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate)
}

/**
 * تقسيم المصفوفة إلى صفحات
 */
export function paginateArray<T>(array: T[], page: number, limit: number): T[] {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  return array.slice(startIndex, endIndex)
}

/**
 * حساب إجمالي المصفوفة
 */
export function sumArray(array: number[]): number {
  return array.reduce((sum, item) => sum + item, 0)
}

/**
 * حساب المتوسط
 */
export function averageArray(array: number[]): number {
  if (array.length === 0) return 0
  return sumArray(array) / array.length
}

/**
 * الحصول على القيمة القصوى
 */
export function maxArray(array: number[]): number {
  return Math.max(...array)
}

/**
 * الحصول على القيمة الدنيا
 */
export function minArray(array: number[]): number {
  return Math.min(...array)
}

/**
 * التحقق من أن الكائن فارغ
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

/**
 * نسخ عميق للكائن
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}