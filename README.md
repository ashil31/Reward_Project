# Reward Project

The Reward Project is a full-stack application that enables users to scan a QR code and claim rewards. It consists of two main parts:

- **Frontend**: A modern React application powered by Vite, featuring a responsive design with dark mode support, smooth animations, and an engaging user interface.
- **Backend**: An Express-based API with MongoDB (via Mongoose) for handling user data, reward processing, and QR code validation.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

The Reward Project is designed to provide users with a simple, intuitive interface to claim rewards. Users can scan a QR code, fill in required details, and submit their entries to receive rewards. The backend validates QR tokens to ensure each code is used only once, processes the claim, and creates a record in the database.

## Project Structure

```
Reward_Project/
├── README.md
├── Backend/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── statusCodes.js
│   ├── controllers/
│   │   └── reward.controller.js
│   ├── models/
│   │   ├── QrCode.model.js
│   │   ├── Reward.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   └── reward.route.js
│   └── utils/
│       └── rewardGenerator.js
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── animations/
        ├── assets/
        ├── components/
        │   ├── AnnouncementBar.jsx
        │   ├── BackgroundEffects.jsx
        │   ├── Congratulations.jsx
        │   ├── Loader.jsx
        │   ├── Navbar.jsx
        │   ├── OccupationSelect.jsx
        │   └── ThemeToggle.jsx
        ├── context/
        │   └── ThemeContext.jsx
        ├── libs/
        │   └── utils.jsx
        └── pages/
            ├── Home.jsx
            ├── RedeemError.jsx
            └── RedeemPage.jsx
```

## Features

- **QR Code Scanning and Validation**: Secure QR code validation to ensure one-time use.
- **Reward Claiming Process**: Submit user details (name, phone, occupation, etc.) and claim rewards via API.
- **Responsive Frontend**: Built with React and Tailwind CSS, featuring dark mode toggle and smooth animations.
- **Animated Loader & Celebratory Effects**: Animated logo loader and confetti animation upon successful reward claim.
- **Robust Backend API**: Node/Express server with modular routing, controller logic, and MongoDB integration.

## Installation & Setup

### Backend Setup

1. Navigate to the `Backend` folder:

    ```sh
    cd Backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file based on your environment configuration (e.g., MongoDB connection string, PORT).

4. Start the backend server:

    ```sh
    npm start
    ```
   The server will run on the port specified in your `.env` file or default to `5000`.

### Frontend Setup

1. Navigate to the frontend folder:

    ```sh
    cd frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:

    ```sh
    npm run dev
    ```
   Your React application will start using Vite and be available in your browser.

## Environment Variables

For the backend, ensure you have a `.env` file with the following (example):

```
DB_CONNECT=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname
PORT=5000
```

Customize as per your configuration.

## Usage

- **Reward Claiming**: Users scan a QR code, which redirects them to the claim page (e.g., `/redeem/:token`). They then fill in the required details and submit the form.
- **Theme Toggling**: Use the theme toggle button in the navbar to switch between light and dark modes.
- **Navigation**: The homepage provides a starting point for users to understand the reward process. In case of errors (e.g., invalid QR code), the application redirects to a dedicated error page.

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - GSAP (for animations)
  - Axios (for API requests)
- **Backend**:
  - Node.js & Express
  - MongoDB with Mongoose
  - Dotenv (for environment configuration)
  - CORS & Body Parser Middleware


Happy Coding!
