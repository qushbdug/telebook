# تطبيق كروت الواي فاي - WiFi Cards App

تطبيق ويب متكامل لإدارة وبيع كروت الواي فاي للشبكات المختلفة، مبني باستخدام Next.js 14 مع TypeScript و Tailwind CSS.

## 🚀 المميزات

### للمشرفين (Admins)
- لوحة تحكم شاملة لإدارة التطبيق
- إدارة الشبكات والمنتجات
- إدارة العملاء والمعاملات
- تقارير مالية مفصلة
- نظام صلاحيات متقدم

### للعملاء (Clients)
- شراء كروت الواي فاي بسهولة
- محفظة إلكترونية
- سجل المشتريات
- دعم متعدد الشبكات

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL مع Prisma ORM
- **Authentication**: JWT + NextAuth.js
- **Payments**: Stripe (قابل للتخصيص)
- **Forms**: React Hook Form + Zod validation

## 📁 هيكل المشروع

```
wifi-cards-app/
├── public/                 # الملفات العامة الثابتة
├── src/
│   ├── app/               # هيكل Next.js 14 (App Router)
│   │   ├── (admin)/       # منطقة المشرف (محمية)
│   │   ├── (client)/      # منطقة العميل
│   │   ├── api/           # واجهات API
│   │   └── auth/          # المصادقة
│   ├── components/        # مكونات قابلة لإعادة الاستخدام
│   ├── lib/               # مكتبات وأدوات مساعدة
│   ├── types/             # تعريفات TypeScript
│   └── hooks/             # hooks مخصصة
├── prisma/                # مخطط قاعدة البيانات
└── docs/                  # التوثيق
```

## 🚀 البدء السريع

### المتطلبات الأساسية
- Node.js 18+ 
- PostgreSQL
- npm أو yarn

### التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd wifi-cards-app
```

2. **تثبيت التبعيات**
```bash
npm install
# أو
yarn install
```

3. **إعداد المتغيرات البيئية**
```bash
cp .env.example .env.local
# قم بتعديل الملف حسب إعداداتك
```

4. **إعداد قاعدة البيانات**
```bash
npx prisma generate
npx prisma db push
```

5. **تشغيل التطبيق**
```bash
npm run dev
# أو
yarn dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 🔧 الأوامر المتاحة

```bash
# التطوير
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء التطبيق للإنتاج
npm run start        # تشغيل التطبيق المبني
npm run lint         # فحص الكود
npm run type-check   # فحص أنواع TypeScript

# قاعدة البيانات
npm run db:generate  # توليد Prisma Client
npm run db:push      # تحديث قاعدة البيانات
npm run db:studio    # فتح Prisma Studio
```

## 🗄️ قاعدة البيانات

المشروع يستخدم PostgreSQL مع Prisma ORM. الجداول الرئيسية:

- **Users**: المستخدمين (مشرفين وعملاء)
- **Networks**: شبكات الواي فاي
- **Products**: منتجات الكروت
- **Orders**: الطلبات
- **Transactions**: المعاملات المالية
- **Wallets**: المحافظ الإلكترونية

## 🔐 المصادقة والأمان

- نظام تسجيل دخول آمن
- JWT tokens للمصادقة
- حماية المسارات حسب الصلاحيات
- تشفير كلمات المرور
- CSRF protection

## 💳 نظام المدفوعات

- دعم Stripe (قابل للتخصيص)
- معالجة آمنة للمدفوعات
- webhooks للتحديثات
- دعم متعدد العملات

## 🎨 الواجهة

- تصميم متجاوب (Responsive)
- دعم اللغة العربية
- واجهة مستخدم حديثة
- مكونات قابلة لإعادة الاستخدام
- نظام ألوان قابل للتخصيص

## 📱 المكونات

### مكونات واجهة المستخدم
- بطاقات (Cards)
- جداول البيانات (Tables)
- نماذج الإدخال (Forms)
- النوافذ المنبثقة (Modals)
- عناصر التنقل (Navigation)

### مكونات خاصة
- مكونات المشرف
- مكونات العميل
- مكونات مشتركة

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm run test

# تشغيل الاختبارات مع التغطية
npm run test:coverage
```

## 📦 النشر

### Vercel (مُوصى به)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t wifi-cards-app .
docker run -p 3000:3000 wifi-cards-app
```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم

- إنشاء Issue جديد
- التواصل عبر البريد الإلكتروني
- الوثائق في مجلد `docs/`

## 🙏 الشكر

شكراً لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**ملاحظة**: هذا المشروع مخصص للتعلم والتطوير. تأكد من اختبار جميع الميزات قبل استخدامها في الإنتاج.
