# incubyte-assignment-sweet-shop  
# 🍬 Incubyte Sweet Shop – MERN Application

A full-stack Sweet Shop Management System built as part of the **Incubyte Technical Assessment**, following **Test-Driven Development (TDD)**.

---

## ✅ Features

### 👥 Authentication
- User Registration & Login (JWT Auth)
- Role-based Access (Admin & User)

### 🧁 User Features
- View all sweets
- Search sweets
- Purchase sweets (button disables if stock = 0)

### 👑 Admin Features
- Add new sweets
- Restock sweets
- Delete sweets
- Manage inventory in real-time

### 🧪 Test-Driven Development
- Backend unit tests using **Jest**
- API tests using **Supertest**
- Coverage includes:
  - Authentication
  - Sweet CRUD
  - Purchase & quantity update logic

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT + bcrypt |
| Testing | Jest + Supertest |

---

## 📂 Project Structure

```
sweet-shop/
├── backend/
│   ├── src/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## 🚀 Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ayanika0812/incubyte-assignment-sweet-shop.git
cd incubyte-assignment-sweet-shop
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` in backend folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=sweetsecretkey
PORT=5000
```

Start backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at:  
`http://localhost:5173/`

Backend runs at:  
`http://localhost:5000/`

---

## 🧪 Run Tests (TDD)

```bash
cd backend
npm test
```

✅ Auth Tests  
✅ Sweet CRUD Tests  
✅ Purchase Flow Tests  

---

## 👑 Make a User Admin

In MongoDB Atlas:

```js
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 📸 Screenshots
> (Screenshots will be added later)

- Login Page  
- Dashboard (User)  
- Admin Panel  
- Jest Test Results ✅  

---

## ✅ Summary

This project satisfies all Incubyte assessment requirements:

- MERN SPA ✅  
- JWT Auth & Role Based Access ✅  
- CRUD + Search + Purchase Workflow ✅  
- Test-Driven Development (Jest + Supertest) ✅  
- Clean UI + Tailwind ✅  

---

### 👩‍💻 Developed By  
**Ayanika Paul**

B.Tech | MIT Manipal | MERN Developer  

---

✨ Thank you, Incubyte!
