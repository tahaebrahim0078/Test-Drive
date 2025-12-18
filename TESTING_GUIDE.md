# Testing Guide - Dealer Dashboard

## 🧪 اختبار الـ Components

### 1. اختبار DealerCarForm

#### حالات النجاح:

- ✅ ملء جميع الحقول بشكل صحيح وإرسال النموذج
- ✅ إضافة صور متعددة وحذفها
- ✅ تحديث سيارة موجودة

#### حالات الفشل:

- ❌ ترك أحد الحقول المطلوبة فارغاً
- ❌ إدخال سعر = 0 أو أقل
- ❌ إدخال سنة غير صحيحة (< 1900 أو > السنة الحالية + 1)
- ❌ حذف جميع الصور
- ❌ إدخال URL صور غير صحيح

### 2. اختبار DealerCarsTable

#### Functionality:

- ✅ عرض قائمة السيارات بشكل صحيح
- ✅ عرض الصور
- ✅ عرض المواصفات
- ✅ اضغط Edit → يجب أن يملأ النموذج بالبيانات
- ✅ اضغط Delete → حذف مع تأكيد

#### Edge Cases:

- ❌ قائمة فارغة (empty state)
- ❌ صور تحميل بطيئة
- ❌ أسماء سيارات طويلة جداً

### 3. اختبار DealerBookingsList

#### Functionality:

- ✅ عرض الطلبات المعلقة
- ✅ عرض الطلبات المكتملة
- ✅ قبول طلب (Accept)
- ✅ رفض طلب (Reject)
- ✅ عرض ملاحظات العميل

#### Status Colors:

- 🟡 Pending → أصفر
- 🟢 Accepted → أخضر
- 🔴 Rejected → أحمر

### 4. اختبار Authentication

#### Login:

```
Email: dealer@example.com
Password: password123
Role: dealer
```

#### Authorization:

- ✅ Dealer يمكنه الوصول إلى `/dealer/dashboard`
- ❌ Customer لا يمكنه الوصول إلى `/dealer/dashboard`
- ❌ Anonymous user يتم إعادة توجيهه إلى `/auth/login`

## 🔌 اختبار API Integration

### Mock API Response:

```typescript
// Create Car
POST /api/cars
{
  "brand": "BMW",
  "model": "X5",
  "year": 2024,
  "price": 1500000,
  "images": ["https://example.com/car.jpg"],
  "specs": {
    "engine": "3.0L Turbo",
    "transmission": "Automatic",
    "fuelType": "Petrol",
    "horsepower": 340,
    "color": "Black"
  },
  "dealerId": "user-123"
}

Response:
{
  "id": "car-456",
  "brand": "BMW",
  "model": "X5",
  "year": 2024,
  "price": 1500000,
  "images": ["https://example.com/car.jpg"],
  "specs": {...},
  "dealerId": "user-123",
  "createdAt": "2025-12-16T10:30:00Z"
}
```

## 📱 Responsive Testing

### Desktop (1920px+):

- 4 columns for stats
- Full table width
- Side-by-side forms

### Tablet (768px - 1023px):

- 2 columns for stats
- Scrollable table
- Stacked forms

### Mobile (< 768px):

- 1 column for stats
- Scrollable table
- Full width forms
- Hamburger menu

## ⚙️ Browser Testing

✅ Chrome/Chromium
✅ Firefox
✅ Safari
✅ Edge

## 🚨 Error Testing

### Network Errors:

```javascript
// Simulate network error
fetch("http://invalid-api.com").catch((error) =>
  console.error("Network error:", error)
);
```

### API Errors:

```javascript
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 500 Internal Server Error
```

### Timeout Testing:

```javascript
// Test with 5s, 10s, 30s timeouts
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
```

## 📊 Performance Testing

### Lighthouse Metrics:

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Load Testing:

```bash
# With Apache Bench
ab -n 1000 -c 10 http://localhost:3000/dealer/dashboard
```

## 🔐 Security Testing

### XSS Prevention:

- ✅ Input sanitization
- ✅ HTML encoding
- ✅ Content Security Policy

### CSRF Protection:

- ✅ Token validation
- ✅ SameSite cookies

### SQL Injection (Backend):

- ✅ Parameterized queries
- ✅ Input validation

## ✔️ Checklist

- [ ] جميع الحقول تعمل بشكل صحيح
- [ ] الـ Validation تعمل
- [ ] الـ API calls تعمل
- [ ] Error handling يعمل
- [ ] Loading states تظهر
- [ ] Animations تعمل
- [ ] Responsive design يعمل
- [ ] Authentication يعمل
- [ ] Authorization يعمل
- [ ] Empty states تعمل
- [ ] Accessibility يعمل
- [ ] Performance مقبولة

## 🐛 Known Issues & Solutions

### Issue 1: Slow Image Loading

**Solution**: استخدم image optimization

```tsx
<Image src={imageUrl} alt="car" fill priority={true} quality={80} />
```

### Issue 2: Form Validation Lag

**Solution**: استخدم debounce

```typescript
const debouncedValidate = debounce(validate, 300);
```

### Issue 3: API Timeout

**Solution**: أضف retry logic

```typescript
const maxRetries = 3;
for (let i = 0; i < maxRetries; i++) {
  try {
    return await apiCall();
  } catch (err) {
    if (i === maxRetries - 1) throw err;
    await sleep(1000 * (i + 1));
  }
}
```
