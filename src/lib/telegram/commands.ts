import { TelegramMessage } from './types'
import { bot } from './bot'
import { showMainMenu, showProductsMenu, showNetworksMenu, showWalletMenu, showSupportMenu } from './handlers'

// معالجة أمر /start
export async function handleStart(message: TelegramMessage) {
  const { chat, from } = message
  
  const welcomeText = 
    `🌟 *مرحباً بك في بوت كروت الواي فاي!*\n\n` +
    `أهلاً وسهلاً ${from.first_name}! 👋\n\n` +
    `أنا بوت ذكي لمساعدتك في:\n` +
    `• 🛍️ شراء كروت الإنترنت\n` +
    `• 🌐 التعرف على الشبكات المتاحة\n` +
    `• 💰 إدارة محفظتك الإلكترونية\n` +
    `• 📞 الحصول على الدعم والمساعدة\n\n` +
    `استخدم الأزرار أدناه للتنقل أو اكتب /help لرؤية جميع الأوامر المتاحة.`

  await showMainMenu(chat.id)
}

// معالجة أمر /help
export async function handleHelp(message: TelegramMessage) {
  const { chat } = message
  
  const helpText = 
    `ℹ️ *دليل المساعدة - بوت كروت الواي فاي*\n\n` +
    `*الأوامر المتاحة:*\n\n` +
    `🚀 */start* - بدء استخدام البوت\n` +
    `🛍️ */products* - عرض المنتجات المتاحة\n` +
    `🌐 */networks* - عرض الشبكات المتاحة\n` +
    `💰 */wallet* - إدارة المحفظة\n` +
    `📞 */support* - الحصول على المساعدة\n` +
    `ℹ️ */help* - عرض هذه القائمة\n\n` +
    `*كيفية الاستخدام:*\n\n` +
    `1️⃣ *اختر الأمر* من القائمة أو اكتبه مباشرة\n` +
    `2️⃣ *تصفح الخيارات* المتاحة\n` +
    `3️⃣ *اختر ما تريد* من الأزرار\n` +
    `4️⃣ *اتبع التعليمات* لإكمال العملية\n\n` +
    `*نصائح:*\n` +
    `• يمكنك استخدام الأزرار أو كتابة الأوامر\n` +
    `• استخدم 🔙 للعودة للقائمة السابقة\n` +
    `• للعودة للقائمة الرئيسية استخدم /start\n\n` +
    `*للمساعدة الإضافية:*\n` +
    `استخدم أمر /support للتواصل مع فريق الدعم`

  const inlineKeyboard = [
    [
      { text: '🛍️ المنتجات', callback_data: 'show_products' },
      { text: '🌐 الشبكات', callback_data: 'show_networks' }
    ],
    [
      { text: '💰 المحفظة', callback_data: 'show_wallet' },
      { text: '📞 الدعم', callback_data: 'show_support' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chat.id, helpText, inlineKeyboard)
}

// معالجة أمر /products
export async function handleProducts(message: TelegramMessage) {
  const { chat } = message
  
  await showProductsMenu(chat.id)
}

// معالجة أمر /networks
export async function handleNetworks(message: TelegramMessage) {
  const { chat } = message
  
  await showNetworksMenu(chat.id)
}

// معالجة أمر /wallet
export async function handleWallet(message: TelegramMessage) {
  const { chat } = message
  
  await showWalletMenu(chat.id)
}

// معالجة أمر /support
export async function handleSupport(message: TelegramMessage) {
  const { chat } = message
  
  await showSupportMenu(chat.id)
}

// معالجة أمر /about
export async function handleAbout(message: TelegramMessage) {
  const { chat } = message
  
  const aboutText = 
    `ℹ️ *حول بوت كروت الواي فاي*\n\n` +
    `*معلومات البوت:*\n` +
    `• الإصدار: 1.0.0\n` +
    `• تاريخ الإطلاق: 2024\n` +
    `• المطور: فريق كروت الواي فاي\n\n` +
    `*مميزات البوت:*\n` +
    `✅ واجهة سهلة وبسيطة\n` +
    `✅ دعم اللغة العربية\n` +
    `✅ معاملات آمنة\n` +
    `✅ دعم 24/7\n` +
    `✅ تحديثات مستمرة\n\n` +
    `*الشبكات المدعومة:*\n` +
    `📱 STC (شبكة الاتصالات السعودية)\n` +
    `📶 موبايلي\n` +
    `🌍 زين السعودية\n\n` +
    `*طرق الدفع:*\n` +
    `💳 بطاقات الائتمان\n` +
    `🏦 التحويل البنكي\n` +
    `📱 المحافظ الإلكترونية\n\n` +
    `*للتواصل:*\n` +
    `📧 البريد الإلكتروني: support@wificards.com\n` +
    `📞 الهاتف: +966-50-123-4567\n` +
    `🌐 الموقع: www.wificards.com`

  const inlineKeyboard = [
    [
      { text: '🛍️ تجربة البوت', callback_data: 'show_products' },
      { text: '📞 الدعم', callback_data: 'show_support' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chat.id, aboutText, inlineKeyboard)
}

// معالجة أمر /status
export async function handleStatus(message: TelegramMessage) {
  const { chat } = message
  
  const statusText = 
    `📊 *حالة النظام*\n\n` +
    `*حالة البوت:* ✅ يعمل بشكل طبيعي\n` +
    `*آخر تحديث:* ${new Date().toLocaleString('ar-SA')}\n` +
    `*وقت الاستجابة:* < 1 ثانية\n\n` +
    `*إحصائيات:*\n` +
    `👥 المستخدمين النشطين: 1,234\n` +
    `🛍️ الطلبات اليوم: 567\n` +
    `💰 إجمالي المبيعات: 89,012 ريال\n` +
    `⭐ تقييم المستخدمين: 4.8/5\n\n` +
    `*الشبكات:*\n` +
    `📱 STC: ✅ متاحة\n` +
    `📶 موبايلي: ✅ متاحة\n` +
    `🌍 زين: ✅ متاحة\n\n` +
    `*صيانة:*\n` +
    `🔧 لا توجد أعمال صيانة مجدولة\n` +
    `📅 آخر صيانة: منذ 7 أيام\n\n` +
    `*للتحديثات:*\n` +
    `📢 تابع قناة @wificards_updates`

  const inlineKeyboard = [
    [
      { text: '🔄 تحديث', callback_data: 'refresh_status' },
      { text: '📊 إحصائيات مفصلة', callback_data: 'detailed_stats' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chat.id, statusText, inlineKeyboard)
}

// معالجة أمر /contact
export async function handleContact(message: TelegramMessage) {
  const { chat } = message
  
  const contactText = 
    `📞 *معلومات التواصل*\n\n` +
    `*فريق الدعم:*\n` +
    `👨‍💼 المدير: أحمد محمد\n` +
    `👩‍💼 مساعدة العملاء: فاطمة علي\n` +
    `👨‍💻 الدعم التقني: محمد أحمد\n\n` +
    `*طرق التواصل:*\n\n` +
    `📧 *البريد الإلكتروني:*\n` +
    `• الدعم العام: support@wificards.com\n` +
    `• الشكاوى: complaints@wificards.com\n` +
    `• الشؤون التجارية: business@wificards.com\n\n` +
    `📞 *الهاتف:*\n` +
    `• الدعم: +966-50-123-4567\n` +
    `• المبيعات: +966-50-123-4568\n` +
    `• الشكاوى: +966-50-123-4569\n\n` +
    `🌐 *المواقع:*\n` +
    `• الموقع الرسمي: www.wificards.com\n` +
    `• تطبيق الهاتف: متوفر على App Store و Google Play\n` +
    `• قناة تيليجرام: @wificards_official\n\n` +
    `⏰ *ساعات العمل:*\n` +
    `• الأحد - الخميس: 8:00 ص - 6:00 م\n` +
    `• الجمعة - السبت: 10:00 ص - 4:00 م\n` +
    `• الدعم الطارئ: 24/7`

  const inlineKeyboard = [
    [
      { text: '📧 إرسال بريد إلكتروني', callback_data: 'send_email' },
      { text: '📞 الاتصال', callback_data: 'make_call' }
    ],
    [
      { text: '🌐 زيارة الموقع', callback_data: 'visit_website' },
      { text: '📱 تحميل التطبيق', callback_data: 'download_app' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chat.id, contactText, inlineKeyboard)
}

// معالجة أمر /faq
export async function handleFAQ(message: TelegramMessage) {
  const { chat } = message
  
  const faqText = 
    `❓ *الأسئلة الشائعة (FAQ)*\n\n` +
    `*🛍️ الأسئلة المتعلقة بالشراء:*\n\n` +
    `*س: كيف يمكنني شراء كارت إنترنت؟*\n` +
    `ج: اختر /products ثم اختر الشبكة والبطاقة المطلوبة\n\n` +
    `*س: ما هي طرق الدفع المتاحة؟*\n` +
    `ج: بطاقات الائتمان، التحويل البنكي، المحافظ الإلكترونية\n\n` +
    `*س: متى يتم تفعيل البطاقة؟*\n` +
    `ج: فوراً بعد تأكيد الدفع\n\n` +
    `*💰 الأسئلة المتعلقة بالمحفظة:*\n\n` +
    `*س: كيف أضيف رصيد للمحفظة؟*\n` +
    `ج: اختر /wallet ثم "إضافة رصيد"\n\n` +
    `*س: هل يمكن سحب الرصيد؟*\n` +
    `ج: نعم، يمكن تحويله لحسابك البنكي\n\n` +
    `*🌐 الأسئلة المتعلقة بالشبكات:*\n\n` +
    `*س: ما هي الشبكات المدعومة؟*\n` +
    `ج: STC، موبايلي، زين السعودية\n\n` +
    `*س: هل البطاقات تعمل في جميع المناطق؟*\n` +
    `ج: نعم، تعمل في جميع أنحاء المملكة\n\n` +
    `*📞 الأسئلة المتعلقة بالدعم:*\n\n` +
    `*س: كيف أحصل على المساعدة؟*\n` +
    `ج: استخدم أمر /support أو تواصل معنا مباشرة\n\n` +
    `*س: ما هي ساعات العمل؟*\n` +
    `ج: الأحد - الخميس: 8:00 ص - 6:00 م`

  const inlineKeyboard = [
    [
      { text: '🛍️ شراء', callback_data: 'show_products' },
      { text: '💰 محفظة', callback_data: 'show_wallet' }
    ],
    [
      { text: '🌐 شبكات', callback_data: 'show_networks' },
      { text: '📞 دعم', callback_data: 'show_support' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chat.id, faqText, inlineKeyboard)
}