# MLM Referral Management System

A full-stack MLM (Multi-Level Marketing) referral management platform built using **React.js, Redux Toolkit, Node.js, Express.js, MySQL**.

This project provides role-based dashboards for **Users** and **Admins**, referral tracking, wallet system, KYC verification, commission management, and transaction reporting.

---

# Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Custom CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* MySQL

## Database

* MySQL

---

# Features

---

# User Features

### Authentication

* User Registration
* Login / Logout
* JWT Token Authentication
* Protected Routes

---

### Dashboard

User dashboard shows:

* Wallet Balance
* Direct Team Count
* Total Team Count
* Total Transactions
* Referral Code
* Quick Actions

---

### Team Management

Users can view:

* Direct Referrals
* Indirect Referrals
* Referral Levels

---

### Wallet System

Users can:

* Check Wallet Balance
* View Transaction History
* Receive Referral Commission

---

### KYC Verification

Users can:

* Upload KYC Documents
* Submit Verification Request
* Track Approval Status

---

### Profile Management

Users can:

* View Profile
* Update Name / Email
* View Referral Details

---

# Admin Features

---

### Admin Dashboard

Admin can monitor:

* Total Users
* Total Wallet Balance
* Total Transactions
* Commission Distributed

---

### User Management

Admin can:

* View All Users
* Track Referral Network
* Monitor User Wallets

---

### Wallet Credit

Admin can manually credit wallet balance.

Example:

* Bonus
* Promotional Credits
* Adjustment Credits

---

### Commission Management

Admin can update:

* Level-wise commission amount

Example:

Level 1 → ₹100
Level 2 → ₹50
Level 3 → ₹25

---

### KYC Management

Admin can:

* View Submitted KYCs
* Approve KYC
* Reject KYC

---

### Transaction Monitoring

Admin can track:

* All Wallet Transactions
* Credit / Debit
* Transaction Description
* Time History

---

### Financial Reports

Admin can view:

* Total Wallet Balance
* Total Credits
* Total Debits
* Recent Transactions
* User Financial Reports

---

# Project Structure

```bash
mlm-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
```

---

# Installation Guide

---

## 1. Clone Repository

```bash
git clone <repository-url>
cd mlm-project
```

---

## 2. Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mlm_db
JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3. Frontend Setup

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Database Setup

Create MySQL database:

```sql
CREATE DATABASE mlm_db;
```

Import your SQL tables.

Main tables:

* users
* wallet
* transactions
* referral_tree
* kyc
* commissions

---

# Default Flow

---

## User Flow

1. Register
2. Enter referral code (optional)
3. Login
4. View Dashboard
5. Submit KYC
6. Build Team
7. Earn Commission
8. Track Transactions

---

## Admin Flow

1. Login as Admin
2. Monitor Users
3. Approve KYC
4. Credit Wallet
5. Set Commission
6. View Reports

---

# Important Notes

### Multi Tab Login

Uses:

```js
sessionStorage
```

This allows:

* User login in one tab
* Admin login in another tab

without session conflict.

---

### Authentication

Protected using JWT.

Unauthorized users are redirected to Login.

---

# API Routes

---

## Auth

```bash
POST /api/auth/register
POST /api/auth/login
```

---

## Dashboard

```bash
GET /api/dashboard/stats
GET /api/admin/dashboard
```

---

## Team

```bash
GET /api/team/direct
GET /api/team/indirect
```

---

## KYC

```bash
POST /api/kyc/upload
GET /api/kyc/all
PUT /api/kyc/update-status
```

---

## Wallet

```bash
POST /api/admin/wallet-credit
GET /api/transactions
```

---

## Reports

```bash
GET /api/admin/reports
```

---

# Future Improvements

* Payment Gateway Integration
* Withdrawal System
* Email Notifications
* SMS OTP Verification
* Graph Analytics
* Referral Tree Visualization
* Dark Mode Persistence

--
