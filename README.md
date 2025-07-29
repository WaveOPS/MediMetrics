# MediMetrics - Geofencing-based MR Reporting App

A mobile + web application designed to revolutionize how pharmaceutical companies manage Medical Representatives (MRs) using geofencing technology, real-time dashboards, and automation.

## 📌 Project Summary

**MediMetrics** improves accountability, transparency, and operational efficiency in pharmaceutical field operations. It enables:
- Real-time tracking of MRs' doctor visits
- Geofencing to ensure location-verified feedback
- Automated attendance calculation
- Seamless admin dashboards for monitoring and management

This was developed as part of a mini project for the **Bachelor of Engineering (Computer Engineering)** degree at **Saraswati College of Engineering**, Mumbai University.

## 🚀 Features

### MR Android App (Kotlin + Jetpack Compose)
- 🔐 Login with admin-provided credentials
- 📷 Selfie submission for attendance proof
- 🗓️ Daily tour planning with doctor list
- 📍 Dynamic geofencing per doctor location
- 📝 Feedback submission (only within geofence)
- 📊 Attendance auto-marked based on completed visits

### Admin Web Dashboard (React + PHP + MySQL)
- 👥 Manage MRs and doctor profiles
- 🛰️ Live tracking of MRs' location and visit progress
- 📝 View submitted feedback and tour plans
- 📅 Attendance and rescheduling view
- 🧾 Historical reports and data export

## ⚙️ Tech Stack

| Layer             | Tech Used                      |
|------------------|---------------------------------|
| Android App      | Kotlin, Jetpack Compose         |
| Web Dashboard    | React.js                        |
| Backend APIs     | PHP                             |
| Database         | MySQL                           |
| Geofencing       | Google Play Location Services   |
| Hosting (Planned)| Firebase / Cloud Platform       |

## 🖥️ System Architecture

The system includes:
- Android app for MRs (frontend)
- Web dashboard for managers (frontend)
- PHP backend API layer
- MySQL database
- Geofencing logic (app-side)

![Workflow](https://github.com/OmMoholkar/MediMetrics/blob/main/docs/workflow-diagram.png) *(optional)*

## 📱 Screenshots

> Replace these with actual screenshots or remove this section.

| MR App | Admin Dashboard |
|--------|------------------|
| ![App Login](docs/app-login.png) | ![Dashboard](docs/admin-dashboard.png) |

## 🛠️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/OmMoholkar/MediMetrics.git
cd MediMetrics
```

### 2. Android App

- Open **AppTest** folder in Android Studio
- Connect to an emulator/device
- Run the app

### 3. Web Dashboard

- Install dependencies:
```
cd web-dashboard
npm install
```

- Start development server:

```
npm run dev
```

### 4. Backend API (PHP)

- Place PHP files in an Apache/XAMPP server environment
- Create MySQL DB using the provided medimetrics_db.sql
- Configure database credentials in config.php

## 🧪 Testing

- Simulate tour plan → doctor selection → enter geofence → feedback → view admin dashboard updates
- Use GPS mocking tools for accurate testing

## 📈 Results (Summary)

- Improved real-time visibility into MR activity
- Prevented false reporting via geofencing lock
- Automated full-day/half-day attendance
- Easy rescheduling of doctor visits
- High user satisfaction among test group

## 👨‍💻 Authors

- [Om Moholkar](https://github.com/OmMoholkar)
- [Pawan Jamkhande](https://github.com/PawanJamkhande) <!-- Replace with correct GitHub if available -->
- [Shital Prajapati](https://github.com/Shital2005)
