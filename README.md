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

| Layer             | Tech Used                       |
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

```bash
git clone https://github.com/OmMoholkar/MediMetrics.git
cd MediMetrics
