// SQL Mastery Hub - App Logic

// Ensure dependencies are loaded
document.addEventListener("DOMContentLoaded", () => {
  initGravityCanvas();
  initRouter();
  initSyllabus();
  initMNCQuestions();
  initSQLSimulator();
  initQuiz();
});

/* ==========================================================================
   1. Interactive Gravity Particle Network (Canvas)
   ========================================================================== */
function initGravityCanvas() {
  const canvas = document.getElementById("gravity-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, active: false };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  const keywords = [
    "SELECT", "INNER JOIN", "LEFT JOIN", "GROUP BY", "HAVING", 
    "WHERE", "CTEs", "WINDOW", "ROW_NUMBER", "DENSE_RANK", 
    "INDEX", "ACID", "COMMIT", "ROLLBACK", "UNION ALL", 
    "COALESCE", "SUBQUERY", "EXPLAIN", "DDL", "DML", 
    "CLUSTERED", "FOREIGN KEY", "HAVING", "LIMIT", "CROSS JOIN"
  ];

  class Particle {
    constructor(text) {
      this.text = text;
      this.reset(true);
      ctx.font = "14px Outfit";
      this.width = ctx.measureText(text).width + 24;
      this.height = 30;
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.mass = 10 + Math.random() * 20;
    }

    update() {
      // Natural float
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around screen boundaries
      if (this.x < -this.width) this.x = width + 10;
      if (this.x > width + 10) this.x = -this.width;
      if (this.y < -30) this.y = height + 10;
      if (this.y > height + 10) this.y = -30;

      // Mouse gravity attraction / repulsion
      if (mouse.active) {
        const dx = mouse.x - (this.x + this.width / 2);
        const dy = mouse.y - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          // Attract towards cursor
          const force = (250 - dist) / 250;
          const pull = force * 0.15;
          this.vx += (dx / dist) * pull;
          this.vy += (dy / dist) * pull;

          // Repel if too close to mouse (acting like orbiting stars)
          if (dist < 80) {
            const push = (80 - dist) * 0.08;
            this.vx -= (dx / dist) * push;
            this.vy -= (dy / dist) * push;
          }
        }
      }

      // Speed friction to avoid particles accelerating to infinity
      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Glassmorphism Capsule style
      ctx.fillStyle = "rgba(19, 15, 38, 0.4)";
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1;

      // Draw rounded rect capsule
      ctx.beginPath();
      ctx.roundRect(0, 0, this.width, this.height, 15);
      ctx.fill();
      ctx.stroke();

      // Soft glow shadow
      ctx.shadowColor = "rgba(6, 182, 212, 0.2)";
      ctx.shadowBlur = 6;

      // Draw text
      ctx.fillStyle = "rgba(156, 163, 175, 0.6)";
      ctx.font = "500 13px Outfit";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.text, this.width / 2, this.height / 2 + 1);

      ctx.restore();
    }
  }

  const particles = keywords.map((k) => new Particle(k));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid background lines (dynamic effect)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update & draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Router & View Controller
   ========================================================================== */
function initRouter() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".app-section");

  function navigateTo(targetId) {
    // Update Nav buttons
    navLinks.forEach((link) => {
      if (link.getAttribute("data-target") === targetId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update Visible Sections
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        section.style.display = "none";
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-target");
      navigateTo(target);
    });
  });

  // Setup landing links (e.g. "Start Learning" button)
  document.querySelectorAll("[data-navigate]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.getAttribute("data-navigate");
      navigateTo(target);
    });
  });

  // Default land
  navigateTo("home");
}

/* ==========================================================================
   3. SQL Syllabus & Interactive Diagrams
   ========================================================================== */
