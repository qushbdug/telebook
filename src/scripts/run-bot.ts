import { bot } from '../lib/telegram/bot'
import { setupTelegramWebApp, setupBotCommands } from '../lib/telegram/setup-webapp'

async function main() {
  try {
    console.log('🚀 بدء تشغيل بوت كروت الواي فاي...')
    
    // إعداد Web App
    console.log('📱 إعداد Telegram Web App...')
    const webAppSetup = await setupTelegramWebApp()
    
    if (webAppSetup.success) {
      console.log('✅ تم إعداد Web App بنجاح!')
      console.log('🌐 رابط التطبيق:', webAppSetup.webAppUrl)
      console.log('🤖 معلومات البوت:', webAppSetup.botInfo)
    } else {
      console.error('❌ فشل في إعداد Web App:', webAppSetup.error)
    }
    
    // إعداد أوامر البوت
    console.log('⌨️ إعداد أوامر البوت...')
    const commands = await setupBotCommands()
    console.log('✅ تم إعداد أوامر البوت:', commands.length, 'أمر')
    
    // اختبار البوت
    console.log('🧪 اختبار البوت...')
    const botInfo = await bot.getMe()
    console.log('✅ البوت يعمل:', botInfo)
    
    console.log('\n🎉 تم تشغيل البوت بنجاح!')
    console.log('📱 يمكنك الآن استخدام البوت في Telegram')
    console.log('🌐 رابط التطبيق المصغر:', webAppSetup.webAppUrl)
    console.log('🤖 اسم البوت:', botInfo.username)
    console.log('🔗 رابط البوت:', `https://t.me/${botInfo.username}`)
    
    // إبقاء السكريبت يعمل
    console.log('\n⏳ البوت يعمل... اضغط Ctrl+C لإيقافه')
    
  } catch (error) {
    console.error('❌ خطأ في تشغيل البوت:', error)
    process.exit(1)
  }
}

// معالجة إيقاف البرنامج
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف البوت...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 إيقاف البوت...')
  process.exit(0)
})

// تشغيل البوت
main().catch(console.error)