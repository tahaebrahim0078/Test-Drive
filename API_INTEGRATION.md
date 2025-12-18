# API Integration Guide

## Overview

هذا الدليل يشرح كيفية التعامل مع الـ API في التطبيق والطاقم المطلوبة للـ Dealer Dashboard.

## API Endpoints

### Base URL

```
http://localhost:3001/api
```

يمكن تغييره من خلال متغير البيئة `NEXT_PUBLIC_API_URL`

## 1. Car Management APIs

### الحصول على جميع السيارات

```
GET /cars
Response: Car[]
```

### الحصول على سيارة معينة

```
GET /cars/{id}
Response: Car
```

### الحصول على سيارات الديلير

```
GET /dealers/{dealerId}/cars
Response: Car[]
```

### إنشاء سيارة جديدة

```
POST /cars
Body:
{
  "brand": "BMW",
  "model": "X5",
  "year": 2024,
  "price": 1500000,
  "images": [
    "https://example.com/car1.jpg",
    "https://example.com/car2.jpg"
  ],
  "specs": {
    "engine": "3.0L Turbo",
    "transmission": "Automatic",
    "fuelType": "Petrol",
    "horsepower": 340,
    "color": "Black"
  },
  "dealerId": "dealer-id"
}
Response: Car
```

### تحديث سيارة

```
PUT /cars/{id}
Body: Partial<Car>
Response: Car
```

### حذف سيارة

```
DELETE /cars/{id}
Response: { success: boolean }
```

## 2. Booking Management APIs

### الحصول على حجوزات المستخدم

```
GET /users/{userId}/bookings
Response: BookingRequest[]
```

### الحصول على حجوزات الديلير

```
GET /dealers/{dealerId}/bookings
Response: BookingRequest[]
```

### إنشاء حجز جديد

```
POST /bookings
Body:
{
  "carId": "car-id",
  "customerId": "customer-id",
  "date": "2025-12-20",
  "time": "10:00 AM",
  "notes": "Optional notes"
}
Response: BookingRequest
```

### تحديث حالة الحجز

```
PATCH /bookings/{id}
Body: { status: "accepted" | "rejected" | "cancelled" }
Response: BookingRequest
```

## 3. Review APIs

### الحصول على تقييمات السيارة

```
GET /cars/{carId}/reviews
Response: Review[]
```

### إضافة تقييم

```
POST /reviews
Body:
{
  "carId": "car-id",
  "customerId": "customer-id",
  "rating": 5,
  "comment": "Great car!"
}
Response: Review
```

## Car Data Structure

```typescript
interface Car {
  id: string;
  brand: string; // e.g., "BMW"
  model: string; // e.g., "X5"
  year: number; // e.g., 2024
  price: number; // e.g., 1500000 (SAR)
  images: string[]; // Array of image URLs
  specs: {
    engine: string; // e.g., "3.0L Turbo"
    transmission: string; // "Automatic" | "Manual" | "CVT"
    fuelType: string; // "Petrol" | "Diesel" | "Hybrid" | "Electric"
    horsepower: number; // e.g., 340
    color: string; // e.g., "Black"
  };
  dealerId?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## Authentication

جميع الطلبات التي تحتاج الـ authentication يجب أن تتضمن الـ Authorization Header:

```
Authorization: Bearer {token}
```

أو يمكن حفظ البيانات في localStorage:

```typescript
const user = JSON.parse(localStorage.getItem("user") || "{}");
// استخدام user.id كـ userId أو dealerId
```

## Error Handling

جميع الدوال في `src/utils/api.ts` تقوم بـ throw errors في حالة الفشل:

```typescript
try {
  const car = await createCar(dealerId, carData);
  // Success
} catch (error) {
  console.error("Error:", error.message);
  // Handle error
}
```

## Implementation Notes

1. **Loading States**: استخدم `isLoading` flag لتعطيل الأزرار أثناء عمليات الـ API
2. **Error Messages**: اعرض رسائل الخطأ للمستخدم في واجهة واضحة
3. **Validation**: تحقق من البيانات قبل إرسالها للـ API
4. **Mock Data**: في الوقت الحالي، يمكنك استخدام mock data أثناء تطوير الـ Backend

## Testing the API

استخدم Postman أو curl لاختبار الـ API:

```bash
# Create a car
curl -X POST http://localhost:3001/api/cars \
  -H "Content-Type: application/json" \
  -d '{
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
    "dealerId": "dealer-123"
  }'
```