function initSyllabus() {
  const sidebar = document.getElementById("syllabus-sidebar");
  const contentBody = document.getElementById("syllabus-content-body");
  if (!sidebar || !contentBody) return;

  // Render Sidebar buttons
  sidebar.innerHTML = window.SQL_TOPICS.map((topic, index) => `
    <button class="topic-btn ${index === 0 ? "active" : ""}" data-id="${topic.id}">
      <h4>${topic.title}</h4>
      <p>${topic.summary}</p>
    </button>
  `).join("");

  function displayTopic(topicId) {
    const topic = window.SQL_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    let contentHTML = topic.content;

    // Inject SVG Venn diagram dynamically for Joins module
    if (topicId === "joins") {
      contentHTML += `
        <div class="join-diagram-container">
          <h4>Interactive JOIN Venn Diagram</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Hover/Click the buttons below to visualize the dataset returned by different join operations.</p>
          <div class="join-controls">
            <button class="join-control-btn active" data-join="inner">INNER JOIN</button>
            <button class="join-control-btn" data-join="left">LEFT JOIN</button>
            <button class="join-control-btn" data-join="right">RIGHT JOIN</button>
            <button class="join-control-btn" data-join="full">FULL OUTER JOIN</button>
          </div>
          <svg class="join-svg" viewBox="0 0 300 200">
            <!-- Left circle (Table A) -->
            <path id="circle-a" class="join-circle" d="M 120 100 A 60 60 0 1 1 120 99 Z" style="fill: rgba(139, 92, 246, 0.45);"/>
            <!-- Right circle (Table B) -->
            <path id="circle-b" class="join-circle" d="M 180 100 A 60 60 0 1 1 180 99 Z" style="fill: rgba(139, 92, 246, 0.45);"/>
            <!-- Intersecting shape -->
            <path id="intersection" class="join-intersection" d="M 150 50 A 60 60 0 0 1 180 100 A 60 60 0 0 1 150 150 A 60 60 0 0 1 120 100 A 60 60 0 0 1 150 50 Z" style="fill: rgba(6, 182, 212, 0.7);"/>
            
            <!-- Labels -->
            <text x="75" y="105" class="join-label" fill="#fff">Table A</text>
            <text x="225" y="105" class="join-label" fill="#fff">Table B</text>
          </svg>
        </div>
      `;
    }

    contentBody.innerHTML = contentHTML;

    // Re-attach Venn Diagram listeners if active
    if (topicId === "joins") {
      setupJoinDiagram();
    }
  }

  // Handle sidebar clicks
  const topicBtns = sidebar.querySelectorAll(".topic-btn");
  topicBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      topicBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      displayTopic(btn.getAttribute("data-id"));
    });
  });

  // Display initial topic
  displayTopic(window.SQL_TOPICS[0].id);
}

function setupJoinDiagram() {
  const btns = document.querySelectorAll(".join-control-btn");
  const circleA = document.getElementById("circle-a");
  const circleB = document.getElementById("circle-b");
  const intersection = document.getElementById("intersection");

  if (!circleA || !circleB || !intersection) return;

  const joinStates = {
    inner: {
      a: "rgba(139, 92, 246, 0.05)",
      b: "rgba(139, 92, 246, 0.05)",
      i: "rgba(6, 182, 212, 0.85)"
    },
    left: {
      a: "rgba(6, 182, 212, 0.85)",
      b: "rgba(139, 92, 246, 0.05)",
      i: "rgba(6, 182, 212, 0.85)"
    },
    right: {
      a: "rgba(139, 92, 246, 0.05)",
      b: "rgba(6, 182, 212, 0.85)",
      i: "rgba(6, 182, 212, 0.85)"
    },
    full: {
      a: "rgba(6, 182, 212, 0.85)",
      b: "rgba(6, 182, 212, 0.85)",
      i: "rgba(6, 182, 212, 0.85)"
    }
  };

  function applyColors(joinType) {
    const colors = joinStates[joinType];
    circleA.style.fill = colors.a;
    circleB.style.fill = colors.b;
    intersection.style.fill = colors.i;
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyColors(btn.getAttribute("data-join"));
    });
  });

  // Apply default state (inner join)
  applyColors("inner");
}

/* ==========================================================================
   4. 70 MNC Interview Questions Panel (Search, Filter, Paginate)
   ========================================================================== */
