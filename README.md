# 🚀 Height Comparison Dashboard

A premium real-time height comparison web tool built with **React**, **Tailwind CSS**, and **Framer Motion**.
Designed to feel like a modern SaaS product with instant visual feedback, smooth animations, and shareable charts — no backend required.

---

## ✨ Features

* ⚡ Real-time height scaling (1 cm = 1 px)
* 📏 Metric ↔ Imperial unit toggle
* 🚪 Door reference (210 cm) for scale comparison
* 🎬 Smooth animations using Framer Motion
* 📸 Download chart as PNG (UI auto-hidden)
* 🔗 Shareable link via URL (no database)
* 📱 Mobile-friendly responsive layout
* 🧊 Premium glass-style UI

---

## 🛠️ Tech Stack

* React Vite 
* Tailwind CSS
* Framer Motion
* html-to-image
* Modern Web APIs (Clipboard, Share API)

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/ajaychaurasiya-cs/hcwt.git
cd hcwt
```

Install dependencies:

```bash
npm install
```

Install required libraries:

```bash
npm install framer-motion html-to-image
```

---

## ▶️ Running the App

Start development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📊 How to Use

### 1️⃣ Enter Height

Type your height in centimeters in the input field.

👉 The vertical bar updates instantly
👉 Scale: **1 cm = 1 pixel**

---

### 2️⃣ Toggle Units

Click the unit button to switch between:

* Metric (cm)
* Imperial (ft/in)

---

### 3️⃣ Compare with Door

A fixed door (210 cm) is shown beside your height for real-world context.

---

### 4️⃣ Download Image

Click **Download Image** to save a clean PNG.

✔ Only silhouettes and measurements included
❌ UI controls automatically hidden

Perfect for sharing on social media.

---

### 5️⃣ Share Link (No Backend)

Click **Share Link** to generate a URL that recreates your chart.

Example:

```
?height=170&unit=cm
```

Anyone opening the link will see the exact same comparison.

✔ Works on WhatsApp, Telegram, Email, etc.
✔ No login required
✔ No database needed

---

## 🔗 How Sharing Works

The app stores chart data inside the URL using query parameters.

Example:

```
http://localhost:5173/?height=185&unit=ft
```

On page load, the app reads the parameters and restores the state.

---

## 📱 Mobile Support

* Horizontal scrolling for tall comparisons
* Responsive layout
* Native share dialog on supported devices

---

## 🧪 Screenshot Mode

When generating an image:

1. UI elements temporarily hidden
2. Chart rendered to PNG
3. UI restored automatically

---

## 📂 Project Structure

```
src/
 ├── App.jsx
 └── main.jsx
```

---

## 🧠 Use Cases

* Social media content
* Educational tools
* Fun comparisons
* Product design demos
* Viral web experiments

---

## 🚀 Future Improvements

* Multiple person comparison
* Real human silhouettes
* Drag-and-drop objects
* Zoom-to-fit scaling
* Theme customization
* Export as SVG/PDF

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

---

## 📄 License

MIT License — free for personal and commercial use.

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub.

---
