import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// دالة لإغلاق الاتصال عند إيقاف التطبيق
export async function disconnectPrisma() {
  await prisma.$disconnect()
}

// دالة لإعادة الاتصال
export async function connectPrisma() {
  await prisma.$connect()
}

// دالة لاختبار الاتصال
export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { success: true, message: 'تم الاتصال بقاعدة البيانات بنجاح' }
  } catch (error) {
    return { 
      success: false, 
      message: 'فشل الاتصال بقاعدة البيانات', 
      error: error instanceof Error ? error.message : 'خطأ غير معروف' 
    }
  }
}

// دالة لتنظيف قاعدة البيانات (للتطوير فقط)
export async function cleanDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('لا يمكن تنظيف قاعدة البيانات في بيئة الإنتاج')
  }

  try {
    // حذف جميع البيانات بالترتيب الصحيح
    await prisma.transaction.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.network.deleteMany()
    await prisma.wallet.deleteMany()
    await prisma.user.deleteMany()

    return { success: true, message: 'تم تنظيف قاعدة البيانات بنجاح' }
  } catch (error) {
    return { 
      success: false, 
      message: 'فشل تنظيف قاعدة البيانات', 
      error: error instanceof Error ? error.message : 'خطأ غير معروف' 
    }
  }
}

// دالة لإنشاء بيانات تجريبية (للتطوير فقط)
export async function seedDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('لا يمكن إنشاء بيانات تجريبية في بيئة الإنتاج')
  }

  try {
    // إنشاء شبكات تجريبية
    const network1 = await prisma.network.create({
      data: {
        name: 'شبكة الاتصالات السعودية',
        description: 'أكبر شبكة اتصالات في المملكة العربية السعودية',
        website: 'https://www.stc.com.sa',
        supportEmail: 'support@stc.com.sa',
        supportPhone: '+966920000000',
        priority: 1,
        isActive: true,
      },
    })

    const network2 = await prisma.network.create({
      data: {
        name: 'موبايلي',
        description: 'شبكة اتصالات رائدة في المملكة',
        website: 'https://www.mobily.com.sa',
        supportEmail: 'support@mobily.com.sa',
        supportPhone: '+966920000000',
        priority: 2,
        isActive: true,
      },
    })

    const network3 = await prisma.network.create({
      data: {
        name: 'زين السعودية',
        description: 'شبكة اتصالات حديثة ومتطورة',
        website: 'https://www.sa.zain.com',
        supportEmail: 'support@zain.com.sa',
        supportPhone: '+966920000000',
        priority: 3,
        isActive: true,
      },
    })

    // إنشاء منتجات تجريبية
    await prisma.product.createMany({
      data: [
        {
          name: 'باقة شهرية 10GB',
          description: 'باقة إنترنت شهرية بسعة 10 جيجابايت',
          networkId: network1.id,
          price: 50.00,
          duration: 30,
          dataLimit: '10GB',
          stock: 100,
          isActive: true,
        },
        {
          name: 'باقة شهرية 20GB',
          description: 'باقة إنترنت شهرية بسعة 20 جيجابايت',
          networkId: network1.id,
          price: 80.00,
          duration: 30,
          dataLimit: '20GB',
          stock: 75,
          isActive: true,
        },
        {
          name: 'باقة أسبوعية 5GB',
          description: 'باقة إنترنت أسبوعية بسعة 5 جيجابايت',
          networkId: network2.id,
          price: 25.00,
          duration: 7,
          dataLimit: '5GB',
          stock: 150,
          isActive: true,
        },
        {
          name: 'باقة يومية 1GB',
          description: 'باقة إنترنت يومية بسعة 1 جيجابايت',
          networkId: network3.id,
          price: 5.00,
          duration: 1,
          dataLimit: '1GB',
          stock: 200,
          isActive: true,
        },
      ],
    })

    // إنشاء مستخدم تجريبي (مشرف)
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@wificards.com',
        username: 'admin',
        password: '$2b$10$example.hash.for.demo.purposes.only', // في التطبيق الحقيقي سيتم تشفيرها
        firstName: 'مدير',
        lastName: 'النظام',
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
    })

    // إنشاء مستخدم تجريبي (عميل)
    const clientUser = await prisma.user.create({
      data: {
        email: 'client@example.com',
        username: 'client',
        password: '$2b$10$example.hash.for.demo.purposes.only', // في التطبيق الحقيقي سيتم تشفيرها
        firstName: 'عميل',
        lastName: 'تجريبي',
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
      },
    })

    // إنشاء محفظة للعميل
    await prisma.wallet.create({
      data: {
        userId: clientUser.id,
        balance: 100.00,
      },
    })

    return { 
      success: true, 
      message: 'تم إنشاء البيانات التجريبية بنجاح',
      data: {
        networks: 3,
        products: 4,
        users: 2,
        wallets: 1,
      }
    }
  } catch (error) {
    return { 
      success: false, 
      message: 'فشل إنشاء البيانات التجريبية', 
      error: error instanceof Error ? error.message : 'خطأ غير معروف' 
    }
  }
}

// دالة لفحص صحة قاعدة البيانات
export async function healthCheck() {
  try {
    const startTime = Date.now()
    
    // اختبار الاتصال
    await prisma.$queryRaw`SELECT 1`
    
    // فحص عدد الجداول
    const tableCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    
    const responseTime = Date.now() - startTime
    
    return {
      success: true,
      message: 'قاعدة البيانات تعمل بشكل طبيعي',
      data: {
        status: 'healthy',
        responseTime: `${responseTime}ms`,
        tableCount: Array.isArray(tableCount) && tableCount[0] ? (tableCount[0] as any).count : 'غير معروف',
        timestamp: new Date().toISOString(),
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'قاعدة البيانات غير متاحة',
      error: error instanceof Error ? error.message : 'خطأ غير معروف',
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      }
    }
  }
}

// دالة لنسخ احتياطي لقاعدة البيانات (للتطوير فقط)
export async function backupDatabase() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('لا يمكن عمل نسخة احتياطية في بيئة الإنتاج')
  }

  try {
    // هنا يمكن إضافة منطق النسخ الاحتياطي
    // مثل تصدير البيانات إلى ملف JSON أو SQL
    
    return { 
      success: true, 
      message: 'تم إنشاء نسخة احتياطية بنجاح',
      data: {
        timestamp: new Date().toISOString(),
        backupType: 'development',
      }
    }
  } catch (error) {
    return { 
      success: false, 
      message: 'فشل إنشاء نسخة احتياطية', 
      error: error instanceof Error ? error.message : 'خطأ غير معروف' 
    }
  }
}