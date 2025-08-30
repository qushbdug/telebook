# تطبيق كروت الواي فاي - Telegram Mini App 🚀

## نظرة عامة
تطبيق Telegram Mini App متكامل لإدارة وبيع كروت الواي فاي للشبكات المختلفة. يعمل داخل Telegram ويوفر تجربة مستخدم بسيطة وأنيقة.

## الميزات الرئيسية ✨

### 1. تسجيل المستخدم
- إدخال الاسم الكامل
- إدخال رقم الهاتف
- تسجيل تلقائي من بيانات Telegram

### 2. البحث عن الشبكات
- عرض الشبكات المتاحة
- البحث في الشبكات
- اختيار الشبكة المفضلة
- شراء البطاقات

### 3. إدارة المحفظة
- عرض الرصيد الحالي
- إضافة رصيد جديد
- سحب الرصيد
- تتبع المعاملات
- تقارير مفصلة

## التقنيات المستخدمة 🛠️

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Telegram Integration**: Telegram Web App API
- **State Management**: React Context
- **Icons**: Lucide React
- **Language**: Arabic (RTL Support)

## هيكل المشروع 📁

```
src/
├── app/
│   └── telegram/
│       ├── page.tsx              # الصفحة الرئيسية
│       ├── register/
│       │   └── page.tsx         # صفحة التسجيل
│       ├── dashboard/
│       │   └── page.tsx         # صفحة البحث عن الشبكات
│       └── wallet/
│           └── page.tsx         # صفحة المحفظة
├── components/
│   └── ui/                      # مكونات UI الأساسية
├── contexts/
│   └── TelegramContext.tsx      # سياق Telegram
└── lib/
    └── telegram/                # مكتبات Telegram
```

## كيفية التشغيل 🚀

### 1. تثبيت المتطلبات
```bash
npm install
```

### 2. إعداد المتغيرات البيئية
```bash
cp .env.example .env
```

أضف التوكن الجديد:
```env
TELEGRAM_BOT_TOKEN="8261915823:AAEXH5OAPxll8wDT6RsFwozSjeYPZmUcznU"
TELEGRAM_BOT_USERNAME="FastCard_Ym_Bot"
```

### 3. تشغيل المشروع
```bash
npm run dev
```

### 4. الوصول للتطبيق
- **محلياً**: `http://localhost:3000/telegram`
- **في Telegram**: `@FastCard_Ym_Bot`

## كيفية الاستخدام 📱

### 1. فتح البوت
- اذهب إلى `@FastCard_Ym_Bot` في Telegram
- اضغط على `/start`

### 2. التسجيل
- أدخل اسمك الكامل
- أدخل رقم هاتفك
- اضغط على "تأكيد التسجيل"

### 3. استخدام التطبيق
- **البحث عن شبكة**: اختر شبكة واشترِ بطاقة
- **المحفظة**: أضف رصيد وتتبع معاملاتك

## تصميم التطبيق 🎨

### الألوان
- **الأزرق الأساسي**: `#2563eb`
- **الأزرق الداكن**: `#1d4ed8`
- **الأخضر**: `#16a34a`
- **الأبيض**: `#ffffff`
- **الرمادي**: `#6b7280`

### التخطيط
- **تصميم متجاوب** يعمل على جميع الأجهزة
- **دعم RTL** للغة العربية
- **أيقونات واضحة** وواجهة بسيطة
- **تجربة مستخدم سلسة** داخل Telegram

## Telegram Web App API 🔌

### الميزات المستخدمة
- **MainButton**: الأزرار الرئيسية
- **BackButton**: زر العودة
- **showAlert**: رسائل التنبيه
- **showPopup**: النوافذ المنبثقة
- **showConfirm**: رسائل التأكيد
- **initData**: بيانات المستخدم

### التكامل
```typescript
import { useTelegram } from '@/contexts/TelegramContext'

const { user, MainButton, showAlert } = useTelegram()
```

## الأمان 🔒

- **تحقق من Telegram**: التطبيق يعمل فقط داخل Telegram
- **بيانات مشفرة**: جميع البيانات محمية
- **مصادقة آمنة**: عبر Telegram Web App API

## الدعم 💬

- **البوت**: `@FastCard_Ym_Bot`
- **التطبيق**: يعمل داخل Telegram
- **الدعم الفني**: متاح عبر البوت

## التطوير المستقبلي 🚀

- [ ] إضافة المزيد من الشبكات
- [ ] نظام المكافآت
- [ ] إشعارات فورية
- [ ] دعم العملات المتعددة
- [ ] نظام الشركاء

## المساهمة 🤝

نرحب بمساهماتكم! يرجى:
1. Fork المشروع
2. إنشاء branch جديد
3. إضافة الميزات
4. إرسال Pull Request

## الترخيص 📄

هذا المشروع مرخص تحت رخصة MIT.

---

**تم التطوير بواسطة فريق كروت الواي فاي** 🎯