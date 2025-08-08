# WTWR (What to Wear?): Front End

_A weather-smart wardrobe assistant with a modern, responsive interface._

---

## Live Project

**Domain:** [https://www.wtwr.moonangel.com/](https://www.wtwr.moonangel.com/)  
**Back-End Repository:** [https://github.com/michelleoco/se_project_express](https://github.com/michelleoco/se_project_express)

---

## Introduction

**What To Wear (WTWR)** is a **full-stack web application** that reads weather data from an external Weather API and recommends suitable clothing to the user based on the conditions.

This repository contains the **React.js + Vite front end**, which provides the interactive interface for managing wardrobe items, displaying live weather, and receiving personalized outfit suggestions.

---

## Project Goals

- Create a clean, responsive, and intuitive front-end experience for WTWR users.
- Display weather data in real time and tailor outfit suggestions accordingly.
- Allow authenticated users to manage a personal wardrobe.
- Ensure smooth integration with the back-end API.

---

## What Was Done

The front end was built with **React.js** using Vite for a fast development experience and optimized builds.

Key steps included:

1. **UI/UX Development**
   - Designed layouts and interactions in **Figma**.
   - Implemented a responsive design for desktop and mobile.
2. **API Integration**
   - Connected to the WTWR back-end API for user authentication, CRUD wardrobe operations, and fetching weather-based recommendations.
3. **Routing & State Management**

   - Implemented navigation with **React Router**.
   - Used React hooks for managing component state and side effects.

4. **Styling & Organization**
   - Used **CSS** with **BEM methodology** for maintainable styles.

---

## Features

- **User authentication** (signup/signin)
- **Wardrobe management** (add, edit, delete items)
- **Live weather display** with outfit recommendations
- **Responsive UI** for all screen sizes
- **Form validation** with instant feedback
- **Fast builds and hot reloading** with Vite

---

## Tech Stack

- **Figma** – Design content and prototypes
- **HTML5 / CSS3** – Structure & styling
- **JavaScript (ES6)** – Logic
- **React.js + Vite** – Front-end framework & build tool
- **Node.js** – Development environment
- **NPM** – Package management
- **APIs** – Weather API & custom WTWR API

---

## Screenshots

_(Replace these placeholders with actual screenshots)_

**Homepage (Weather & Recommendations)**  
![Homepage Screenshot](./screenshots/homepage.png)

**Wardrobe Management Page (Profile)**  
![Profile Screenshot](./screenshots/profile.png)

---

## Conclusion

The WTWR front end delivers:

- A clean, modern, and responsive interface.
- Real-time outfit recommendations based on live weather data.
- Smooth integration with the back end for a complete full-stack experience.

---

## Future Improvements

- **Add drag-and-drop** functionality for wardrobe item organization.
- **Implement dark mode** for better accessibility.
- **Improve offline experience** with service workers.
- **Fix**: Optimize image loading using lazy loading **to achieve** faster mobile performance.

---

## Deployment & Requirements

**Requirements:**

- Node.js ≥ 18
- npm ≥ 9.0

**Installation:**

```bash
git clone https://github.com/your-username/wtwr-frontend.git
cd wtwr-frontend
npm install
```
