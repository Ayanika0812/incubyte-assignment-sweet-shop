# incubyte-assignment-sweet-shop
# 🍬 Incubyte Sweet Shop – MERN Application

A full-stack Sweet Shop Management System built as part of the **Incubyte Technical Assessment**, following **Test-Driven Development (TDD)**.

---

## ✅ Features

### 👥 Authentication
- User Registration & Login (JWT)
- Role-based Access (Admin & User)

### 🧁 User Features
- View all sweets
- Search sweets
- Purchase sweets (disabled if out of stock)

### 👑 Admin Features
- Add new sweets
- Restock sweets
- Delete sweets
- Manage inventory in real-time

### 🧪 Test-Driven Development
- Jest test cases for backend
- Supertest for API testing
- Test coverage for:
  - Authentication
  - Sweet CRUD
  - Purchase & quantity update

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Axios, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| Testing | Jest, Supertest |

---

## 📂 Project Structure

sweet-shop/
├── backend/
│ ├── src/
│ ├── tests/
│ └── package.json
├── frontend/
│ ├── src/
│ └── package.json
├── README.md


---

## 🚀 Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Ayanika0812/incubyte-assignment-sweet-shop.git
cd incubyte-assignment-sweet-shop ```

### 2️⃣ Backend Setup
cd backend
npm install
