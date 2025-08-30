import { bot } from './bot'

const WEBAPP_URL = 'https://fastcard-wifi.loca.lt/telegram'

export async function setupTelegramWebApp() {
  try {
    console.log('Setting up Telegram Bot Web App...')
    
    // إعداد معلومات البوت
    const botInfo = await bot.getMe()
    console.log('Bot Info:', botInfo)
    
    // إعداد Web App
    const webAppInfo = {
      title: 'كروت الواي فاي',
      short_name: 'FastCard',
      description: 'تطبيق متكامل لإدارة وبيع كروت الواي فاي',
      url: WEBAPP_URL,
      photo_url: 'https://fastcard-wifi.loca.lt/telegram-icon.png',
      gif_url: 'https://fastcard-wifi.loca.lt/telegram-preview.gif',
      video_url: 'https://fastcard-wifi.loca.lt/telegram-demo.mp4'
    }
    
    console.log('Web App Info:', webAppInfo)
    console.log('Web App URL:', WEBAPP_URL)
    
    return {
      success: true,
      botInfo,
      webAppInfo,
      webAppUrl: WEBAPP_URL
    }
    
  } catch (error) {
    console.error('Error setting up Telegram Web App:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// إعداد أوامر البوت
export async function setupBotCommands() {
  try {
    const commands = [
      {
        command: 'start',
        description: 'بدء التطبيق'
      },
      {
        command: 'webapp',
        description: 'فتح التطبيق المصغر'
      },
      {
        command: 'register',
        description: 'تسجيل حساب جديد'
      },
      {
        command: 'networks',
        description: 'عرض الشبكات المتاحة'
      },
      {
        command: 'wallet',
        description: 'إدارة المحفظة'
      },
      {
        command: 'help',
        description: 'مساعدة'
      }
    ]
    
    console.log('Bot Commands:', commands)
    return commands
    
  } catch (error) {
    console.error('Error setting up bot commands:', error)
    return []
  }
}

// إنشاء رسالة ترحيب مع Web App
export function createWelcomeMessage() {
  return {
    text: `🎉 مرحباً بك في تطبيق كروت الواي فاي!

🚀 يمكنك الآن استخدام التطبيق المصغر مباشرة من هنا.

📱 اضغط على الزر أدناه لفتح التطبيق:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 فتح التطبيق',
            web_app: {
              url: WEBAPP_URL
            }
          }
        ],
        [
          {
            text: '📋 الشبكات المتاحة',
            callback_data: 'show_networks'
          },
          {
            text: '💰 المحفظة',
            callback_data: 'show_wallet'
          }
        ],
        [
          {
            text: '❓ مساعدة',
            callback_data: 'help'
          },
          {
            text: 'ℹ️ حول التطبيق',
            callback_data: 'about'
          }
        ]
      ]
    }
  }
}

// إنشاء رسالة الشبكات
export function createNetworksMessage() {
  return {
    text: `🌐 الشبكات المتاحة:

🏙️ شبكة الرياض - 50 ريال
🌊 شبكة جدة - 45 ريال  
🏭 شبكة الدمام - 40 ريال
🕋 شبكة مكة - 55 ريال

📱 اضغط على الزر أدناه لفتح التطبيق وشراء البطاقات:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🛒 شراء البطاقات',
            web_app: {
              url: WEBAPP_URL
            }
          }
        ],
        [
          {
            text: '🔙 العودة للقائمة الرئيسية',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  }
}

// إنشاء رسالة المحفظة
export function createWalletMessage() {
  return {
    text: `💰 محفظتك:

💳 الرصيد الحالي: 150 ريال
📊 آخر المعاملات: 4 معاملات
🔄 آخر تحديث: اليوم

📱 اضغط على الزر أدناه لإدارة محفظتك:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💳 إدارة المحفظة',
            web_app: {
              url: `${WEBAPP_URL}/wallet`
            }
          }
        ],
        [
          {
            text: '🔙 العودة للقائمة الرئيسية',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  }
}

// إنشاء رسالة المساعدة
export function createHelpMessage() {
  return {
    text: `❓ كيفية استخدام التطبيق:

1️⃣ اضغط على "فتح التطبيق" لبدء الاستخدام
2️⃣ سجل حساب جديد بإدخال اسمك ورقم هاتفك
3️⃣ اختر شبكة من الشبكات المتاحة
4️⃣ اشترِ البطاقة من محفظتك
5️⃣ استمتع بالخدمة!

📱 للتطبيق الكامل، اضغط على الزر أدناه:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 فتح التطبيق',
            web_app: {
              url: WEBAPP_URL
            }
          }
        ],
        [
          {
            text: '🔙 العودة للقائمة الرئيسية',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  }
}

// إنشاء رسالة حول التطبيق
export function createAboutMessage() {
  return {
    text: `ℹ️ حول التطبيق:

🏢 تطبيق كروت الواي فاي
📱 Telegram Mini App
🌐 دعم الشبكات السعودية
💰 محفظة إلكترونية آمنة
🔒 حماية كاملة للبيانات

📱 جرب التطبيق الآن:`,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 فتح التطبيق',
            web_app: {
              url: WEBAPP_URL
            }
          }
        ],
        [
          {
            text: '🔙 العودة للقائمة الرئيسية',
            callback_data: 'back_to_main'
          }
        ]
      ]
    }
  }
}