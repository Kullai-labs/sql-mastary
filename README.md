# ⚛️ SQL Mastery Hub

Welcome to the **SQL Mastery Hub**! This is a premium, interactive, glassmorphic education platform designed to help you master SQL from scratch, solve frequently asked interview questions, avoid common mistakes, and practice queries in real-time.

Live Code Repository: [https://github.com/Kullai-labs/sql-mastary](https://github.com/Kullai-labs/sql-mastary)

---

## 🚀 Key Features

1. **📚 Deep-Dive Modules**: 8 comprehensive syllabus sections covering everything from RDBMS basics, DDL/DML, aggregations, complex Joins, Subqueries, CTEs, Window Functions, to Indexing and Query Tuning.
2. **🏢 70 MNC Interview Questions**: A curated list of 70 real-world interview questions asked at top tech companies like Google, Amazon, Meta, Microsoft, Netflix, Apple, Uber, and Stripe. Complete with problem descriptions, database schemas, standard SQL queries, and detailed explanations.
3. **⚠️ Beginner Traps & Anti-Patterns**: A detailed visual comparison of 6 common SQL beginner mistakes (such as `SELECT *` in production, non-sargable WHERE queries, and NULL comparison issues) with side-by-side **Bad** vs **Good** practice diffs.
4. **💡 Interview Strategy Tips**: A walkthrough guide with actionable tips for the clarification phase, query structure, edge cases, and discussing query performance during technical interviews.
5. **💻 Browser SQL Simulator**: An in-memory SQL execution workspace. Write and run queries directly in your browser against sandbox `employees` and `departments` tables and see results in a formatted output table instantly.
6. **🎓 Knowledge Check Quiz**: An interactive multiple-choice quiz with progress bars, immediate visual feedback, and explanations to test your SQL expertise.
7. **🌌 Gravity Particle Canvas**: An interactive HTML5 Canvas background where SQL key terms float and orbit around your cursor using particle physics.

---

## 📂 Project Structure

```text
sql-mastery-hub/
├── index.html   # Main layout structure & navigation links
├── style.css    # Design tokens, syntax theme, glassmorphic layout & animations
├── app.js       # Navigation, Canvas physics engine, SQL simulator, and Quiz controller
├── data.js      # Core static database of 70 questions, topics, mistakes, and checklists
└── README.md    # Documentation
```

---

## 🛠️ How to Run Locally

Since the SQL Mastery Hub is a pure static web app, there are no dependencies to install. 

### Method 1: Double Click
Simply open the folder and double-click **`index.html`** to load the website directly in any web browser.

### Method 2: Serve via Local Dev Server
To run a local server (recommended for clean relative-path loading):

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```
Then, visit `http://localhost:8000` in your browser.
