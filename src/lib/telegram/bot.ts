import { TelegramBot } from './types'
import { handleMessage, handleCallbackQuery, handleCommand } from './handlers'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8261915823:AAEXH5OAPxll8wDT6RsFwozSjeYPZmUcznU'
const BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'FastCard_Ym_Bot'

export class WiFiCardsBot implements TelegramBot {
  private token: string
  private username: string
  private baseUrl: string

  constructor() {
    this.token = BOT_TOKEN
    this.username = BOT_USERNAME
    this.baseUrl = `https://api.telegram.org/bot${this.token}`
  }

  // إرسال رسالة
  async sendMessage(chatId: number, text: string, options?: any): Promise<any> {
    const url = `${this.baseUrl}/sendMessage`
    const data = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...options
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  // إرسال رسالة مع أزرار
  async sendMessageWithKeyboard(chatId: number, text: string, keyboard: any): Promise<any> {
    return this.sendMessage(chatId, text, {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    })
  }

  // إرسال رسالة مع أزرار inline
  async sendMessageWithInlineKeyboard(chatId: number, text: string, inlineKeyboard: any): Promise<any> {
    return this.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    })
  }

  // إرسال صورة
  async sendPhoto(chatId: number, photo: string, caption?: string, options?: any): Promise<any> {
    const url = `${this.baseUrl}/sendPhoto`
    const data = {
      chat_id: chatId,
      photo,
      caption,
      parse_mode: 'HTML',
      ...options
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error sending photo:', error)
      throw error
    }
  }

  // تحديث رسالة
  async editMessageText(chatId: number, messageId: number, text: string, options?: any): Promise<any> {
    const url = `${this.baseUrl}/editMessageText`
    const data = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      ...options
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error editing message:', error)
      throw error
    }
  }

  // حذف رسالة
  async deleteMessage(chatId: number, messageId: number): Promise<any> {
    const url = `${this.baseUrl}/deleteMessage`
    const data = {
      chat_id: chatId,
      message_id: messageId,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }

  // الرد على استعلام callback
  async answerCallbackQuery(callbackQueryId: string, text?: string): Promise<any> {
    const url = `${this.baseUrl}/answerCallbackQuery`
    const data = {
      callback_query_id: callbackQueryId,
      text,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error answering callback query:', error)
      throw error
    }
  }

  // الحصول على معلومات البوت
  async getMe(): Promise<any> {
    const url = `${this.baseUrl}/getMe`

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error('Error getting bot info:', error)
      throw error
    }
  }

  // تعيين webhook
  async setWebhook(webhookUrl: string): Promise<any> {
    const url = `${this.baseUrl}/setWebhook`
    const data = {
      url: webhookUrl,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error('Error setting webhook:', error)
      throw error
    }
  }

  // حذف webhook
  async deleteWebhook(): Promise<any> {
    const url = `${this.baseUrl}/deleteWebhook`

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error('Error deleting webhook:', error)
      throw error
    }
  }
}

// إنشاء نسخة من البوت
export const bot = new WiFiCardsBot()

// معالجة التحديثات من تيليجرام
export async function handleTelegramUpdate(update: any) {
  try {
    console.log('Received update:', JSON.stringify(update, null, 2))

    // معالجة الرسائل
    if (update.message) {
      await handleMessage(update.message)
    }

    // معالجة استعلامات callback
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query)
    }

    // معالجة التحديثات الأخرى
    if (update.edited_message) {
      console.log('Edited message received')
    }

    if (update.channel_post) {
      console.log('Channel post received')
    }

  } catch (error) {
    console.error('Error handling telegram update:', error)
  }
}

// دالة لاختبار البوت
export async function testBot() {
  try {
    const botInfo = await bot.getMe()
    console.log('Bot info:', botInfo)
    return botInfo
  } catch (error) {
    console.error('Error testing bot:', error)
    throw error
  }
}