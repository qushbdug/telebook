'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

interface TelegramContextType {
  user: TelegramUser | null
  isTelegramApp: boolean
  initData: string
  themeParams: any
  ready: boolean
  showAlert: (message: string) => void
  showConfirm: (message: string) => Promise<boolean>
  showPopup: (title: string, message: string) => void
  closeApp: () => void
  expand: () => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
  }
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isTelegramApp, setIsTelegramApp] = useState(false)
  const [initData, setInitData] = useState('')
  const [themeParams, setThemeParams] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // التحقق من أن التطبيق يعمل داخل Telegram
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      setIsTelegramApp(true)
      
      // تهيئة التطبيق
      tg.ready()
      tg.expand()
      
      // تعيين البيانات
      setUser(tg.initDataUnsafe?.user || null)
      setInitData(tg.initData || '')
      setThemeParams(tg.themeParams || {})
      setReady(true)
      
      console.log('Telegram Web App initialized:', tg)
    }
  }, [])

  const showAlert = (message: string) => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message)
    }
  }

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.showConfirm(message, (confirmed) => {
          resolve(confirmed)
        })
      } else {
        resolve(false)
      }
    })
  }

  const showPopup = (title: string, message: string) => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.showPopup({ title, message })
    }
  }

  const closeApp = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.close()
    }
  }

  const expand = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand()
    }
  }

  const MainButton = {
    text: '',
    color: '',
    textColor: '',
    isVisible: false,
    isActive: false,
    isProgressVisible: false,
    setText: (text: string) => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.setText(text)
      }
    },
    onClick: (callback: () => void) => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.onClick(callback)
      }
    },
    show: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.show()
      }
    },
    hide: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.hide()
      }
    },
    enable: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.enable()
      }
    },
    disable: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.disable()
      }
    },
    showProgress: (leaveActive = false) => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.showProgress(leaveActive)
      }
    },
    hideProgress: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.MainButton.hideProgress()
      }
    }
  }

  const BackButton = {
    isVisible: false,
    onClick: (callback: () => void) => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.onClick(callback)
      }
    },
    show: () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.show()
      }
    },
    hide: () => {
      if (typeof window !== 'undefined' && window.Telegram.WebApp) {
        window.Telegram.WebApp.BackButton.hide()
      }
    }
  }

  const value: TelegramContextType = {
    user,
    isTelegramApp,
    initData,
    themeParams,
    ready,
    showAlert,
    showConfirm,
    showPopup,
    closeApp,
    expand,
    MainButton,
    BackButton
  }

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}

export function useTelegram() {
  const context = useContext(TelegramContext)
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider')
  }
  return context
}

// إضافة أنواع TypeScript للـ Telegram Web App
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        initData: string
        initDataUnsafe: {
          user?: TelegramUser
        }
        themeParams: any
        showAlert: (message: string) => void
        showConfirm: (message: string, callback: (confirmed: boolean) => void) => void
        showPopup: (params: { title: string; message: string }) => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          isProgressVisible: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          showProgress: (leaveActive?: boolean) => void
          hideProgress: () => void
        }
        BackButton: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
        }
      }
    }
  }
}