# Tomato-Diagnose

Tomato-Diagnose is a CNN-based Tomato Leaf Disease Detection System that classifies leaves as Early Blight, Late Blight, or Healthy. 
It includes image preprocessing and augmentation to improve model accuracy and uses a FastAPI backend to serve predictions. 
Optional Docker + TensorFlow Serving setup allows scalable deployment of the ML model.

---

## 🚀 Features
- Detects Early Blight, Late Blight, and Healthy tomato leaves
- Image preprocessing and augmentation for improved accuracy
- FastAPI backend serving predictions through REST API
- User-friendly React frontend
- Optional Docker + TensorFlow Serving for production-ready scalable deployment

---

## 🛠 Tech Stack
- Python (TensorFlow, Keras, NumPy, Pandas)
- FastAPI & Uvicorn for backend API
- React for frontend
- Node.js / npm for frontend dependencies
- TensorFlow Serving & Docker (optional, for scalable deployment)

---
## 💻 How to Run Locally

### 1️⃣ Backend
**Navigate to backend folder:**
cd backend

**(Optional) Activate virtual environment:**
- **PowerShell:**
.\myenv\Scripts\Activate.ps1
- **CMD:**
myenv\Scripts\activate.bat

**Install dependencies:**
pip install -r requirements.txt

**Start backend server**
- python main.py
- Backend runs on: http://localhost:8000

### 2️⃣ Frontend
**Navigate to frontend folder:**
cd frontend

**Install npm dependencies:**
npm install

**Start frontend server**
- npm start
- Frontend runs on: http://localhost:3000

### 3️⃣ REST API Endpoint
Example: http://localhost:8000/predict

Input: JSON or image data

Output: Prediction results: “Early Blight”, “Late Blight”, or “Healthy”


