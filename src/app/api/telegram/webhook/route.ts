import { NextRequest, NextResponse } from 'next/server'
import { handleTelegramUpdate } from '@/lib/telegram/bot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // التحقق من أن الطلب من تيليجرام
    if (!body || !body.update_id) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // معالجة التحديث
    await handleTelegramUpdate(body)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Telegram Bot Webhook is active',
    timestamp: new Date().toISOString()
  })
}