function initMNCQuestions() {
  const container = document.getElementById("questions-container");
  const searchInput = document.getElementById("q-search");
  const filterDiff = document.getElementById("q-filter-difficulty");
  const filterCategory = document.getElementById("q-filter-category");
  const filterCompany = document.getElementById("q-filter-company");
  const pagination = document.getElementById("q-pagination");

  if (!container || !pagination) return;

  // Extract distinct categories and companies for dropdown lists
  const categories = [...new Set(window.SQL_QUESTIONS.map((q) => q.category))].sort();
  const companies = [...new Set(window.SQL_QUESTIONS.flatMap((q) => q.companies))].sort();

  // Populate filter selectors
  if (filterCategory) {
    filterCategory.innerHTML = `<option value="all">All Categories</option>` +
      categories.map((c) => `<option value="${c}">${c}</option>`).join("");
  }
  if (filterCompany) {
    filterCompany.innerHTML = `<option value="all">All Companies</option>` +
      companies.map((c) => `<option value="${c}">${c}</option>`).join("");
  }

  let currentPage = 1;
  const itemsPerPage = 8;
  let filteredQuestions = [...window.SQL_QUESTIONS];

  function filterQuestions() {
    const query = searchInput.value.toLowerCase();
    const diff = filterDiff.value;
    const cat = filterCategory.value;
    const comp = filterCompany.value;

    filteredQuestions = window.SQL_QUESTIONS.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(query) || q.problem.toLowerCase().includes(query);
      const matchesDiff = diff === "all" || q.difficulty.toLowerCase() === diff.toLowerCase();
      const matchesCat = cat === "all" || q.category === cat;
      const matchesComp = comp === "all" || q.companies.includes(comp);

      return matchesSearch && matchesDiff && matchesCat && matchesComp;
    });

    currentPage = 1;
    renderQuestions();
  }

  function renderQuestions() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedItems.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-purple);"></i>
          <h3>No matching SQL questions found</h3>
          <p>Try clearing filters or checking spelling.</p>
        </div>
      `;
      pagination.innerHTML = "";
      return;
    }

    container.innerHTML = paginatedItems.map((q) => `
      <div class="question-accordion" id="q-acc-${q.id}">
        <div class="question-header" onclick="toggleAccordion(${q.id})">
          <div class="q-title-area">
            <span class="q-number">Q${q.id}.</span>
            <span class="q-title">${q.title}</span>
            <span class="tag tag-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
            <span class="tag tag-company" style="font-size: 0.7rem;">${q.category}</span>
          </div>
          <div class="q-tags">
            ${q.companies.slice(0, 3).map((c) => `<span class="tag tag-company">${c}</span>`).join("")}
            ${q.companies.length > 3 ? `<span class="tag tag-company">+${q.companies.length - 3}</span>` : ""}
          </div>
          <i class="fa-solid fa-chevron-down accordion-arrow"></i>
        </div>
        <div class="question-body">
          <div class="question-details">
            <div class="q-problem-statement">
              <strong>Problem Statement:</strong><br>
              ${q.problem}
            </div>
            
            ${q.schema ? `
              <div>
                <strong>Table Schema:</strong>
                <pre class="q-schema"><code>${q.schema}</code></pre>
              </div>
            ` : ""}

            <div>
              <div class="q-solution-header">
                <strong>Standard SQL Query:</strong>
                <button class="q-copy-btn" onclick="copySolution(${q.id})">
                  <i class="fa-solid fa-copy"></i> Copy Query
                </button>
              </div>
              <pre><code class="language-sql" id="q-code-${q.id}">${escapeHTML(q.solution)}</code></pre>
            </div>

            <div>
              <strong>Solution Explanation:</strong><br>
              <p style="font-size: 0.95rem; color: var(--text-muted); margin-top: 5px;">${q.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let buttonsHTML = "";

    // Prev Button
    buttonsHTML += `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        buttonsHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttonsHTML += `<span style="color: var(--text-muted);">...</span>`;
      }
    }

    // Next Button
    buttonsHTML += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;

    pagination.innerHTML = buttonsHTML;
  }

  // Bind event listeners
  searchInput.addEventListener("input", filterQuestions);
  filterDiff.addEventListener("change", filterQuestions);
  filterCategory.addEventListener("change", filterQuestions);
  filterCompany.addEventListener("change", filterQuestions);

  // Global functions to bind to DOM
  window.changePage = (page) => {
    currentPage = page;
    renderQuestions();
  };

  window.toggleAccordion = (id) => {
    const accordion = document.getElementById(`q-acc-${id}`);
    if (!accordion) return;

    const isActive = accordion.classList.contains("active");

    // Collapse others in view
    document.querySelectorAll(".question-accordion").forEach((acc) => {
      acc.classList.remove("active");
    });

    if (!isActive) {
      accordion.classList.add("active");
    }
  };

  window.copySolution = (id) => {
    const code = document.getElementById(`q-code-${id}`).innerText;
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.querySelector(`#q-acc-${id} .q-copy-btn`);
      btn.innerHTML = `<i class="fa-solid fa-check" style="color: #10b981;"></i> Copied!`;
      setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Query`;
      }, 2000);
    });
  };

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Initial Draw
  renderQuestions();

  // Populate beginner mistakes list on mistakes panel
  initBeginnerMistakes();
  initInterviewTips();
}

function initBeginnerMistakes() {
  const container = document.getElementById("mistakes-list");
  if (!container) return;

  container.innerHTML = window.BEGINNER_MISTAKES.map((m, i) => `
    <div class="glass-card mistake-card">
      <h3><i class="fa-solid fa-triangle-exclamation"></i> ${i + 1}. ${m.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${m.desc}</p>
      
      <div class="code-comparison">
        <div class="code-comp-box bad">
          <div class="code-comp-label">❌ Bad Practice</div>
          <pre><code class="language-sql">${m.bad}</code></pre>
        </div>
        <div class="code-comp-box good">
          <div class="code-comp-label">✅ Good Practice</div>
          <pre><code class="language-sql">${m.good}</code></pre>
        </div>
      </div>
    </div>
  `).join("");
}

function initInterviewTips() {
  const container = document.getElementById("tips-list-container");
  if (!container) return;

  container.innerHTML = window.INTERVIEW_TIPS.map((cat) => `
    <div class="glass-card tip-category-card">
      <h3>${cat.category}</h3>
      <ul class="tip-list">
        ${cat.tips.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

/* ==========================================================================
   5. SQL Query Simulator (Playground Engine)
   ========================================================================== */
function initSQLSimulator() {
  const sqlInput = document.getElementById("sql-query");
  const runBtn = document.getElementById("run-sql");
  const consoleResult = document.getElementById("console-result");

  if (!sqlInput || !runBtn || !consoleResult) return;

  // Mock Database tables
  const MOCK_DB = {
    departments: [
      { dept_id: 1, dept_name: "Engineering", location: "San Francisco" },
      { dept_id: 2, dept_name: "Product Management", location: "New York" },
      { dept_id: 3, dept_name: "Sales Operations", location: "London" },
      { dept_id: 4, dept_name: "Marketing Analytics", location: "Tokyo" }
    ],
    employees: [
      { emp_id: 101, first_name: "Alice", last_name: "Smith", dept_id: 1, salary: 125000, hire_date: "2021-03-15" },
      { emp_id: 102, first_name: "Bob", last_name: "Johnson", dept_id: 1, salary: 98000, hire_date: "2022-06-01" },
      { emp_id: 103, first_name: "Carol", last_name: "Danvers", dept_id: 2, salary: 135000, hire_date: "2020-01-10" },
      { emp_id: 104, first_name: "David", last_name: "Miller", dept_id: 3, salary: 72000, hire_date: "2023-02-18" },
      { emp_id: 105, first_name: "Eva", last_name: "Green", dept_id: 3, salary: 88000, hire_date: "2021-11-05" },
      { emp_id: 106, first_name: "Frank", last_name: "Wright", dept_id: 4, salary: 67000, hire_date: "2024-05-12" },
      { emp_id: 107, first_name: "Grace", last_name: "Hopper", dept_id: 1, salary: 165000, hire_date: "2019-08-20" },
      { emp_id: 108, first_name: "Harry", last_name: "Potter", dept_id: 2, salary: 55000, hire_date: "2023-10-31" }
    ]
  };

  runBtn.addEventListener("click", () => {
    const rawQuery = sqlInput.value.trim();
    if (!rawQuery) {
      consoleResult.innerHTML = `<span class="terminal-error">Query is empty. Type a SELECT query to run against the database.</span>`;
      return;
    }

    try {
      const resultData = executeMockQuery(rawQuery, MOCK_DB);
      renderTerminalTable(resultData);
    } catch (err) {
      consoleResult.innerHTML = `
        <span class="terminal-error">
          <i class="fa-solid fa-circle-exclamation"></i> SQL Syntax Error:<br>
          ${err.message}
        </span>`;
    }
  });

  function renderTerminalTable(rows) {
    if (!rows || rows.length === 0) {
      consoleResult.innerHTML = `
        <div class="terminal-success-message">
          <i class="fa-solid fa-circle-check"></i> Query executed successfully.
        </div>
        <span style="color: var(--text-muted);">Empty result set (0 rows returned).</span>`;
      return;
    }

    const columns = Object.keys(rows[0]);

    const headerHTML = columns.map((col) => `<th>${col}</th>`).join("");
    const rowsHTML = rows.map((row) => `
      <tr>
        ${columns.map((col) => {
          let val = row[col];
          if (val === null || val === undefined) val = `<span style="color: #6b7280; font-style: italic;">NULL</span>`;
          return `<td>${val}</td>`;
        }).join("")}
      </tr>
    `).join("");

    consoleResult.innerHTML = `
      <div class="terminal-success-message">
        <i class="fa-solid fa-circle-check"></i> Query executed successfully. (${rows.length} rows returned)
      </div>
      <table class="terminal-table">
        <thead><tr>${headerHTML}</tr></thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    `;
  }

  // Pre-load a default query
  sqlInput.value = `SELECT e.emp_id, e.first_name, e.salary, d.dept_name 
FROM employees e 
JOIN departments d ON e.dept_id = d.dept_id 
WHERE e.salary > 80000 
ORDER BY e.salary DESC;`;
}

/**
 * A client-side Mock SQL Select Interpreter in JS
 * Supports: columns, aliases, inner/left join (single), where filters, order by, limit
 */
function executeMockQuery(queryStr, db) {
  // Normalize Query
  let sql = queryStr.replace(/\s+/g, " ").trim();
  if (sql.endsWith(";")) sql = sql.slice(0, -1).trim();

  // Basic Check
  if (!sql.toUpperCase().startsWith("SELECT")) {
    throw new Error("Only SELECT queries are supported in this browser console simulator.");
  }

  // Regex Parsing clauses
  const selectRegex = /^SELECT\s+(.*?)\s+FROM\s+(.*?)(?:\s+JOIN\s+(.*?)\s+ON\s+(.*?))?(?:\s+WHERE\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i;
  const match = sql.match(selectRegex);

  if (!match) {
    throw new Error("Could not parse query. Verify structure: SELECT [cols] FROM [table] [JOIN table ON c1=c2] [WHERE condition] [ORDER BY col] [LIMIT n]");
  }

  const selectClause = match[1].trim();
  const primaryTableClause = match[2].trim();
  const joinTableClause = match[3] ? match[3].trim() : null;
  const joinConditionClause = match[4] ? match[4].trim() : null;
  const whereClause = match[5] ? match[5].trim() : null;
  const orderByClause = match[6] ? match[6].trim() : null;
  const limitClause = match[7] ? match[7].trim() : null;

  // 1. Resolve Tables & Aliases
  const parseTableAndAlias = (clause) => {
    const parts = clause.split(/\s+/);
    const tableName = parts[0].toLowerCase();
    const alias = parts[1] || parts[0]; // defaults to table name
    return { tableName, alias };
  };

  const primaryTable = parseTableAndAlias(primaryTableClause);
  if (!db[primaryTable.tableName]) {
    throw new Error(`Table '${primaryTable.tableName}' not found. Available: employees, departments`);
  }

  let joinTable = null;
  if (joinTableClause) {
    joinTable = parseTableAndAlias(joinTableClause);
    if (!db[joinTable.tableName]) {
      throw new Error(`Joined Table '${joinTable.tableName}' not found.`);
    }
  }

  // Clone datasets
  let workingData = db[primaryTable.tableName].map(row => {
    const newRow = {};
    for (let key in row) {
      newRow[`${primaryTable.alias}.${key}`] = row[key];
    }
    return newRow;
  });

  // 2. Process JOIN
  if (joinTable) {
    // Parse Join condition like: e.dept_id = d.dept_id
    const condParts = joinConditionClause.split("=");
    if (condParts.length !== 2) {
      throw new Error(`Invalid JOIN condition: '${joinConditionClause}'. Must be format table1.col1 = table2.col2`);
    }

    const condLeft = condParts[0].trim();
    const condRight = condParts[1].trim();

    const joinedData = [];

    // Loop through primary table, lookup in join table
    workingData.forEach((rowA) => {
      let matched = false;
      db[joinTable.tableName].forEach((rowB) => {
        // Construct rowB key map
        const rowBObj = {};
        for (let key in rowB) {
          rowBObj[`${joinTable.alias}.${key}`] = rowB[key];
        }

        // Test Join condition
        const valLeft = rowA[condLeft] !== undefined ? rowA[condLeft] : rowBObj[condLeft];
        const valRight = rowA[condRight] !== undefined ? rowA[condRight] : rowBObj[condRight];

        if (valLeft !== undefined && valRight !== undefined && String(valLeft) === String(valRight)) {
          joinedData.push({ ...rowA, ...rowBObj });
          matched = true;
        }
      });

      // Handle Left Join if no match (fill with nulls)
      if (!matched) {
        const nullRowB = {};
        for (let key in db[joinTable.tableName][0]) {
          nullRowB[`${joinTable.alias}.${key}`] = null;
        }
        joinedData.push({ ...rowA, ...nullRowB });
      }
    });

    workingData = joinedData;
  }

  // 3. Process WHERE filter
  if (whereClause) {
    // Basic filter matching format: alias.col op value
    // Support operators: =, >, <, !=, LIKE
    const opMatch = whereClause.match(/(.*?)(=|!=|>|<|\bLIKE\b)(.*)/i);
    if (!opMatch) {
      throw new Error(`Unsupported or invalid WHERE clause: '${whereClause}'`);
    }

    const field = opMatch[1].trim();
    const operator = opMatch[2].trim().toUpperCase();
    let valStr = opMatch[3].trim();

    // Strip quotes from value
    if ((valStr.startsWith("'") && valStr.endsWith("'")) || (valStr.startsWith('"') && valStr.endsWith('"'))) {
      valStr = valStr.slice(1, -1);
    }

    workingData = workingData.filter((row) => {
      let rowVal = row[field];
      if (rowVal === undefined) {
        // Check if query omitted alias prefixes
        const fallbackKey = Object.keys(row).find((k) => k.endsWith(`.${field}`));
        rowVal = row[fallbackKey];
      }

      if (rowVal === undefined || rowVal === null) return false;

      // Type cast if number
      const isNum = !isNaN(rowVal) && !isNaN(parseFloat(rowVal));
      const parsedRowVal = isNum ? parseFloat(rowVal) : rowVal;
      const parsedValStr = isNum ? parseFloat(valStr) : valStr;

      if (operator === "=") return String(parsedRowVal).toLowerCase() === String(parsedValStr).toLowerCase();
      if (operator === "!=") return String(parsedRowVal).toLowerCase() !== String(parsedValStr).toLowerCase();
      if (operator === ">") return parsedRowVal > parsedValStr;
      if (operator === "<") return parsedRowVal < parsedValStr;
      if (operator === "LIKE") {
        const regexStr = parsedValStr.replace(/%/g, ".*").replace(/_/g, ".");
        const regex = new RegExp(`^${regexStr}$`, "i");
        return regex.test(String(parsedRowVal));
      }
      return false;
    });
  }

  // 4. Select Projection Columns
  let projectedData = [];
  const rawSelectItems = selectClause.split(",").map(item => item.trim());

  workingData.forEach((row) => {
    const projRow = {};
    rawSelectItems.forEach((item) => {
      // Handle SELECT *
      if (item === "*") {
        for (let key in row) {
          // Remove prefix in table view for neatness
          const viewKey = key.split(".")[1];
          projRow[viewKey] = row[key];
        }
      } else {
        // Handle aliases like `e.first_name AS name`
        const aliasMatch = item.match(/(.*?)\s+AS\s+(.*)/i);
        let fieldName = item;
        let finalColName = item;

        if (aliasMatch) {
          fieldName = aliasMatch[1].trim();
          finalColName = aliasMatch[2].trim();
        } else {
          // Defaults name to end column name (e.g. e.salary -> salary)
          const parts = item.split(".");
          finalColName = parts[parts.length - 1];
        }

        let val = row[fieldName];
        if (val === undefined) {
          // Fallback if user didn't write alias in SELECT
          const fallbackKey = Object.keys(row).find((k) => k.endsWith(`.${fieldName}`));
          val = row[fallbackKey];
        }

        if (val === undefined && !aliasMatch) {
          throw new Error(`Unknown column '${fieldName}' in SELECT clause.`);
        }

        projRow[finalColName] = val !== undefined ? val : null;
      }
    });
    projectedData.push(projRow);
  });

  // 5. ORDER BY Sort
  if (orderByClause) {
    const orderParts = orderByClause.split(/\s+/);
    const sortField = orderParts[0].trim();
    const sortDirection = orderParts[1] ? orderParts[1].toUpperCase() : "ASC";

    projectedData.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Fallback if query specified table alias prefix in order clause, e.g. e.salary
      if (valA === undefined) {
        const cleanField = sortField.split(".").pop();
        valA = a[cleanField];
        valB = b[cleanField];
      }

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "DESC" ? valB - valA : valA - valB;
      }

      return sortDirection === "DESC"
        ? String(valB).localeCompare(String(valA))
        : String(valA).localeCompare(String(valB));
    });
  }

  // 6. LIMIT slice
  if (limitClause) {
    const lim = parseInt(limitClause, 10);
    if (!isNaN(lim)) {
      projectedData = projectedData.slice(0, lim);
    }
  }

  return projectedData;
}

/* ==========================================================================
   6. Interactive Quiz Engine
   ========================================================================== */
function initQuiz() {
  const quizQuestions = [
    {
      q: "Which SQL clause is used to filter query results based on aggregate functions?",
      options: ["WHERE", "HAVING", "GROUP BY", "FILTER"],
      answer: 1,
      exp: "Aggregate values (like SUM, COUNT, AVG) are checked in the HAVING clause. The WHERE clause is executed before rows are aggregated, making it invalid for filtering grouped summaries."
    },
    {
      q: "What is the key difference between UNION and UNION ALL?",
      options: [
        "UNION keeps duplicates, UNION ALL filters them.",
        "UNION ALL automatically removes duplicates.",
        "UNION removes duplicates, UNION ALL keeps duplicates (making it faster).",
        "There is no difference in behavior."
      ],
      answer: 2,
      exp: "UNION performs a sorting and deduplication pass over the output, removing duplicates. UNION ALL simply concatenates result sets together, bypassing deduplication and executing much faster."
    },
    {
      q: "If an indexed column is wrapped in a function (e.g. WHERE YEAR(hire_date) = 2023), how does it affect query execution?",
      options: [
        "It speeds up execution because the dataset is pre-computed.",
        "It makes the query non-sargable, preventing the database from using the index.",
        "It causes an automatic syntax compiler crash.",
        "Indexes cannot be used on date fields anyway."
      ],
      answer: 1,
      exp: "Wrapping indexed columns in functions (like YEAR(), LOWER(), CONCAT()) invalidates index usage (makes it non-sargable). The database engine must scan the entire table, running the function on every row."
    },
    {
      q: "Which Transaction Isolation Level is immune to Dirty Reads, Non-Repeatable Reads, and Phantom Reads?",
      options: ["Read Committed", "Read Uncommitted", "Repeatable Read", "Serializable"],
      answer: 3,
      exp: "Serializable is the highest isolation level. It enforces strict lock policies, locking ranges of records to guarantee that concurrent transactions execute as if they were ordered sequentially."
    },
    {
      q: "What does the expression COALESCE(salary, 0) evaluate to if the salary is NULL?",
      options: ["Throws an error", "Returns NULL", "Returns 0", "Returns empty string"],
      answer: 2,
      exp: "COALESCE returns the first non-null argument in its parameter list. If 'salary' is null, it falls back to the second argument, which is 0."
    },
    {
      q: "What happens if a NOT IN subquery returns even a single NULL value?",
      options: [
        "NULL values are skipped automatically.",
        "The query errors out with a data exception.",
        "The entire outer query evaluates to empty (zero rows).",
        "It returns only rows that are not null."
      ],
      answer: 2,
      exp: "Due to SQL's three-valued logic, comparing anything with NULL using NOT IN yields UNKNOWN. Since UNKNOWN is not TRUE, the query filters out all rows, resulting in an empty output. Use NOT EXISTS instead."
    },
    {
      q: "Which window function assigns rankings where tie values get the same rank, and subsequent ranks skip sequence steps (e.g., 1, 2, 2, 4)?",
      options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "LAG()"],
      answer: 1,
      exp: "RANK() assigns duplicate scores identical ranks, and skips downstream ranks. DENSE_RANK() ranks duplicate values identically but does not skip any ranks in the sequence."
    }
  ];

  let currentQuestionIdx = 0;
  let score = 0;
  let hasAnswered = false;

  const quizArea = document.getElementById("quiz-area");
  if (!quizArea) return;

  function loadQuestion() {
    hasAnswered = false;
    const qData = quizQuestions[currentQuestionIdx];

    const progressPercent = (currentQuestionIdx / quizQuestions.length) * 100;

    quizArea.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress" style="width: ${progressPercent}%;"></div>
      </div>
      <div class="quiz-meta">
        <span>Question ${currentQuestionIdx + 1} of ${quizQuestions.length}</span>
        <span>Score: ${score}</span>
      </div>
      <div class="quiz-question-box">
        <h3>${qData.q}</h3>
        <div class="quiz-options">
          ${qData.options.map((opt, idx) => `
            <button class="quiz-option" onclick="submitAnswer(${idx})">${opt}</button>
          `).join("")}
        </div>
        <div id="quiz-feedback-box"></div>
      </div>
    `;
  }

  window.submitAnswer = (selectedIdx) => {
    if (hasAnswered) return;
    hasAnswered = true;

    const qData = quizQuestions[currentQuestionIdx];
    const options = document.querySelectorAll(".quiz-option");
    const feedbackBox = document.getElementById("quiz-feedback-box");

    const isCorrect = selectedIdx === qData.answer;

    // Highlight choices
    options.forEach((opt, idx) => {
      if (idx === qData.answer) {
        opt.classList.add("correct");
      } else if (idx === selectedIdx && !isCorrect) {
        opt.classList.add("incorrect");
      }
    });

    if (isCorrect) {
      score++;
    }

    // Display explanation
    feedbackBox.innerHTML = `
      <div class="quiz-explanation">
        <h4>${isCorrect ? "🎉 Correct!" : "❌ Incorrect"}</h4>
        <p>${qData.exp}</p>
        <button class="btn btn-primary" onclick="nextQuizStep()" style="margin-top: 15px; width: 100%; justify-content: center;">
          ${currentQuestionIdx + 1 === quizQuestions.length ? "Finish Quiz" : "Next Question"} <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;
  };

  window.nextQuizStep = () => {
    currentQuestionIdx++;
    if (currentQuestionIdx < quizQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  };

  function showResults() {
    const percent = Math.round((score / quizQuestions.length) * 100);
    let message = "";

    if (percent >= 90) message = "🏆 Outstanding! You are a SQL Master!";
    else if (percent >= 70) message = "👏 Great job! You are interview-ready.";
    else message = "📚 Keep learning and try again to improve your score.";

    quizArea.innerHTML = `
      <div class="glass-card quiz-results-card">
        <h2>Quiz Complete</h2>
        <div class="score-circle">
          <span class="score-num">${score}/${quizQuestions.length}</span>
          <span class="score-label">${percent}% Correct</span>
        </div>
        <p style="font-size: 1.1rem;">${message}</p>
        <button class="btn btn-primary" onclick="restartQuiz()"><i class="fa-solid fa-rotate-left"></i> Retake Quiz</button>
      </div>
    `;
  }

  window.restartQuiz = () => {
    currentQuestionIdx = 0;
    score = 0;
    loadQuestion();
  };

  // Trigger initial quiz question load
  loadQuestion();
}
