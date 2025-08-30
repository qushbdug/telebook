import { z } from 'zod'

// مخططات المصادقة الأساسية
export const emailSchema = z
  .string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('البريد الإلكتروني غير صحيح')

export const passwordSchema = z
  .string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم')

export const usernameSchema = z
  .string()
  .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
  .max(20, 'اسم المستخدم يجب أن يكون 20 حرف على الأكثر')
  .regex(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يمكن أن يحتوي على أحرف وأرقام وشرطة سفلية فقط')

export const phoneSchema = z
  .string()
  .min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل')
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'رقم الهاتف غير صحيح')

// مخطط تسجيل الدخول
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
})

// مخطط إنشاء حساب جديد
export const registerSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  firstName: z.string().min(1, 'الاسم الأول مطلوب').max(50, 'الاسم الأول طويل جداً'),
  lastName: z.string().min(1, 'الاسم الأخير مطلوب').max(50, 'الاسم الأخير طويل جداً'),
  phone: phoneSchema.optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'يجب الموافقة على الشروط والأحكام'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
})

// مخطط تحديث الملف الشخصي
export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'الاسم الأول مطلوب').max(50, 'الاسم الأول طويل جداً'),
  lastName: z.string().min(1, 'الاسم الأخير مطلوب').max(50, 'الاسم الأخير طويل جداً'),
  phone: phoneSchema.optional(),
  bio: z.string().max(500, 'السيرة الذاتية طويلة جداً').optional(),
})

// مخطط تغيير كلمة المرور
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور الجديدة غير متطابقة',
  path: ['confirmPassword'],
})

// مخطط نسيان كلمة المرور
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

// مخطط إعادة تعيين كلمة المرور
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'الرمز مطلوب'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
})

// مخطط إنشاء شبكة جديدة
export const createNetworkSchema = z.object({
  name: z.string().min(1, 'اسم الشبكة مطلوب').max(100, 'اسم الشبكة طويل جداً'),
  description: z.string().max(500, 'الوصف طويل جداً').optional(),
  website: z.string().url('رابط الموقع غير صحيح').optional(),
  supportEmail: emailSchema.optional(),
  supportPhone: phoneSchema.optional(),
  priority: z.number().min(1, 'الأولوية يجب أن تكون 1 على الأقل').max(100, 'الأولوية يجب أن تكون 100 على الأكثر').optional(),
})

// مخطط تحديث الشبكة
export const updateNetworkSchema = z.object({
  name: z.string().min(1, 'اسم الشبكة مطلوب').max(100, 'اسم الشبكة طويل جداً').optional(),
  description: z.string().max(500, 'الوصف طويل جداً').optional(),
  website: z.string().url('رابط الموقع غير صحيح').optional(),
  supportEmail: emailSchema.optional(),
  supportPhone: phoneSchema.optional(),
  priority: z.number().min(1, 'الأولوية يجب أن تكون 1 على الأقل').max(100, 'الأولوية يجب أن تكون 100 على الأكثر').optional(),
  isActive: z.boolean().optional(),
})

// مخطط إنشاء منتج جديد
export const createProductSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب').max(100, 'اسم المنتج طويل جداً'),
  description: z.string().max(1000, 'الوصف طويل جداً').optional(),
  networkId: z.string().min(1, 'معرف الشبكة مطلوب'),
  price: z.number().min(0, 'السعر يجب أن يكون 0 على الأقل'),
  duration: z.number().min(1, 'المدة يجب أن تكون يوم واحد على الأقل'),
  dataLimit: z.string().max(50, 'حد البيانات طويل جداً').optional(),
  stock: z.number().min(0, 'المخزون يجب أن يكون 0 على الأقل'),
})

// مخطط تحديث المنتج
export const updateProductSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب').max(100, 'اسم المنتج طويل جداً').optional(),
  description: z.string().max(1000, 'الوصف طويل جداً').optional(),
  networkId: z.string().min(1, 'معرف الشبكة مطلوب').optional(),
  price: z.number().min(0, 'السعر يجب أن يكون 0 على الأقل').optional(),
  duration: z.number().min(1, 'المدة يجب أن تكون يوم واحد على الأقل').optional(),
  dataLimit: z.string().max(50, 'حد البيانات طويل جداً').optional(),
  stock: z.number().min(0, 'المخزون يجب أن يكون 0 على الأقل').optional(),
  isActive: z.boolean().optional(),
})

// مخطط إنشاء طلب جديد
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'معرف المنتج مطلوب'),
    quantity: z.number().min(1, 'الكمية يجب أن تكون 1 على الأقل'),
  })).min(1, 'يجب اختيار منتج واحد على الأقل'),
  shippingAddressId: z.string().optional(),
  billingAddressId: z.string().optional(),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'WALLET', 'CASH', 'PAYPAL', 'STRIPE']),
  notes: z.string().max(500, 'الملاحظات طويلة جداً').optional(),
})

// مخطط إنشاء مراجعة
export const createReviewSchema = z.object({
  rating: z.number().min(1, 'التقييم يجب أن يكون 1 على الأقل').max(5, 'التقييم يجب أن يكون 5 على الأكثر'),
  comment: z.string().max(1000, 'التعليق طويل جداً').optional(),
})

// مخطط إنشاء مراجعة شبكة
export const createNetworkReviewSchema = z.object({
  rating: z.number().min(1, 'التقييم يجب أن يكون 1 على الأقل').max(5, 'التقييم يجب أن يكون 5 على الأكثر'),
  comment: z.string().max(1000, 'التعليق طويل جداً').optional(),
  pros: z.array(z.string().max(100)).optional(),
  cons: z.array(z.string().max(100)).optional(),
})

