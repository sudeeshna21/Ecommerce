# Ecommerce Monorepo
# 🛍️ Ecommerce Store — Cart, Checkout & Discount System

A simple ecommerce platform where customers can browse products, add them to cart, and place orders.  
Every **Nth order** earns the user a **10% discount coupon**, applicable during checkout.

This project fulfills all requirements stated in the assignment including:
✔ Functional APIs  
✔ UI Implementation  
✔ Code quality & progression  
✔ Admin capabilities  
✔ In-memory storage (no database required)

---

## 🚀 Tech Stack

### 🔹 Backend
- Django
- Django REST Framework
- In-memory data structures (no DB)

### 🔹 Frontend
- React + TypeScript
- Material UI (MUI)
- TailwindCSS + DaisyUI for styling

---

## 📌 Features

### 🧑‍💻 Customer Flow
- Browse product catalog
- Add/remove/update items in cart
- Checkout with optional **10% off** discount code
- Earn and view **reward coupons** every Nth order
- View applied discount breakdown before payment

---

## 🔑 Business Rules (as given)

| Rule | Detail |
|------|--------|
| Discount Code | Applies to entire order total |
| Eligibility | Every 3rd order earns a coupon |
| Usage | Only once per coupon |
| Storage | In-memory only, resets on backend restart |

---

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | Fetch product list |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add/` | Add product to cart |
| PATCH | `/api/cart/update/` | Increase/decrease/remove item |
| GET | `/api/cart/` | View cart items |

### Checkout
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout/` | Validate discount + place order |



---

## 🧠 Assumptions

- Single user workflow (user_id = 1)
- In-memory store resets after backend restart
- Products fetched from Fake Store API

---

## 🛠️ Running Locally

## 1️⃣ Backend Setup
```sh
cd backend
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate.bat  # Windows

pip install -r requirements.txt
python manage.py runserver
```

### 2️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev