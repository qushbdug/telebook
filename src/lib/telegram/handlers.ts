import { TelegramMessage, TelegramCallbackQuery } from './types'
import { bot } from './bot'
import { handleStart, handleHelp, handleProducts, handleNetworks, handleWallet, handleSupport } from './commands'
import { 
  handleProductSelection, 
  handleNetworkSelection, 
  handlePaymentMethod,
  handleBackToMain,
  handleBackToProducts,
  handleBackToNetworks,
  handleBackToWallet,
  handleBackToSupport,
  handleShowProducts,
  handleShowNetworks,
  handleShowWallet,
  handleShowSupport,
  handleBuyProduct,
  handleShowNetworkProducts,
  handleNetworkInfo,
  handleWalletAddFunds,
  handleWalletBalance,
  handleWalletWithdraw,
  handleWalletTransactions,
  handleSupportFAQ,
  handleSupportContact,
  handleSupportGuide
} from './callbacks'

// معالجة الرسائل الواردة
export async function handleMessage(message: TelegramMessage) {
  try {
    const { chat, text, from } = message
    
    if (!text) return

    console.log(`Received message from ${from.first_name} (${from.id}): ${text}`)

    // معالجة الأوامر
    if (text.startsWith('/')) {
      await handleCommand(message)
      return
    }

    // معالجة الرسائل العادية
    await handleRegularMessage(message)

  } catch (error) {
    console.error('Error handling message:', error)
    
    // إرسال رسالة خطأ للمستخدم
    try {
      await bot.sendMessage(message.chat.id, 'عذراً، حدث خطأ أثناء معالجة رسالتك. يرجى المحاولة مرة أخرى.')
    } catch (sendError) {
      console.error('Error sending error message:', sendError)
    }
  }
}

// معالجة الأوامر
export async function handleCommand(message: TelegramMessage) {
  const { chat, text } = message
  const command = text.toLowerCase().split(' ')[0]

  switch (command) {
    case '/start':
      await handleStart(message)
      break
    case '/help':
      await handleHelp(message)
      break
    case '/products':
      await handleProducts(message)
      break
    case '/networks':
      await handleNetworks(message)
      break
    case '/wallet':
      await handleWallet(message)
      break
    case '/support':
      await handleSupport(message)
      break
    default:
      await bot.sendMessage(chat.id, 'عذراً، لا أعرف هذا الأمر. استخدم /help لرؤية الأوامر المتاحة.')
  }
}

// معالجة الرسائل العادية
async function handleRegularMessage(message: TelegramMessage) {
  const { chat, text } = message

  // التحقق من نوع الرسالة
  if (text.includes('منتج') || text.includes('باقة') || text.includes('كارت')) {
    await handleProducts(message)
  } else if (text.includes('شبكة') || text.includes('stc') || text.includes('موبايلي') || text.includes('زين')) {
    await handleNetworks(message)
  } else if (text.includes('محفظة') || text.includes('رصيد') || text.includes('دفع')) {
    await handleWallet(message)
  } else if (text.includes('مساعدة') || text.includes('دعم') || text.includes('مشكلة')) {
    await handleSupport(message)
  } else {
    // رسالة ترحيب عامة
    await bot.sendMessage(chat.id, 
      'مرحباً! كيف يمكنني مساعدتك اليوم؟\n\n' +
      'يمكنك استخدام الأوامر التالية:\n' +
      '• /products - عرض المنتجات\n' +
      '• /networks - عرض الشبكات\n' +
      '• /wallet - إدارة المحفظة\n' +
      '• /support - الحصول على المساعدة\n' +
      '• /help - عرض جميع الأوامر'
    )
  }
}

