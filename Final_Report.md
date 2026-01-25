# ព្រះរាជាណាចក្រកម្ពុជា

## ជាតិ សាសនា ព្រះមហាក្សត្រ

---

# **FINAL REPORT**

**Project:** PetStore+  
**Course:** Internet Programming  
**Team:** A4

| Name of Students      | ID of Students | Score     |
| :-------------------- | :------------- | :-------- |
| **SOPHAT ODOM**       | e20221559      | ......... |
| **THY PHAROTH**       | e20220886      | ......... |
| **SOPHEAP SOTHIPHAK** | e20221038      | ......... |
| **RA SOCHEATEY**      | e20221446      | ......... |

<br>

**Lecturer:** CHUN Thavorac (Course & TP)

**Academic Year:** 2025-2026

---

# **Table of Contents**

1. [Executive Summary](#1-executive-summary)
2. [Introduction](#2-introduction)
3. [Literature Review](#3-literature-review)
4. [Methodology](#4-methodology)
5. [System Design](#5-system-design)
6. [System Features and Implementation](#6-system-features-and-implementation)
7. [Testing and Validation](#7-testing-and-validation)
8. [Results and Discussion](#8-results-and-discussion)
9. [Conclusion and Future Work](#9-conclusion-and-future-work)
10. [References](#10-references)
11. [Appendices](#11-appendices)

---

# **1. Executive Summary**

**PetStore+** is a comprehensive, full-stack e-commerce web application engineered to digitalize the retail experience for pet owners. The platform serves as a dual-interface solution: a seamless, responsive storefront for customers to browse and purchase premium pet products, and a robust administrative dashboard for real-time inventory and order management.

Developed as a capstone project for the Internet Programming course, PetStore+ demonstrates the practical application of a modern **MEVN stack** (MongoDB, Express.js, Vue.js, Node.js). The system distinguishes itself through advanced features such as **KHQR (Bakong) payment integration**, **role-based access control (RBAC)**, and a **reactive, component-based frontend** powered by Vue 3 and Tailwind CSS. The project successfully addresses the limitations of traditional brick-and-mortar pet shops by offering 24/7 availability, automated order processing, and data-driven business insights.

**Key Achievements:**

- **Full-Stack Architecture:** Successfully deployed a decoupled frontend (Vercel) and backend (Render) architecture.
- **Secure Payment Ecosystem:** Integrated **Stripe** for international cards and **Bakong KHQR** for local Instant Payments.
- **Optimized Media:** Implemented **Cloudinary** for high-performance image optimization and storage.
- **Robust Security:** Applied **Helmet**, **Rate Limiting**, and **Data Sanitization** to prevent common web vulnerabilities.

---

# **2. Introduction**

## **2.1 Background and Motivation**

The global pet care market has seen exponential growth, driven by the "pet humanization" trend where owners view pets as family members. However, many local pet retailers in Cambodia still rely on manual tracking and social media sales channels, which lack scalability and professionalism.

This project was motivated by the desire to:

1.  **Bridge the Digital Gap:** Provide a professional e-commerce template suitable for the Cambodian market.
2.  **Master Modern Web Development:** Move beyond static websites to build a dynamic, state-aware single-page application (SPA).
3.  **Implement Financial Tech:** Gain hands-on experience integrating Fintech solutions like KHQR which are crucial for the local digital economy.

## **2.2 Problem Statement**

Traditional pet retail suffers from:

- **Operational Inefficiency:** Manual inventory tracking leads to stockouts or overstocking.
- **Limited Accessibility:** Physical stores have fixed operating hours and geographical limitations.
- **Fragmented Data:** Customer purchase history and preferences are not tracked, preventing personalized service.

## **2.3 Project Objectives**

- **Develop** a responsive Single Page Application (SPA) using Vue.js 3 Composition API.
- **Architect** a secure RESTful API using Node.js and Express to handle complex business logic.
- **Implement** secure authentication using JWT (Json Web Tokens) and bcrypt for password hashing.
- **Design** an intuitive Admin Dashboard for CRUD operations on products, orders, and users.

## **2.4 Scope and Limitations**

**In Scope:**

- Public-facing storefront with search, filtering, and wishlist.
- Secure checkout flow with address validation and multiple payment options.
- Admin panel with chart-based analytics (Orders, Revenue).
- Dynamic QR generation for payments.

**Limitations:**

- **Shipping API:** Real-time shipping calculation is simulated (flat rate/free tier) rather than integrated with a logistics provider API.
- **Stock Sync:** Inventory is digital-only and does not sync with a physical Point-of-Sale (POS) system.

---

# **3. Literature Review**

## **3.1 E-Commerce Industry Overview**

E-commerce has evolved from simple transactional sites to experience-driven platforms. Key industry standards now include "Mobile First" design, as over 70% of e-commerce traffic originates from mobile devices. PetStore+ adheres to this by rigorously implementing responsive design patterns using Tailwind CSS.

## **3.2 Modern Web Technologies**

- **Component-Based Architecture:** Vue.js allows for the encapsulation of code (HTML, CSS, JS) into reusable components (e.g., `ProductCard.vue`), improving maintainability and testing.
- **State Management patterns:** The application utilizes the **Store Pattern** via Pinia. This separates the state (data) from the view (UI), ensuring that a cart update in the header is instantly reflected in the checkout page without prop drilling.

---

# **4. Methodology**

## **4.1 Development Approach**

The team adopted an **Agile Scrum** methodology with 1-week sprints:

- **Sprint 1:** Architecture Setup & Database Schema Design.
- **Sprint 2:** Backend API Development & Authentication.
- **Sprint 3:** (Frontend) Storefront & Shopping Cart Implementation.
- **Sprint 4:** (Frontend) Admin Dashboard & Payment Integration.
- **Sprint 5:** UI Polish, Responsiveness Testing & Final Deployment.

## **4.2 Technology Stack**

### **Frontend (Client-Side)**

| Technology             | Role             | Justification                                        |
| :--------------------- | :--------------- | :--------------------------------------------------- |
| **Vue.js 3**           | Framework        | Composition API for modular logic reuse.             |
| **Vite**               | Build Tool       | Instant server start and HMR.                        |
| **Pinia**              | State Management | Centralized store for Cart and User sessions.        |
| **Tailwind CSS**       | Styling          | Utility-first framework for rapid responsive design. |
| **Axios**              | HTTP Client      | Handling API requests with interceptors.             |
| **Vue Toastification** | Notifications    | User feedback for actions (e.g., "Added to Cart").   |

### **Backend (Server-Side)**

| Technology             | Role       | Justification                                          |
| :--------------------- | :--------- | :----------------------------------------------------- |
| **Node.js & Express**  | Runtime    | Event-driven, non-blocking I/O for scalable APIs.      |
| **MongoDB & Mongoose** | Database   | Flexible Schema for storing unstructured product data. |
| **JWT & BcryptJS**     | Security   | Stateless authentication and password salting/hashing. |
| **Cloudinary**         | Media      | Optimized image hosting and transformation.            |
| **Multer**             | Middleware | Handling multipart/form-data for image uploads.        |

### **DevOps & Security**

| Technology             | Role       | Justification                                        |
| :--------------------- | :--------- | :--------------------------------------------------- |
| **Helmet**             | Security   | Sets HTTP headers to protect against common attacks. |
| **Express Rate Limit** | Security   | Prevents Brute-Force and DoS attacks.                |
| **Mongo Sanitize**     | Security   | Prevents NoSQL Injection attacks.                    |
| **Render & Vercel**    | Deployment | Cloud hosting with automated CI/CD pipelines.        |

---

# **5. System Design**

## **5.1 Database Design (ERD)**

- **User Collection:** Stores credentials (`hashed_password`), `role` (admin/customer), and profile data.
- **Product Collection:** Includes `price`, `stock`, `category`, and `image` (Cloudinary URL).
- **Order Collection:** A complex object containing `shippingAddress`, array of `orderItems`, `paymentStatus`, and timestamps.
- **Promotion Collection:** Stores `couponCode`, `discountPercentage`, and `expiryDate`.

---

# **6. System Features and Implementation**

## **6.1 Customer Module**

### **6.1.1 Smart Product Catalog**

Features a responsive grid layout. We implemented client-side filtering and sorting (Price: Low-High, A-Z) to ensure instant feedback for the user without stressing the server.

### **6.1.2 Persistent Shopping Cart**

Leveraging `pinia-plugin-persistedstate`, the cart retains its data even if the user closes the browser. Key features:

- Real-time subtotal calculation.
- Dynamic shipping cost calculation (Free shipping logic for orders > $50).

## **6.2 Admin Module**

### **6.2.1 Dashboard Analytics**

We implemented charts logic to render:

- Monthly Revenue Trends.
- Order Status Distribution (Pending vs. Delivered).

### **6.2.2 Inventory Management**

Admins can upload product images which are automatically processed by **Multer** and uploaded to **Cloudinary**. The returned URL is stored in MongoDB, keeping the database light.

## **6.3 Payment Gateway Integration**

We implemented a hybrid payment strategy to serve both international and local requirements.

### **6.3.1 Bakong KHQR (Local)**

- **Implementation:** Used the `bakong-khqr` library to generate a compliant EMVCo QR string.
- **Dynamic generation:** Each QR code embeds the specific transaction amount and a unique Bill ID.
- **Verification:** A polling service checks transaction status in real-time.

### **6.3.2 Stripe (International)**

- **Implementation:** Secure integration using **Stripe Intents API**.
- **Security:** Card details are tokenized on the client side using `stripe-js`; the server only handles the `payment_intent_client_secret`, ensuring full PCI compliance.

---

# **7. Testing and Validation**

## **7.1 Testing Strategy**

- **Unit Testing:** Verified utility functions (e.g., currency formatting, date parsing).
- **End-to-End (E2E) Testing:** Validated the "Happy Path" (User Login -> Add to Cart -> Checkout -> Success).
- **Security Testing:** Verified that API endpoints return `401 Unauthorized` when accessed without a valid JWT.

## **7.2 Compatibility Testing**

| Device Type             | Browser    | Result  |
| :---------------------- | :--------- | :------ |
| **Desktop (1920x1080)** | Chrome 120 | ✅ Pass |
| **Laptop (1366x768)**   | Edge       | ✅ Pass |
| **Tablet (iPad Air)**   | Safari     | ✅ Pass |
| **Mobile (iPhone 14)**  | Safari     | ✅ Pass |

---

# **8. Results and Discussion**

## **8.1 Challenges & Solutions**

- **Challenge:** The logic for "Free Shipping over $50" kept resetting on page load.
  - **Solution:** We moved the logic into a Pinia Getter and enabled persistence, ensuring the state remains consistent.
- **Challenge:** Handling large image uploads causing server timeout.
  - **Solution:** Integrated **Cloudinary** to offload image processing from the main application server, improving performance significantly.

## **8.2 Lessons Learned**

- **Security First:** Implementing `helmet` and `rate-limiting` taught us the importance of securing APIs against automated bots.
- **Type Safety:** TypeScript caught several "undefined" errors during development that would have otherwise crashed the production app.

---

# **9. Conclusion and Future Work**

## **9.1 Conclusion**

PetStore+ stands as a complete, production-ready prototype. It successfully mimics a real-world e-commerce environment, handling everything from user acquisition to order fulfillment. The team has gained deep proficiency in the **MEVN stack**, **Payment Integrations**, and **Cloud Infrastructure**.

## **9.2 Future Enhancements**

- **AI Recommendations:** Integrate a Python microservice to suggest products based on user browsing history.
- **Social Login:** Implement "Login with Google" using Firebase or OAuth2.
- **PWA Support:** Convert the site into a Progressive Web App so users can install it on their phones and shop offline.

---

# **10. References**

- Vue.js Documentation. (2025). https://vuejs.org
- National Bank of Cambodia. (2025). _Bakong Technical Guidelines_.
- Cloudinary API Docs. (2025). https://cloudinary.com/documentation
- Stripe API Reference. (2025). https://stripe.com/docs/api

---

# **11. Appendices**

_(Paste your screenshots here)_

- **Figure 1:** Home Page (Hero Section)
- **Figure 2:** Mobile Navigation Menu
- **Figure 3:** Admin Dashboard
- **Figure 4:** Bakong QR Payment Modal
