# Signal Processing Learning App

## Overview
The **Signal Processing Learning App** is an interactive web application designed to help users learn and practice signal processing concepts. It features two main sections: **Course** and **Quiz**. The app is built using **Angular** for the frontend and **Python (Flask)** for the backend, with AI integration for dynamic quiz generation.

---

## Features

### 1. Course Section
The **Course** section is divided into two subsections: **Basics** and **Examples**.

#### A. Basics
- **Functions**: Learn about basic signal processing functions like `rect(t)`, `tri(t)`, `u(t)`, and `delta(t)`.
- **Characteristics**: For each function, explore its properties:
  - Temporal representation (time-domain graph).
  - Frequency representation (if applicable).
  - Periodicity (periodic or non-periodic).
  - Energy and power calculations.
- **Graphics**: Each function is displayed with an **animated graph** that builds up over time.
- **Interactivity**:
  - Hover over or click on parts of the graph to see specific details (e.g., amplitude at a specific time).
  - Use the "Reset" button to clear the graph with a smooth animation.

#### B. Examples
- **Flash Cards**: Each card represents a function (e.g., `x1(t)`, `x2(t)`, ..., `x13(t)`).
  - **Front of Card**: Title of the function (e.g., `x1(t) = 2 * Rect(2t - 1)`).
  - **Back of Card**: Detailed information about the function (same as in **Basics**).
- **Custom Function**:
  - One flash card is titled **"Custom"**.
  - Users can input their own function (e.g., `2 * sin(t) + tri(t)`).
  - The app analyzes the function and displays its characteristics.
- **Animations**:
  - Graphs animate into view when a flash card is opened.
  - Graphs animate out of view when the card is closed.

---

### 2. Quiz Section
- **Purpose**: Test the user’s understanding of signal processing concepts.
- **Question Types**:
  1. **Signal Graph with Multiple-Choice Equations**:
     - Display a graph of a signal.
     - Provide four equations as choices, with one being correct.
  2. **Equation with Multiple Corresponding Graphs**:
     - Display an equation.
     - Provide four graphs as choices, with one being correct.
  3. **Graph with Multiple Energy Values**:
     - Display a graph of a signal.
     - Provide four energy values as choices, with one being correct.
  4. **Equation with Multiple Energy Values**:
     - Display an equation.
     - Provide four energy values as choices, with one being correct.
- **AI Integration**:
  - Use the **DeepSeek API** to generate quiz questions dynamically.
- **Feedback**:
  - Correct answers turn **green**.
  - Incorrect answers turn **red**, and the correct card turns **green**.
- **Scoring**:
  - Display the user’s score at the end of the quiz (e.g., `20/20`).
  - Provide a summary of correct and incorrect answers.

---

### 3. Additional Features
- **Dark/Light Mode**: Switch between dark and light themes.
- **Progress Tracking**: Save user progress (e.g., completed courses, quiz scores).
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Animations**: Smooth transitions and hover effects for a polished look.

---

## Technical Implementation

### Frontend (Angular)
- **Libraries**:
  - `angular-highcharts` for interactive graphs.
  - `HttpClient` for making API requests.
- **Components**:
  - `CourseSection`: Contains `Basics` and `Examples` subsections.
  - `QuizSection`: Handles quiz logic and rendering.
  - `FlashCard`: A reusable component for displaying function information.
  - `Graph`: A reusable component for rendering animated graphs.

### Backend (Python)
- **Framework**: Use `Flask` to create a RESTful API.
- **Endpoints**:
  - `/api/generate-quiz`: Generates quiz questions using the DeepSeek API.
  - `/api/analyze-function`: Analyzes custom functions and returns their characteristics.
- **AI Integration**:
  - Use the DeepSeek API to generate quiz questions and analyze functions.

### Communication
- The frontend (Angular) communicates with the backend (Python) via HTTP requests (e.g., `HttpClient`).

---

## How to Run the App

### 1. Clone the Repository
```bash
git clone https://github.com/Mouhadjer20/signalviz.git
cd signal-processing-app
```

### 2. Set Up the Backend
#### 1. Navigate to the `backend` folder:
```bash
cd backend
```
#### 2. Install Python dependencies:
```bash
pip install -r requirements.txt
```
### 3. Generate an API Key from OpenRouter AI:
1. Go to the *[OpenRouter AI website](https://openrouter.ai/)*.
2. Sign up or log in to your account.
3. Navigate to the API Keys section.
4. Generate a new API key.

### 4. Set the API Key:
1. Open the app.py file in the backend folder.
2. Locate the `api_key` variable:
```python
api_key = "your-openrouter-api-key"  # Replace with your actual API key
```
3. Replace `"your-openrouter-api-key"` with the API key you generated.

#### 3. Run the backend server:
```bash
python app.py
```

### 4. Set Up the Frontend
#### 1. Navigate to the `frontend` folder:
```bash
cd ../frontend
```
#### 2. Install Node.js dependencies:
```bash
npm install
```
#### 3. Run the Angular development server:
```bash
ng serve -o
```

### 5. Open the App
Open your browser and navigate to `http://localhost:4200`.

---
