🍔 SwiftBite

 A modern food ordering platform that helps restaurants digitize their menu, accept online orders, and provide customers with a seamless ordering experience.

![SwiftBite Banner](./public/banner.png)

---

 🚀 Overview

SwiftBite is a full-stack food ordering platform designed for restaurants and food vendors to create digital menus, showcase meals, and receive customer orders efficiently.

The platform replaces traditional paper menus with a fast, mobile-friendly ordering experience where customers can browse available meals, view details, and place orders easily.

SwiftBite focuses on helping small and medium food businesses build a stronger online presence without needing complex systems.

---

✨ Features

 👨‍🍳 Customer Experience

- Browse restaurant menu
- View food categories
- View meal descriptions and prices
- Food availability status
- Responsive mobile-first design
- Simple ordering flow

 🍽️ Menu Management

- Category-based food organization
- Dynamic menu rendering
- Food images stored with Supabase Storage
- Availability management
- Popular food highlighting

 🛒 Ordering System

- Add meals to order
- Manage order items
- Track order details
- Customer-friendly checkout flow

 ⚡ Performance

- Fast page loading
- Optimized images
- Responsive UI
- Modern frontend architecture

---

 🛠️ Tech Stack

 Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

 Backend / Database

- Supabase
  - PostgreSQL Database
  - Authentication
  - Storage Buckets

 Deployment

- Vercel

---

 🏗️ System Architecture

```
Customer
   |
   |
SwiftBite Web App
   |
   |
Supabase
 ├── PostgreSQL Database
 ├── Authentication
 └── Storage (Food Images)
```

---

 📂 Project Structure

```
swiftbite/

├── app/
│   ├── menu/
│   ├── cart/
│   └── admin/

├── components/
│   ├── FoodCard.tsx
│   ├── Navbar.tsx
│   └── MenuSection.tsx

├── lib/
│   └── supabase.ts

├── public/
│
├── styles/
│
└── README.md
```

---

🗄️ Database Structure

SwiftBite uses a relational database design.

 Categories

Stores food categories.

Example:

```
categories

id
name
sort_order
created_at
```

---

 Menu Items

Stores restaurant meals.

```
menu_items

id
category_id
name
description
price_kobo
image_url
is_available
sort_order
created_at
```

Relationship:

```
Category
   |
   |
Menu Items
```

---

 🖼️ Image Storage

Food images are stored using Supabase Storage.

Example:

```
Supabase Storage

foods/
 |
 ├── jollof-rice.jpg
 ├── fried-rice.jpg
 └── shawarma.jpg
```

Images are connected to menu items through the `image_url` field.

---

⚙️ Installation & Setup

 1. Clone Repository

```bash
git clone https://github.com/devsilica/swiftbite.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create:

```
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 4. Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

| Variable | Description |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase public API key |

---

 📱 Screenshots

(coming soon)

```
Landing Page

Menu Page

Food Details

Checkout
```

---

 🎯 Future Improvements

- [ ] Restaurant dashboard
- [ ] Online payment integration
- [ ] WhatsApp ordering automation
- [ ] Customer accounts
- [ ] Order tracking
- [ ] Multiple restaurant support
- [ ] Delivery management
- [ ] Analytics dashboard

---

💡 Vision

SwiftBite aims to empower local restaurants and food vendors with simple digital tools that make food ordering faster, easier, and more accessible.

---

 👨‍💻 Author

Built by Adeniyi Samuel Adekunle (Silica)

Full Stack Developer | Product Builder

---

 ⭐ Support

If you like this project, consider giving it a star ⭐