// معالجة استعلامات Callback
export async function handleCallbackQuery(callbackQuery: TelegramCallbackQuery) {
  try {
    const { id, data, from, message } = callbackQuery
    
    if (!data || !message) return

    console.log(`Received callback query from ${from.first_name} (${from.id}): ${data}`)

    // الرد على الاستعلام
    await bot.answerCallbackQuery(id)

    // معالجة البيانات
    if (data.startsWith('product_')) {
      await handleProductSelection(callbackQuery)
    } else if (data.startsWith('network_')) {
      if (data.startsWith('network_info_')) {
        await handleNetworkInfo(callbackQuery)
      } else {
        await handleNetworkSelection(callbackQuery)
      }
    } else if (data.startsWith('payment_')) {
      await handlePaymentMethod(callbackQuery)
    } else if (data === 'back_to_main') {
      await handleBackToMain(callbackQuery)
    } else if (data === 'back_to_products') {
      await handleBackToProducts(callbackQuery)
    } else if (data === 'back_to_networks') {
      await handleBackToNetworks(callbackQuery)
    } else if (data === 'back_to_wallet') {
      await handleBackToWallet(callbackQuery)
    } else if (data === 'back_to_support') {
      await handleBackToSupport(callbackQuery)
    } else if (data === 'show_products') {
      await handleShowProducts(callbackQuery)
    } else if (data === 'show_networks') {
      await handleShowNetworks(callbackQuery)
    } else if (data === 'show_wallet') {
      await handleShowWallet(callbackQuery)
    } else if (data === 'show_support') {
      await handleShowSupport(callbackQuery)
    } else if (data.startsWith('buy_product_')) {
      await handleBuyProduct(callbackQuery)
    } else if (data.startsWith('show_network_products_')) {
      await handleShowNetworkProducts(callbackQuery)
    } else if (data.startsWith('wallet_add_')) {
      await handleWalletAddFunds(callbackQuery)
    } else if (data === 'wallet_balance') {
      await handleWalletBalance(callbackQuery)
    } else if (data === 'wallet_withdraw') {
      await handleWalletWithdraw(callbackQuery)
    } else if (data === 'wallet_transactions') {
      await handleWalletTransactions(callbackQuery)
    } else if (data === 'support_faq') {
      await handleSupportFAQ(callbackQuery)
    } else if (data === 'support_contact') {
      await handleSupportContact(callbackQuery)
    } else if (data === 'support_guide') {
      await handleSupportGuide(callbackQuery)
    } else if (data === 'contact_support') {
      await handleSupport({ chat: message.chat } as TelegramMessage)
    }

  } catch (error) {
    console.error('Error handling callback query:', error)
    
    // إرسال رسالة خطأ
    try {
      if (callbackQuery.message) {
        await bot.sendMessage(callbackQuery.message.chat.id, 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.')
      }
    } catch (sendError) {
      console.error('Error sending error message:', sendError)
    }
  }
}

// عرض القائمة الرئيسية
export async function showMainMenu(chatId: number) {
  const mainMenu = [
    ['🛍️ المنتجات', '🌐 الشبكات'],
    ['💰 المحفظة', '📞 الدعم'],
    ['ℹ️ المساعدة']
  ]

  const welcomeText = 
    '🌟 *مرحباً بك في بوت كروت الواي فاي!*\n\n' +
    'اختر من القائمة أدناه ما تريد القيام به:\n\n' +
    '🛍️ *المنتجات* - تصفح واشترِ كروت الإنترنت\n' +
    '🌐 *الشبكات* - تعرف على الشبكات المتاحة\n' +
    '💰 *المحفظة* - أدر رصيدك ومعاملاتك\n' +
    '📞 *الدعم* - احصل على المساعدة\n' +
    'ℹ️ *المساعدة* - تعرف على كيفية الاستخدام'

  await bot.sendMessageWithKeyboard(chatId, welcomeText, mainMenu)
}

// عرض قائمة المنتجات
export async function showProductsMenu(chatId: number) {
  const productsText = 
    '🛍️ *المنتجات المتاحة:*\n\n' +
    'اختر نوع الباقة التي تريدها:\n\n' +
    '📱 *باقات STC:*\n' +
    '• باقة شهرية 10GB - 50 ريال\n' +
    '• باقة شهرية 20GB - 80 ريال\n' +
    '• باقة شهرية 50GB - 120 ريال\n\n' +
    '📶 *باقات موبايلي:*\n' +
    '• باقة أسبوعية 5GB - 25 ريال\n' +
    '• باقة أسبوعية 10GB - 45 ريال\n\n' +
    '🌍 *باقات زين:*\n' +
    '• باقة يومية 1GB - 5 ريال'

  const inlineKeyboard = [
    [
      { text: 'STC', callback_data: 'network_stc' },
      { text: 'موبايلي', callback_data: 'network_mobily' },
      { text: 'زين', callback_data: 'network_zain' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chatId, productsText, inlineKeyboard)
}

// عرض قائمة الشبكات
export async function showNetworksMenu(chatId: number) {
  const networksText = 
    '🌐 *الشبكات المتاحة:*\n\n' +
    'اختر الشبكة التي تريد التعرف عليها:\n\n' +
    '📱 *STC (شبكة الاتصالات السعودية):*\n' +
    '• أكبر شبكة اتصالات في المملكة\n' +
    '• تغطية شاملة في جميع المناطق\n' +
    '• سرعة عالية وجودة ممتازة\n\n' +
    '📶 *موبايلي:*\n' +
    '• شبكة اتصالات رائدة\n' +
    '• أسعار منافسة\n' +
    '• خدمة عملاء متميزة\n\n' +
    '🌍 *زين السعودية:*\n' +
    '• شبكة حديثة ومتطورة\n' +
    '• تقنيات متقدمة\n' +
    '• مرونة في الباقات'

  const inlineKeyboard = [
    [
      { text: '📱 STC', callback_data: 'network_info_stc' },
      { text: '📶 موبايلي', callback_data: 'network_info_mobily' },
      { text: '🌍 زين', callback_data: 'network_info_zain' }
    ],
    [
      { text: '🛍️ شراء منتجات', callback_data: 'show_products' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chatId, networksText, inlineKeyboard)
}

// عرض قائمة المحفظة
export async function showWalletMenu(chatId: number) {
  const walletText = 
    '💰 *المحفظة الإلكترونية:*\n\n' +
    'اختر العملية التي تريد القيام بها:\n\n' +
    '💳 *إضافة رصيد:*\n' +
    '• بطاقة ائتمان\n' +
    '• تحويل بنكي\n' +
    '• محفظة إلكترونية\n\n' +
    '📊 *عرض الرصيد:*\n' +
    '• رصيدك الحالي\n' +
    '• سجل المعاملات\n' +
    '• إحصائيات الإنفاق\n\n' +
    '💸 *سحب رصيد:*\n' +
    '• إلى حسابك البنكي\n' +
    '• إلى محفظة إلكترونية'

  const inlineKeyboard = [
    [
      { text: '💳 إضافة رصيد', callback_data: 'wallet_add_funds' },
      { text: '📊 عرض الرصيد', callback_data: 'wallet_balance' }
    ],
    [
      { text: '💸 سحب رصيد', callback_data: 'wallet_withdraw' },
      { text: '📋 سجل المعاملات', callback_data: 'wallet_transactions' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chatId, walletText, inlineKeyboard)
}

// عرض قائمة الدعم
export async function showSupportMenu(chatId: number) {
  const supportText = 
    '📞 *مركز الدعم والمساعدة:*\n\n' +
    'كيف يمكننا مساعدتك؟\n\n' +
    '❓ *الأسئلة الشائعة:*\n' +
    '• كيفية الشراء\n' +
    '• طرق الدفع\n' +
    '• مشاكل في التطبيق\n\n' +
    '📧 *التواصل المباشر:*\n' +
    '• البريد الإلكتروني\n' +
    '• رقم الهاتف\n' +
    '• الدردشة المباشرة\n\n' +
    '📚 *الدليل الإرشادي:*\n' +
    '• دليل المستخدم\n' +
    '• الفيديو التعليمي\n' +
    '• النماذج'

  const inlineKeyboard = [
    [
      { text: '❓ الأسئلة الشائعة', callback_data: 'support_faq' },
      { text: '📧 التواصل المباشر', callback_data: 'support_contact' }
    ],
    [
      { text: '📚 الدليل الإرشادي', callback_data: 'support_guide' },
      { text: '📱 التطبيق', callback_data: 'support_app' }
    ],
    [
      { text: '🔙 العودة للقائمة الرئيسية', callback_data: 'back_to_main' }
    ]
  ]

  await bot.sendMessageWithInlineKeyboard(chatId, supportText, inlineKeyboard)
}

