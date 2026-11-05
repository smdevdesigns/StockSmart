# StockSmart – Inventory Management System

A modern inventory management application designed to help users track products, monitor stock levels, and manage shopping lists efficiently.

🌐 **Live Demo:** [StockSmart](https://stock-smart-gamma.vercel.app/)

---

## 📸 Screenshots

### Dashboard
<img width="1334" height="500" alt="image" src="https://github.com/user-attachments/assets/017da13b-0026-4259-9d58-12fdb1e2a222" />


### Inventory Overview

<img width="320" height="509" alt="image" src="https://github.com/user-attachments/assets/774d7963-c020-4463-90b5-82a177ab7f4a" />

### Inventory Management & Shopping List

<img width="1005" height="427" alt="image" src="https://github.com/user-attachments/assets/7fe3815d-9cb4-4a74-bf00-0f27d611383f" />
<img width="997" height="525" alt="image" src="https://github.com/user-attachments/assets/9b710bed-6bd0-4723-a159-225852011fa1" />
<img width="998" height="339" alt="image" src="https://github.com/user-attachments/assets/ce5445f1-2a74-4837-8f71-6543acf47a0a" />
<img width="995" height="139" alt="image" src="https://github.com/user-attachments/assets/eb7cdd72-e969-4487-bd3f-37ce27aa194c" />
<img width="289" height="512" alt="image" src="https://github.com/user-attachments/assets/c838ea5f-cff2-45dc-8ca6-636815dbd21d" />

---

## ✨ Features

- **Dashboard Overview** – View total products, items needing shopping, and healthy stock levels.
- **Add Products** – Add new products with a specified maximum stock quantity.
- **Inventory Management** – Increase, decrease, reset, and delete product quantities.
- **Stock Monitoring** – Monitor current stock levels and identify products requiring replenishment.
- **Shopping List** – Track products that need restocking.
- **Purchase Tracking** – Record purchases and monitor purchased and remaining quantities.
- **Undo Purchases** – Reverse purchases when necessary.
- **Add to Inventory** – Transfer purchased quantities into your inventory.
- **Stock Indicators** – Easily identify products with healthy stock or products requiring replenishment.
- **Modern Interface** – Clean dashboard with a dark theme, gradient styling, and intuitive controls.

---

## 🛠️ Technologies Used

- **React** – Building the user interface.
- **TypeScript** – Type-safe application development.
- **CSS** – Styling and responsive layouts.
- **Firebase** – Backend services and application integration.
- **Vercel** – Deployment and hosting.

---

## 📁 Project Structure

```text
StockSmart/
├── public/
└── src/
    ├── components/
    │   ├── AddItemForm/
    │   ├── Hero/
    │   ├── InventoryPanel/
    │   ├── LandingPage/
    │   ├── Login/
    │   ├── ProtectedRoute/
    │   ├── ShoppingList/
    │   ├── Sidebar/
    │   └── StatCard/
    ├── context/
    ├── firebase/
    ├── styles/
    ├── types/
    ├── App.css
    └── App.tsx
```

---

## 🚀 Getting Started

Follow the instructions below to set up and run StockSmart on your local machine.

### Prerequisites

Before installing the application, ensure you have the following:

- [Node.js](https://nodejs.org/) (LTS version recommended).
- npm (included with Node.js).
- [Git](https://git-scm.com/).
- A Firebase account if you want to configure your own Firebase project.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/smdevdesigns/StockSmart.git
```

**2. Navigate to the project directory**

```bash
cd StockSmart
```

**3. Install dependencies**

```bash
npm install
```

### Firebase Configuration

StockSmart uses Firebase for backend integration.

To configure your own Firebase project:

1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project or select an existing one.
3. Register a web application.
4. Copy your Firebase configuration details.
5. Add the configuration to your application's Firebase setup.

If your application uses environment variables, create a `.env` file in the root directory.

Example configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** These are example environment variable names. Use the exact names expected by your Firebase configuration files. Never commit private credentials or secret keys to GitHub.

### Running the Application

Once dependencies and Firebase configuration are ready, start the development server:

```bash
npm run dev
```

The application will run locally. Open the URL displayed in your terminal.

For Vite applications, the default URL is usually:

```text
http://localhost:5173
```

### Building for Production

To create an optimised production build, run:

```bash
npm run build
```

### Previewing the Production Build

To preview the production version locally, run:

```bash
npm run preview
```

---

## 📖 How to Use StockSmart

1. Open the StockSmart application.
2. Add a product by entering its name and maximum stock quantity.
3. View your products in the Inventory section.
4. Use the plus and minus buttons to increase or decrease stock quantities.
5. Use the reset button to reset a product's stock.
6. Check the Shopping List to identify products that need replenishment.
7. Enter the quantity you want to purchase and click **Buy**.
8. Monitor purchased and remaining quantities.
9. Click **Add To Inventory** to transfer purchased quantities into your inventory.
10. Use **Undo** to reverse a purchase when necessary.

---

## 📊 Stock Management

StockSmart provides an overview of inventory through two main stock indicators:

- 🟢 **Healthy Stock:** Products with sufficient stock.
- 🛒 **Need Shopping:** Products that require replenishment.

The dashboard displays:

- Total Products
- Need Shopping
- Healthy Stock

These indicators help users quickly understand their inventory status and identify products that need attention.

---

## 🌍 Deployment

StockSmart is deployed using [Vercel](https://vercel.com/).

**Live Application:**

[https://stock-smart-gamma.vercel.app/](https://stock-smart-gamma.vercel.app/)

### Deploying Your Own Version

To deploy your own instance of StockSmart:

1. Push your project to a GitHub repository.
2. Create or sign in to a [Vercel](https://vercel.com/) account.
3. Select **Add New Project**.
4. Import your GitHub repository.
5. Configure the required environment variables.
6. Select the appropriate build settings.
7. Click **Deploy**.

Vercel will build and host your application.

---

## 💡 Future Improvements

Potential improvements for future versions include:

- Product search and filtering.
- Inventory categories.
- Low-stock notifications.
- Product analytics and reporting.
- Exporting inventory data.
- Improved mobile responsiveness.
- Enhanced inventory reporting.

---

## 👨‍💻 Author

Developed as an inventory management project by Sophia McGee 2026.

---

## 📄 License

This project is available for educational and personal use.

---

⭐ If you like StockSmart, feel free to star the repository!
