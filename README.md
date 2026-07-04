# 🚀 SmartERP - Billing, Inventory & Accounting Management System

SmartERP is a modern ERP (Enterprise Resource Planning) web application developed using the **MERN Stack**. It helps businesses manage customers, suppliers, inventory, purchases, sales, and reports through an intuitive interface with extensive keyboard shortcut support for faster navigation.

---

# 📌 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Secure Protected Routes

---

## 🏢 Company Management

- Create Company
- Select Company
- Multi-company support
- Financial Year Management

---

## 👥 Customer Ledger

- Create Customer
- Edit Customer
- Delete Customer
- Search Customer
- Opening Balance

---

## 🚚 Supplier Ledger

- Create Supplier
- Edit Supplier
- Delete Supplier
- Search Supplier
- Opening Balance

---

## 📦 Stock Management

- Create Stock Items
- Edit Stock Items
- Delete Stock Items
- Search Stock
- Category Management
- Units
- Purchase Price
- Selling Price
- GST
- Opening Stock
- Minimum Stock

---

## 🛒 Purchase Management

- Purchase Voucher
- Supplier Selection
- Stock Item Selection
- Auto Purchase Price
- Auto GST
- Automatic Total Calculation
- Purchase History
- Date Filters

---

## 💰 Sales Management

- Sales Voucher
- Customer Selection
- Stock Item Selection
- Auto Selling Price
- Auto GST
- Automatic Total Calculation
- Sales History
- Date Filters

---

## 📊 Reports

### 📦 Stock Report

- Current Stock
- Minimum Stock
- Low Stock Indicator
- PDF Download

### 🛒 Purchase Report

- Purchase History
- Today Filter
- Weekly Filter
- Monthly Filter
- PDF Download

### 💰 Sales Report

- Sales History
- Today Filter
- Weekly Filter
- Monthly Filter
- PDF Download

---

# ⌨️ Keyboard Shortcuts

One of the major features of SmartERP is complete keyboard navigation.

## General

| Shortcut | Action |
|----------|--------|
| F1 | Open Keyboard Shortcuts |
| Esc | Close Shortcut Dialog |
| F8 | Logout |
| Enter | Navigate Next Field |

---

## Authentication

| Shortcut | Action |
|----------|--------|
| Enter | Next Input Field |
| F9 | Login / Register |
| Esc | Back |

---

## Company Selection

| Shortcut | Action |
|----------|--------|
| ← | Previous Company |
| → | Next Company |
| Enter | Select Company |
| F2 | Create Company |

---

## List Pages

| Shortcut | Action |
|----------|--------|
| F2 | Add New Record |
| F3 | Search |
| F5 | Refresh List |

---

## Forms

| Shortcut | Action |
|----------|--------|
| Enter | Next Field |
| F9 | Save |
| Esc | Cancel |

---

## Reports

| Shortcut | Action |
|----------|--------|
| ← | Previous Report |
| → | Next Report |
| F10 | Download PDF |

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

---

## Backend

- Node.js
- Express.js

---

## Database

- PostgreSQL

---

## Authentication

- JWT (JSON Web Token)
- bcrypt

---

# 📁 Project Structure

```
SmartERP
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── services
│   ├── routes
│   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── prisma
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/SmartERP.git
```

---

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📌 API Modules

- Authentication
- Company
- Customer
- Supplier
- Stock
- Purchase
- Sales
- Reports

---

# 📄 Report Generation

The application supports exporting reports as PDF.

Available reports:

- Stock Report
- Purchase Report
- Sales Report

---

# 🎯 Major Functionalities

- Multi Company ERP
- Customer Management
- Supplier Management
- Inventory Management
- Purchase Management
- Sales Management
- Reporting
- PDF Export
- Keyboard Navigation
- Responsive UI
- JWT Authentication

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected APIs
- Authorization Middleware

---

# 🚀 Future Enhancements

- Invoice Printing
- Barcode Support
- QR Code Generation
- GST Return Reports
- User Roles & Permissions
- Dashboard Analytics
- Email Notifications
- Excel Export
- Dark Mode
- Backup & Restore
- Cloud Deployment
- Multi Warehouse Support

---

# 👨‍💻 Developer

**Vamsi Krishna**

MCA Graduate | Full Stack MERN Developer

GitHub:
https://github.com/Vamsi0005

LinkedIn:
https://www.linkedin.com/

---

# 📜 License

This project is developed for educational and portfolio purposes.

---

## ⭐ If you like this project, don't forget to star the repository.