// مخطط البحث
export const searchSchema = z.object({
  query: z.string().max(100, 'نص البحث طويل جداً').optional(),
  page: z.number().min(1, 'رقم الصفحة يجب أن يكون 1 على الأقل').optional(),
  limit: z.number().min(1, 'عدد العناصر يجب أن يكون 1 على الأقل').max(100, 'عدد العناصر يجب أن يكون 100 على الأكثر').optional(),
})

// مخطط تصفية المنتجات
export const productFilterSchema = z.object({
  networkId: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  duration: z.number().min(1).optional(),
  dataLimit: z.string().optional(),
  isActive: z.boolean().optional(),
})

// مخطط ترتيب المنتجات
export const productSortSchema = z.object({
  field: z.enum(['price', 'duration', 'createdAt', 'name']),
  direction: z.enum(['asc', 'desc']),
})

// مخطط تصفية الطلبات
export const orderFilterSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED']).optional(),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'WALLET', 'CASH', 'PAYPAL', 'STRIPE']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
})

// مخطط ترتيب الطلبات
export const orderSortSchema = z.object({
  field: z.enum(['createdAt', 'totalAmount', 'status', 'orderNumber']),
  direction: z.enum(['asc', 'desc']),
})

// مخطط إنشاء عنوان
export const createAddressSchema = z.object({
  type: z.enum(['shipping', 'billing']),
  firstName: z.string().min(1, 'الاسم الأول مطلوب').max(50, 'الاسم الأول طويل جداً'),
  lastName: z.string().min(1, 'الاسم الأخير مطلوب').max(50, 'اسم الأخير طويل جداً'),
  company: z.string().max(100, 'اسم الشركة طويل جداً').optional(),
  addressLine1: z.string().min(1, 'عنوان الشارع مطلوب').max(100, 'عنوان الشارع طويل جداً'),
  addressLine2: z.string().max(100, 'عنوان الشارع الإضافي طويل جداً').optional(),
  city: z.string().min(1, 'المدينة مطلوبة').max(50, 'اسم المدينة طويل جداً'),
  state: z.string().min(1, 'الولاية/المحافظة مطلوبة').max(50, 'اسم الولاية/المحافظة طويل جداً'),
  postalCode: z.string().min(1, 'الرمز البريدي مطلوب').max(10, 'الرمز البريدي طويل جداً'),
  country: z.string().min(1, 'البلد مطلوب').max(50, 'اسم البلد طويل جداً'),
  phone: phoneSchema.optional(),
  isDefault: z.boolean().optional(),
})

// مخطط تحديث العنوان
export const updateAddressSchema = z.object({
  firstName: z.string().min(1, 'الاسم الأول مطلوب').max(50, 'الاسم الأول طويل جداً').optional(),
  lastName: z.string().min(1, 'الاسم الأخير مطلوب').max(50, 'اسم الأخير طويل جداً').optional(),
  company: z.string().max(100, 'اسم الشركة طويل جداً').optional(),
  addressLine1: z.string().min(1, 'عنوان الشارع مطلوب').max(100, 'عنوان الشارع طويل جداً').optional(),
  addressLine2: z.string().max(100, 'عنوان الشارع الإضافي طويل جداً').optional(),
  city: z.string().min(1, 'المدينة مطلوبة').max(50, 'اسم المدينة طويل جداً').optional(),
  state: z.string().min(1, 'الولاية/المحافظة مطلوبة').max(50, 'اسم الولاية/المحافظة طويل جداً').optional(),
  postalCode: z.string().min(1, 'الرمز البريدي مطلوب').max(10, 'الرمز البريدي طويل جداً').optional(),
  country: z.string().min(1, 'البلد مطلوب').max(50, 'اسم البلد طويل جداً').optional(),
  phone: phoneSchema.optional(),
  isDefault: z.boolean().optional(),
})

// مخطط إعدادات المستخدم
export const userPreferencesSchema = z.object({
  language: z.enum(['ar', 'en']),
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
    marketing: z.boolean(),
  }),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'private', 'friends']),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
  }),
})

// مخطط إعدادات الإشعارات
export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  sms: z.boolean(),
  marketing: z.boolean(),
})

// مخطط إعدادات الخصوصية
export const privacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
})

// مخططات API
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  error: z.string().optional(),
})

export const paginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number().min(0),
  totalPages: z.number().min(0),
})

// مخططات التحقق من الصحة
export const validationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
})

export const validationErrorsSchema = z.array(validationErrorSchema)

// مخططات الملفات
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().optional(), // بالبايت
  allowedTypes: z.array(z.string()).optional(),
})

// مخططات البحث المتقدم
export const advancedSearchSchema = z.object({
  query: z.string().max(100).optional(),
  filters: z.record(z.any()).optional(),
  sort: z.object({
    field: z.string(),
    direction: z.enum(['asc', 'desc']),
  }).optional(),
  pagination: paginationSchema.optional(),
})

// مخططات التصدير
export const exportSchema = z.object({
  format: z.enum(['csv', 'excel', 'pdf', 'json']),
  filters: z.record(z.any()).optional(),
  dateRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
})

// مخططات الإحصائيات
export const statsSchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year']),
  startDate: z.string(),
  endDate: z.string(),
  metrics: z.array(z.string()).optional(),
})

// مخططات التقارير
export const reportSchema = z.object({
  type: z.enum(['sales', 'products', 'users', 'networks', 'custom']),
  period: z.enum(['day', 'week', 'month', 'year']),
  startDate: z.string(),
  endDate: z.string(),
  filters: z.record(z.any()).optional(),
  groupBy: z.string().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
})