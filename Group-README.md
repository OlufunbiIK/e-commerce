# eCommerce Project

## 🚀 Overview

This is a full-featured eCommerce platform developed as a group project. It includes user authentication, product management, shopping cart functionality, and payment integration. The project is built using modern web technologies for both frontend and backend.

## 🛠️ Technologies Used

- **Backend:** NestJS, Node.js, Postgre
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** Paystack
- **Hosting:**

## 📌 Features

- User authentication (signup, login)
- Product listing and search
- Shopping cart management
- Order checkout and payment processing
- Admin dashboard for product and order management
- Responsive design for mobile and desktop

## 📂 Folder Structure

```
/ecommerce-project
│── backend/             # NestJS Backend API
│── frontend/            # React Frontend Application
│── docs/                # Documentation and assets
│── README.md            # Project Overview
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/OlufunbiIK/e-commerce
cd ecommerce-project
```

### 2️⃣ Backend Setup

```bash
npm install
npm run start:dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Environment Variables

Create a `.env` file in the backend and frontend folders with the following variables:

```env.development
# Backend .env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PAYSTACK_SECRET_KEY=your_paystack_key
```

```env
# Frontend .env
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_PAYSTACK_PUBLIC_KEY=your_public_key
```

## 👥 Team Members

- **[Olufunbi Ibrahim]**
- **[Ahmed Mahmoud]**
- **[Aliyu Shamsudeen]**
- **[Feyishola Oguntebi]**
- **[Godwin Ekoh]**
- **[Elisha Suleiman D]**
- **[Muhammad Auwal Yahaya]**
- **[Abdullahi Yahaya]**

## 📜 License

This project is licensed under the MIT License.

## 📬 Contact

For inquiries, reach out to us at [olufunbiibrahim@gmail.com] or open an issue on GitHub.
