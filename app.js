// SQL Mastery Hub - Upgraded App Logic (v2)

// Global database session state
let MOCK_DB = {
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

// Track created table structures dynamically for schema panel
let DYNAMIC_SCHEMAS = {
  departments: { dept_id: "INT", dept_name: "VARCHAR", location: "VARCHAR" },
  employees: { emp_id: "INT", first_name: "VARCHAR", last_name: "VARCHAR", dept_id: "INT", salary: "INT", hire_date: "DATE" }
};
let userCreatedTables = [];

document.addEventListener("DOMContentLoaded", () => {
  initGravityCanvas();
  initRouter();
  initSyllabus();
  initMNCQuestions();
  initSQLSimulator();
  initQuiz();
  initRoadmap();
  initResourceHub();
  initRecommendationEngine();
  setupAdminForms();
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
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -this.width) this.x = width + 10;
      if (this.x > width + 10) this.x = -this.width;
      if (this.y < -30) this.y = height + 10;
      if (this.y > height + 10) this.y = -30;

      if (mouse.active) {
        const dx = mouse.x - (this.x + this.width / 2);
        const dy = mouse.y - (this.y + this.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          const force = (250 - dist) / 250;
          const pull = force * 0.15;
          this.vx += (dx / dist) * pull;
          this.vy += (dy / dist) * pull;

          if (dist < 80) {
            const push = (80 - dist) * 0.08;
            this.vx -= (dx / dist) * push;
            this.vy -= (dy / dist) * push;
          }
        }
      }

      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = "rgba(19, 15, 38, 0.4)";
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(0, 0, this.width, this.height, 15);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = "rgba(6, 182, 212, 0.2)";
      ctx.shadowBlur = 6;
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

  window.navigateTo = (targetId) => {
    navLinks.forEach((link) => {
      if (link.getAttribute("data-target") === targetId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    sections.forEach((section) => {
      if (section.id === targetId) {
        section.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        section.style.display = "none";
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-target");
      window.navigateTo(target);
    });
  });

  document.querySelectorAll("[data-navigate]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.getAttribute("data-navigate");
      window.navigateTo(target);
    });
  });

  window.navigateTo("home");

  window.launchProject = (projName) => {
    const selectEl = document.getElementById("project-select");
    if (selectEl) {
      selectEl.value = projName;
      // Dispatch a change event so the project select change handler runs!
      selectEl.dispatchEvent(new Event("change"));
    }
    window.navigateTo("simulator");
  };
}

/* ==========================================================================
   3. SQL Syllabus & Interactive Diagrams
   ========================================================================== */
function initSyllabus() {
  const sidebar = document.getElementById("syllabus-sidebar");
  const contentBody = document.getElementById("syllabus-content-body");
  if (!sidebar || !contentBody) return;

  sidebar.innerHTML = window.SQL_TOPICS.map((topic, index) => `
    <button class="topic-btn ${index === 0 ? "active" : ""}" data-id="${topic.id}">
      <h4>${topic.title}</h4>
      <p>${topic.summary}</p>
    </button>
  `).join("");

  window.displayTopic = (topicId) => {
    const topic = window.SQL_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    let contentHTML = topic.content;

    if (topicId === "joins") {
      contentHTML += `
        <div class="join-diagram-container">
          <h4>Interactive JOIN Venn Diagram</h4>
          <div class="join-controls">
            <button class="join-control-btn active" data-join="inner">INNER JOIN</button>
            <button class="join-control-btn" data-join="left">LEFT JOIN</button>
            <button class="join-control-btn" data-join="right">RIGHT JOIN</button>
            <button class="join-control-btn" data-join="full">FULL OUTER JOIN</button>
          </div>
          <svg class="join-svg" viewBox="0 0 300 200">
            <path id="circle-a" class="join-circle" d="M 120 100 A 60 60 0 1 1 120 99 Z" style="fill: rgba(139, 92, 246, 0.45);"/>
            <path id="circle-b" class="join-circle" d="M 180 100 A 60 60 0 1 1 180 99 Z" style="fill: rgba(139, 92, 246, 0.45);"/>
            <path id="intersection" class="join-intersection" d="M 150 50 A 60 60 0 0 1 180 100 A 60 60 0 0 1 150 150 A 60 60 0 0 1 120 100 A 60 60 0 0 1 150 50 Z" style="fill: rgba(6, 182, 212, 0.7);"/>
            <text x="75" y="105" class="join-label" fill="#fff">Table A</text>
            <text x="225" y="105" class="join-label" fill="#fff">Table B</text>
          </svg>
        </div>
      `;
    }

    contentBody.innerHTML = contentHTML;

    if (topicId === "joins") {
      setupJoinDiagram();
    }
  };

  const topicBtns = sidebar.querySelectorAll(".topic-btn");
  topicBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      topicBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      window.displayTopic(btn.getAttribute("data-id"));
    });
  });

  window.displayTopic(window.SQL_TOPICS[0].id);
}

function setupJoinDiagram() {
  const btns = document.querySelectorAll(".join-control-btn");
  const circleA = document.getElementById("circle-a");
  const circleB = document.getElementById("circle-b");
  const intersection = document.getElementById("intersection");

  if (!circleA || !circleB || !intersection) return;

  const joinStates = {
    inner: { a: "rgba(139, 92, 246, 0.05)", b: "rgba(139, 92, 246, 0.05)", i: "rgba(6, 182, 212, 0.85)" },
    left: { a: "rgba(6, 182, 212, 0.85)", b: "rgba(139, 92, 246, 0.05)", i: "rgba(6, 182, 212, 0.85)" },
    right: { a: "rgba(139, 92, 246, 0.05)", b: "rgba(6, 182, 212, 0.85)", i: "rgba(6, 182, 212, 0.85)" },
    full: { a: "rgba(6, 182, 212, 0.85)", b: "rgba(6, 182, 212, 0.85)", i: "rgba(6, 182, 212, 0.85)" }
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

  applyColors("inner");
}

window.tryInSimulator = (query) => {
  window.navigateTo("simulator");
  const sqlInput = document.getElementById("sql-query");
  if (sqlInput) {
    sqlInput.value = query;
  }
};

/* ==========================================================================
   4. 70 MNC Interview Questions
   ========================================================================== */
function initMNCQuestions() {
  const container = document.getElementById("questions-container");
  const searchInput = document.getElementById("q-search");
  const filterDiff = document.getElementById("q-filter-difficulty");
  const filterCategory = document.getElementById("q-filter-category");
  const filterCompany = document.getElementById("q-filter-company");
  const pagination = document.getElementById("q-pagination");

  if (!container || !pagination) return;

  const categories = [...new Set(window.SQL_QUESTIONS.map((q) => q.category))].sort();
  const companies = [...new Set(window.SQL_QUESTIONS.flatMap((q) => q.companies))].sort();

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
  window.filteredQuestions = [...window.SQL_QUESTIONS];

  window.filterQuestions = () => {
    const query = searchInput.value.toLowerCase();
    const diff = filterDiff.value;
    const cat = filterCategory.value;
    const comp = filterCompany.value;

    window.filteredQuestions = window.SQL_QUESTIONS.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(query) || q.problem.toLowerCase().includes(query);
      const matchesDiff = diff === "all" || q.difficulty.toLowerCase() === diff.toLowerCase();
      const matchesCat = cat === "all" || q.category === cat;
      const matchesComp = comp === "all" || q.companies.includes(comp);

      return matchesSearch && matchesDiff && matchesCat && matchesComp;
    });

    currentPage = 1;
    renderQuestions();
  };

  function renderQuestions() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = window.filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedItems.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-purple);"></i>
          <h3>No matching SQL questions found</h3>
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
          </div>
          <i class="fa-solid fa-chevron-down accordion-arrow"></i>
        </div>
        <div class="question-body">
          <div class="question-details">
            <div class="q-problem-statement"><strong>Problem:</strong> ${q.problem}</div>
            ${q.schema ? `<pre class="q-schema"><code>${q.schema}</code></pre>` : ""}
            <div class="q-solution-header">
              <strong>Query:</strong>
              <button class="q-copy-btn" onclick="copySolution(${q.id})">Copy Query</button>
            </div>
            <pre><code class="language-sql" id="q-code-${q.id}">${q.solution}</code></pre>
            <p style="font-size: 0.95rem; color: var(--text-muted);">${q.explanation}</p>
          </div>
        </div>
      </div>
    `).join("");

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(window.filteredQuestions.length / itemsPerPage);
    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    let buttonsHTML = `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        buttonsHTML += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttonsHTML += `<span style="color: var(--text-muted);">...</span>`;
      }
    }

    buttonsHTML += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
    pagination.innerHTML = buttonsHTML;
  }

  searchInput.addEventListener("input", window.filterQuestions);
  filterDiff.addEventListener("change", window.filterQuestions);
  filterCategory.addEventListener("change", window.filterQuestions);
  filterCompany.addEventListener("change", window.filterQuestions);

  window.changePage = (page) => {
    currentPage = page;
    renderQuestions();
  };

  window.toggleAccordion = (id) => {
    const accordion = document.getElementById(`q-acc-${id}`);
    if (!accordion) return;
    const isActive = accordion.classList.contains("active");
    document.querySelectorAll(".question-accordion").forEach((acc) => acc.classList.remove("active"));
    if (!isActive) accordion.classList.add("active");
  };

  window.copySolution = (id) => {
    const code = document.getElementById(`q-code-${id}`).innerText;
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.querySelector(`#q-acc-${id} .q-copy-btn`);
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = "Copy Query"; }, 2000);
    });
  };

  renderQuestions();
  initBeginnerMistakes();
  initInterviewTips();
}

function initBeginnerMistakes() {
  const container = document.getElementById("mistakes-list");
  if (!container) return;
  container.innerHTML = window.BEGINNER_MISTAKES.map((m, i) => `
    <div class="glass-card mistake-card">
      <h3><i class="fa-solid fa-triangle-exclamation"></i> ${i + 1}. ${m.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 8px;">${m.desc}</p>
      <div class="code-comparison">
        <div class="code-comp-box bad">
          <div class="code-comp-label">❌ Bad Practice</div>
          <pre><code>${m.bad}</code></pre>
        </div>
        <div class="code-comp-box good">
          <div class="code-comp-label">✅ Good Practice</div>
          <pre><code>${m.good}</code></pre>
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
   5. SQL Query Simulator & Custom Parser Upgrades
   ========================================================================== */
function initSQLSimulator() {
  const sqlInput = document.getElementById("sql-query");
  const runBtn = document.getElementById("run-sql");
  const consoleResult = document.getElementById("console-result");
  const projectSelect = document.getElementById("project-select");
  const projectChallenges = document.getElementById("project-challenges");

  if (!sqlInput || !runBtn || !consoleResult || !projectSelect) return;

  runBtn.addEventListener("click", () => {
    const rawQuery = sqlInput.value.trim();
    if (!rawQuery) {
      consoleResult.innerHTML = `<span class="terminal-error">Query is empty.</span>`;
      return;
    }

    try {
      if (rawQuery.toUpperCase().startsWith("CREATE")) {
        executeCreateQuery(rawQuery);
        consoleResult.innerHTML = `<span class="terminal-success-message"><i class="fa-solid fa-circle-check"></i> Table created successfully.</span>`;
        refreshSchemaPanel();
      } else if (rawQuery.toUpperCase().startsWith("INSERT")) {
        executeInsertQuery(rawQuery);
        consoleResult.innerHTML = `<span class="terminal-success-message"><i class="fa-solid fa-circle-check"></i> Row inserted successfully.</span>`;
      } else {
        const resultData = executeMockQuery(rawQuery, MOCK_DB);
        renderTerminalTable(resultData);
      }
    } catch (err) {
      consoleResult.innerHTML = `<span class="terminal-error"><i class="fa-solid fa-circle-exclamation"></i> SQL Error: ${err.message}</span>`;
    }
  });


  // Project selector logic
  projectSelect.addEventListener("change", () => {
    const projName = projectSelect.value;
    if (projName === "none") {
      projectChallenges.innerHTML = "";
      refreshSchemaPanel();
      return;
    }

    const proj = window.MOCK_PROJECTS[projName];
    if (!proj) return;

    // Load tables into database session
    for (let tableKey in proj.tables) {
      MOCK_DB[tableKey] = proj.tables[tableKey];
      // Generate dynamically
      if (proj.tables[tableKey].length > 0) {
        DYNAMIC_SCHEMAS[tableKey] = {};
        Object.keys(proj.tables[tableKey][0]).forEach((k) => {
          DYNAMIC_SCHEMAS[tableKey][k] = typeof proj.tables[tableKey][0][k] === "number" ? "INT" : "VARCHAR";
        });
      }
    }
    refreshSchemaPanel();

    // Show challenge prompts
    projectChallenges.innerHTML = `
      <div class="glass-card" style="margin-top: 1.5rem; padding: 1.2rem;">
        <h3 style="color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 8px;"><i class="fa-solid fa-circle-check"></i> ${proj.title} Challenges</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">${proj.desc}</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${proj.challenges.map((c, idx) => `
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); padding: 8px 12px; border-radius: 6px;">
              <span style="font-size: 0.75rem; color: var(--accent-pink); font-weight: bold; display: block; margin-bottom: 4px;">CHALLENGE #${idx + 1}</span>
              <p style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 8px;">${c.q}</p>
              <button class="q-copy-btn" style="padding: 4px 10px; font-size: 0.75rem;" onclick="loadChallengeQuery('${c.sql.replace(/'/g, "\\'")}')">
                Load Query <i class="fa-solid fa-terminal"></i>
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  window.loadChallengeQuery = (sql) => {
    sqlInput.value = sql;
  };

  window.refreshSchemaPanel = () => {
    const panel = document.getElementById("simulator-schema-panel");
    if (!panel) return;

    const projName = projectSelect.value;
    let allowedTables = ["employees", "departments", ...userCreatedTables];
    
    if (projName && projName !== "none" && window.MOCK_PROJECTS[projName]) {
      allowedTables = [...Object.keys(window.MOCK_PROJECTS[projName].tables), ...userCreatedTables];
    }

    panel.innerHTML = Object.keys(DYNAMIC_SCHEMAS)
      .filter((table) => allowedTables.includes(table))
      .map((table) => `
        <div class="glass-card schema-card" style="margin-bottom: 10px;">
          <h4>${table} <i class="fa-solid fa-table"></i></h4>
          <ul class="schema-fields">
            ${Object.keys(DYNAMIC_SCHEMAS[table]).map((field) => `
              <li><span>${field}</span> <span>${DYNAMIC_SCHEMAS[table][field]}</span></li>
            `).join("")}
          </ul>
        </div>
      `).join("");
  };

  function renderTerminalTable(rows) {
    if (!rows || rows.length === 0) {
      consoleResult.innerHTML = `<span style="color: var(--text-muted);">Empty result (0 rows returned).</span>`;
      return;
    }
    const columns = Object.keys(rows[0]);
    const headerHTML = columns.map((col) => `<th>${col}</th>`).join("");
    const rowsHTML = rows.map((row) => `
      <tr>
        ${columns.map((col) => `<td>${row[col] !== null ? row[col] : "NULL"}</td>`).join("")}
      </tr>
    `).join("");

    consoleResult.innerHTML = `
      <table class="terminal-table">
        <thead><tr>${headerHTML}</tr></thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    `;
  }

  refreshSchemaPanel();
}

function executeCreateQuery(sql) {
  // CREATE TABLE test_table (id INT, name VARCHAR);
  const match = sql.match(/CREATE\s+TABLE\s+(\w+)\s*\((.*?)\)/i);
  if (!match) throw new Error("Invalid CREATE TABLE syntax.");

  const tableName = match[1].toLowerCase();
  const fieldsDef = match[2];

  if (MOCK_DB[tableName]) {
    throw new Error(`Table '${tableName}' already exists.`);
  }

  MOCK_DB[tableName] = [];
  DYNAMIC_SCHEMAS[tableName] = {};
  userCreatedTables.push(tableName);

  fieldsDef.split(",").forEach((def) => {
    const parts = def.trim().split(/\s+/);
    if (parts.length >= 2) {
      DYNAMIC_SCHEMAS[tableName][parts[0]] = parts[1].toUpperCase();
    }
  });
}

function executeInsertQuery(sql) {
  // INSERT INTO table_name VALUES (1, 'Alice');
  // OR INSERT INTO table_name (c1, c2) VALUES (1, 'Alice');
  const match = sql.match(/INSERT\s+INTO\s+(\w+)(?:\s*\((.*?)\))?\s*VALUES\s*\((.*?)\)/i);
  if (!match) throw new Error("Invalid INSERT INTO syntax.");

  const tableName = match[1].toLowerCase();
  const columnsClause = match[2];
  const valuesClause = match[3];

  if (!MOCK_DB[tableName]) {
    throw new Error(`Table '${tableName}' does not exist.`);
  }

  const values = valuesClause.split(",").map(v => {
    let clean = v.trim();
    if (clean.startsWith("'") || clean.startsWith('"')) {
      return clean.slice(1, -1);
    }
    return isNaN(clean) ? clean : parseFloat(clean);
  });

  const row = {};
  const schemaKeys = Object.keys(DYNAMIC_SCHEMAS[tableName]);

  if (columnsClause) {
    const cols = columnsClause.split(",").map(c => c.trim());
    schemaKeys.forEach((key) => {
      const valIdx = cols.indexOf(key);
      row[key] = valIdx !== -1 ? values[valIdx] : null;
    });
  } else {
    if (values.length !== schemaKeys.length) {
      throw new Error("Value count does not match table column count.");
    }
    schemaKeys.forEach((key, idx) => {
      row[key] = values[idx];
    });
  }

  MOCK_DB[tableName].push(row);
}

function executeMockQuery(queryStr, db) {
  let sql = queryStr.replace(/\s+/g, " ").trim();
  if (sql.endsWith(";")) sql = sql.slice(0, -1).trim();

  if (!sql.toUpperCase().startsWith("SELECT")) {
    throw new Error("Only SELECT queries are supported in this simulator.");
  }

  const selectRegex = /^SELECT\s+(.*?)\s+FROM\s+(.*?)(?:\s+JOIN\s+(.*?)\s+ON\s+(.*?))?(?:\s+WHERE\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i;
  const match = sql.match(selectRegex);

  if (!match) {
    throw new Error("Could not parse query. Check syntax constraints.");
  }

  const selectClause = match[1].trim();
  const primaryTableClause = match[2].trim();
  const joinTableClause = match[3] ? match[3].trim() : null;
  const joinConditionClause = match[4] ? match[4].trim() : null;
  const whereClause = match[5] ? match[5].trim() : null;
  const orderByClause = match[6] ? match[6].trim() : null;
  const limitClause = match[7] ? match[7].trim() : null;

  const parseTableAndAlias = (clause) => {
    const parts = clause.split(/\s+/);
    const tableName = parts[0].toLowerCase();
    const alias = parts[1] || parts[0];
    return { tableName, alias };
  };

  const primaryTable = parseTableAndAlias(primaryTableClause);
  if (!db[primaryTable.tableName]) {
    throw new Error(`Table '${primaryTable.tableName}' not found.`);
  }

  let joinTable = null;
  if (joinTableClause) {
    joinTable = parseTableAndAlias(joinTableClause);
    if (!db[joinTable.tableName]) {
      throw new Error(`Joined Table '${joinTable.tableName}' not found.`);
    }
  }

  let workingData = db[primaryTable.tableName].map(row => {
    const newRow = {};
    for (let key in row) newRow[`${primaryTable.alias}.${key}`] = row[key];
    return newRow;
  });

  if (joinTable) {
    const condParts = joinConditionClause.split("=");
    if (condParts.length !== 2) throw new Error("Invalid JOIN condition.");
    const condLeft = condParts[0].trim();
    const condRight = condParts[1].trim();
    const joinedData = [];

    workingData.forEach((rowA) => {
      let matched = false;
      db[joinTable.tableName].forEach((rowB) => {
        const rowBObj = {};
        for (let key in rowB) rowBObj[`${joinTable.alias}.${key}`] = rowB[key];

        const valLeft = rowA[condLeft] !== undefined ? rowA[condLeft] : rowBObj[condLeft];
        const valRight = rowA[condRight] !== undefined ? rowA[condRight] : rowBObj[condRight];

        if (valLeft !== undefined && valRight !== undefined && String(valLeft) === String(valRight)) {
          joinedData.push({ ...rowA, ...rowBObj });
          matched = true;
        }
      });

      if (!matched) {
        const nullRowB = {};
        for (let key in db[joinTable.tableName][0]) nullRowB[`${joinTable.alias}.${key}`] = null;
        joinedData.push({ ...rowA, ...nullRowB });
      }
    });

    workingData = joinedData;
  }

  if (whereClause) {
    const opMatch = whereClause.match(/(.*?)(=|!=|>|<|\bLIKE\b)(.*)/i);
    if (!opMatch) throw new Error("WHERE clause syntax error.");
    const field = opMatch[1].trim();
    const operator = opMatch[2].trim().toUpperCase();
    let valStr = opMatch[3].trim().replace(/^['"]|['"]$/g, "");

    workingData = workingData.filter((row) => {
      let rowVal = row[field];
      if (rowVal === undefined) {
        const fallbackKey = Object.keys(row).find((k) => k.endsWith(`.${field}`));
        rowVal = row[fallbackKey];
      }

      if (rowVal === undefined || rowVal === null) return false;

      const isNum = !isNaN(rowVal) && !isNaN(parseFloat(rowVal));
      const parsedRowVal = isNum ? parseFloat(rowVal) : rowVal;
      const parsedValStr = isNum ? parseFloat(valStr) : valStr;

      if (operator === "=") return String(parsedRowVal).toLowerCase() === String(parsedValStr).toLowerCase();
      if (operator === "!=") return String(parsedRowVal).toLowerCase() !== String(parsedValStr).toLowerCase();
      if (operator === ">") return parsedRowVal > parsedValStr;
      if (operator === "<") return parsedRowVal < parsedValStr;
      if (operator === "LIKE") {
        const regex = new RegExp(`^${parsedValStr.replace(/%/g, ".*").replace(/_/g, ".")}$`, "i");
        return regex.test(String(parsedRowVal));
      }
      return false;
    });
  }

  let projectedData = [];
  const rawSelectItems = selectClause.split(",").map(item => item.trim());

  workingData.forEach((row) => {
    const projRow = {};
    rawSelectItems.forEach((item) => {
      if (item === "*") {
        for (let key in row) projRow[key.split(".")[1]] = row[key];
      } else {
        const aliasMatch = item.match(/(.*?)\s+AS\s+(.*)/i);
        let fieldName = aliasMatch ? aliasMatch[1].trim() : item;
        let finalColName = aliasMatch ? aliasMatch[2].trim() : item.split(".").pop();
        
        let val = row[fieldName];
        if (val === undefined) {
          const fallbackKey = Object.keys(row).find((k) => k.endsWith(`.${fieldName}`));
          val = row[fallbackKey];
        }
        projRow[finalColName] = val !== undefined ? val : null;
      }
    });
    projectedData.push(projRow);
  });

  if (orderByClause) {
    const orderParts = orderByClause.split(/\s+/);
    const sortField = orderParts[0].trim();
    const sortDirection = orderParts[1] ? orderParts[1].toUpperCase() : "ASC";

    projectedData.sort((a, b) => {
      let valA = a[sortField] !== undefined ? a[sortField] : a[sortField.split(".").pop()];
      let valB = b[sortField] !== undefined ? b[sortField] : b[sortField.split(".").pop()];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "DESC" ? valB - valA : valA - valB;
      }
      return sortDirection === "DESC" ? String(valB).localeCompare(String(valA)) : String(valA).localeCompare(String(valB));
    });
  }

  if (limitClause) {
    projectedData = projectedData.slice(0, parseInt(limitClause, 10));
  }

  return projectedData;
}

/* ==========================================================================
   6. Interactive Quiz Engine
   ========================================================================== */
function initQuiz() {
  const quizArea = document.getElementById("quiz-area");
  if (!quizArea) return;

  window.quizQuestions = [
    { q: "Which SQL clause filters query results based on aggregate functions?", options: ["WHERE", "HAVING", "GROUP BY", "FILTER"], answer: 1, exp: "Aggregate metrics are checked in HAVING. WHERE filters rows before aggregation." },
    { q: "What is the difference between UNION and UNION ALL?", options: ["UNION keeps duplicates.", "UNION ALL filters duplicates.", "UNION removes duplicates, UNION ALL keeps duplicates (faster).", "None."], answer: 2, exp: "UNION ALL skips sorting/deduplication, making it faster." },
    { q: "If an indexed column is wrapped in a function, how does it affect execution?", options: ["It speeds up execution.", "It makes it non-sargable, preventing index usage.", "Syntax compiler crash.", "None."], answer: 1, exp: "Wrapping indexes in functions (like LOWER()) prevents index usage (non-sargable)." }
  ];

  let currentIdx = 0;
  let score = 0;
  let hasAnswered = false;

  window.loadQuizQuestion = () => {
    hasAnswered = false;
    const qData = window.quizQuestions[currentIdx];
    const progressPercent = (currentIdx / window.quizQuestions.length) * 100;

    quizArea.innerHTML = `
      <div class="quiz-progress-bar"><div class="quiz-progress" style="width: ${progressPercent}%;"></div></div>
      <div class="quiz-meta"><span>Question ${currentIdx + 1} of ${window.quizQuestions.length}</span><span>Score: ${score}</span></div>
      <div class="quiz-question-box">
        <h3>${qData.q}</h3>
        <div class="quiz-options">
          ${qData.options.map((opt, idx) => `<button class="quiz-option" onclick="submitQuizAnswer(${idx})">${opt}</button>`).join("")}
        </div>
        <div id="quiz-feedback-box"></div>
      </div>
    `;
  };

  window.submitQuizAnswer = (selectedIdx) => {
    if (hasAnswered) return;
    hasAnswered = true;

    const qData = window.quizQuestions[currentIdx];
    const options = document.querySelectorAll(".quiz-option");
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const isCorrect = selectedIdx === qData.answer;

    options.forEach((opt, idx) => {
      if (idx === qData.answer) opt.classList.add("correct");
      else if (idx === selectedIdx && !isCorrect) opt.classList.add("incorrect");
    });

    if (isCorrect) score++;

    feedbackBox.innerHTML = `
      <div class="quiz-explanation">
        <h4>${isCorrect ? "🎉 Correct!" : "❌ Incorrect"}</h4>
        <p>${qData.exp}</p>
        <button class="btn btn-primary" onclick="nextQuizStep()" style="margin-top: 10px; width:100%; justify-content:center;">
          ${currentIdx + 1 === window.quizQuestions.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    `;
  };

  window.nextQuizStep = () => {
    currentIdx++;
    if (currentIdx < window.quizQuestions.length) window.loadQuizQuestion();
    else showQuizResults();
  };

  function showQuizResults() {
    quizArea.innerHTML = `
      <div class="glass-card quiz-results-card">
        <h2>Quiz Complete</h2>
        <div class="score-circle"><span class="score-num">${score}/${window.quizQuestions.length}</span></div>
        <button class="btn btn-primary" onclick="restartQuiz()"><i class="fa-solid fa-rotate-left"></i> Retake Quiz</button>
      </div>
    `;
  }

  window.restartQuiz = () => {
    currentIdx = 0;
    score = 0;
    window.loadQuizQuestion();
  };

  window.loadQuizQuestion();
}

/* ==========================================================================
   7. Roadmap Timeline & Progress Tracking
   ========================================================================== */
function initRoadmap() {
  const container = document.getElementById("roadmap-container");
  if (!container) return;

  // Load progress state from localStorage or initialize
  window.roadmapProgress = JSON.parse(localStorage.getItem("sql_roadmap_progress")) || {};

  window.renderRoadmap = () => {
    container.innerHTML = window.ROADMAP_STAGES.map((stage, idx) => {
      const stageTopics = stage.topics;
      const completedCount = stageTopics.filter(t => window.roadmapProgress[t.id]).length;
      const pct = Math.round((completedCount / stageTopics.length) * 100) || 0;

      return `
        <div class="glass-card roadmap-stage-card ${pct === 100 ? "completed" : ""}" style="margin-bottom: 2rem; position: relative;">
          <div class="stage-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <div>
              <h3 style="color: var(--accent-cyan); font-size: 1.3rem;">${stage.title}</h3>
              <span class="tag tag-company" style="margin-top:4px; display:inline-block;">${stage.duration}</span>
            </div>
            <div style="text-align:right;">
              <span style="font-weight:700; color: var(--accent-pink);">${pct}% Done</span>
            </div>
          </div>
          <div class="quiz-progress-bar" style="margin-bottom: 1.5rem;"><div class="quiz-progress" style="width: ${pct}%;"></div></div>
          
          <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
            ${stageTopics.map(t => `
              <li style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px dashed rgba(255,255,255,0.05); padding-bottom:8px;">
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                  <input type="checkbox" style="width:18px; height:18px; accent-color: var(--accent-purple);" 
                    ${window.roadmapProgress[t.id] ? "checked" : ""} 
                    onchange="toggleRoadmapTopic('${t.id}')">
                  <span>${t.name}</span>
                </label>
                <div style="display:flex; gap:8px;">
                  <button class="q-copy-btn" style="padding: 2px 8px; font-size:0.75rem;" onclick="navigateToSyllabusTopic('${t.module}')">Syllabus</button>
                  <button class="q-copy-btn" style="padding: 2px 8px; font-size:0.75rem;" onclick="filterQuestionsByTopic('${t.questions.join(",")}')">MNC Qs</button>
                </div>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }).join("");

    updateOverallProgress();
  };

  window.toggleRoadmapTopic = (topicId) => {
    window.roadmapProgress[topicId] = !window.roadmapProgress[topicId];
    localStorage.setItem("sql_roadmap_progress", JSON.stringify(window.roadmapProgress));
    window.renderRoadmap();
  };

  window.navigateToSyllabusTopic = (moduleId) => {
    window.navigateTo("syllabus");
    window.displayTopic(moduleId);
    const sidebar = document.getElementById("syllabus-sidebar");
    if (sidebar) {
      sidebar.querySelectorAll(".topic-btn").forEach((btn) => {
        if (btn.getAttribute("data-id") === moduleId) btn.classList.add("active");
        else btn.classList.remove("active");
      });
    }
  };

  window.filterQuestionsByTopic = (qIdsStr) => {
    window.navigateTo("questions");
    const qIds = qIdsStr.split(",").map(Number);
    window.filteredQuestions = window.SQL_QUESTIONS.filter(q => qIds.includes(q.id));
    // Trigger render questions in questions module
    window.changePage(1);
  };

  function updateOverallProgress() {
    const totalTopics = window.ROADMAP_STAGES.flatMap(s => s.topics).length;
    const completedCount = Object.values(window.roadmapProgress).filter(Boolean).length;
    const pct = Math.round((completedCount / totalTopics) * 100) || 0;

    const overallBar = document.getElementById("overall-roadmap-progress");
    const overallText = document.getElementById("overall-roadmap-text");
    if (overallBar && overallText) {
      overallBar.style.width = `${pct}%`;
      overallText.innerText = `${pct}% Overall Learning Path Completed (${completedCount}/${totalTopics} topics)`;
    }
  }

  window.renderRoadmap();
}

/* ==========================================================================
   8. Resource Hub
   ========================================================================== */
function initResourceHub() {
  const container = document.getElementById("resources-grid");
  if (!container) return;

  window.renderResources = (category = "all") => {
    const list = category === "all" ? window.RESOURCES : window.RESOURCES.filter(r => r.category === category);

    container.innerHTML = list.map(r => `
      <div class="glass-card resource-card" style="display:flex; flex-direction:column; gap:10px; justify-content:space-between; height: 100%;">
        <div>
          <span class="tag tag-company" style="text-transform:uppercase; font-size:0.7rem; color: var(--accent-cyan);">${r.category}</span>
          <h3 style="font-size:1.1rem; margin-top:5px;">${r.title}</h3>
          <p style="font-size:0.85rem; color: var(--text-muted); margin-top:5px;">${r.desc}</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; border-top:1px dashed rgba(255,255,255,0.05); padding-top:10px;">
          <span style="font-size:0.75rem; color: var(--accent-pink);">${r.level}</span>
          <a href="${r.url}" target="_blank" class="btn" style="padding:4px 10px; font-size:0.8rem; border-color: var(--accent-purple);">Open <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>
    `).join("");
  };

  const chips = document.querySelectorAll(".resource-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      window.renderResources(chip.getAttribute("data-category"));
    });
  });

  window.renderResources("all");
}

/* ==========================================================================
   9. Goal-Based Recommendation Engine
   ========================================================================== */
function initRecommendationEngine() {
  const submitBtn = document.getElementById("submit-recommendation");
  const resultsCard = document.getElementById("recommendation-results");

  if (!submitBtn || !resultsCard) return;

  // Single-select button selection logic
  document.querySelectorAll(".questionnaire-group").forEach(group => {
    const btns = group.querySelectorAll(".btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("btn-primary"));
        btn.classList.add("btn-primary");
      });
    });
  });

  submitBtn.addEventListener("click", () => {
    const selectedGoalBtn = document.querySelector("#group-goal .btn-primary");
    const selectedLevelBtn = document.querySelector("#group-level .btn-primary");
    const selectedTimeBtn = document.querySelector("#group-time .btn-primary");

    if (!selectedGoalBtn || !selectedLevelBtn || !selectedTimeBtn) {
      alert("Please select an option for all three questions.");
      return;
    }

    const goal = selectedGoalBtn.getAttribute("data-val");
    const level = selectedLevelBtn.getAttribute("data-val");
    const time = selectedTimeBtn.getAttribute("data-val");

    // Fetch rule output
    const rule = window.RECOMMENDATION_RULES[goal] || window.RECOMMENDATION_RULES["beginner"];

    const stageTitles = rule.order.map(stageId => {
      const stage = window.ROADMAP_STAGES.find(s => s.id === stageId);
      return stage ? stage.title : "";
    });

    const recommendedResourcesList = window.RESOURCES.filter(r => rule.resources.includes(r.id));

    resultsCard.innerHTML = `
      <div class="glass-card" style="margin-top:2rem; animation: fadeIn 0.5s ease-out;">
        <h3 style="color: var(--accent-cyan); font-size:1.3rem; margin-bottom:1rem;"><i class="fa-solid fa-map-location-dot"></i> Your Custom SQL Learning Path</h3>
        <p style="font-size:0.95rem; color: var(--text-muted); margin-bottom:1.5rem;">Based on your goal, we have calculated a sequential roadmap focusing on the key SQL skills you need:</p>
        
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; color: var(--accent-pink); margin-bottom:0.5rem;">1. Recommended Stages Order</h4>
          <ol style="padding-left:1.5rem;">
            ${stageTitles.map(title => `<li style="margin-bottom:4px;">${title}</li>`).join("")}
          </ol>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; color: var(--accent-pink); margin-bottom:0.5rem;">2. Recommended Resources</h4>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${recommendedResourcesList.map(r => `
              <div style="font-size:0.85rem; border-left: 3px solid var(--accent-purple); padding-left:10px;">
                <strong>${r.title}</strong> (${r.level}) - <a href="${r.url}" target="_blank">Open Link</a>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; color: var(--accent-pink); margin-bottom:0.5rem;">3. Weekly Milestone Plan</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:6px;">
            ${rule.milestones.map(m => `<li style="font-size:0.9rem; padding-left:15px; position:relative;"><i class="fa-solid fa-calendar-week" style="position:absolute; left:0; top:4px; font-size:0.75rem; color: var(--accent-cyan);"></i> ${m}</li>`).join("")}
          </ul>
        </div>

        <button class="btn btn-primary" onclick="startCustomPath('${rule.order.join(",")}')" style="width:100%; justify-content:center;">
          Start This Path Now <i class="fa-solid fa-circle-play"></i>
        </button>
      </div>
    `;
  });

  window.startCustomPath = (stagesOrderStr) => {
    // Navigate to Roadmap page
    window.navigateTo("roadmap");
    // Show user a message about their tailored roadmap
    const overallText = document.getElementById("overall-roadmap-text");
    if (overallText) {
      overallText.innerText += " (Tailored to your goal)";
    }
  };
}

/* ==========================================================================
   10. Administrative Forms setup (dynamic session data update)
   ========================================================================== */
function setupAdminForms() {
  // 1. Add Question Form
  const addQBtn = document.getElementById("admin-add-question-btn");
  if (addQBtn) {
    addQBtn.addEventListener("click", () => {
      const title = document.getElementById("admin-q-title").value;
      const difficulty = document.getElementById("admin-q-diff").value;
      const category = document.getElementById("admin-q-cat").value;
      const companiesStr = document.getElementById("admin-q-companies").value;
      const problem = document.getElementById("admin-q-problem").value;
      const solution = document.getElementById("admin-q-solution").value;
      const explanation = document.getElementById("admin-q-explanation").value;

      if (!title || !problem || !solution) {
        alert("Please fill in Title, Problem Statement, and SQL Solution.");
        return;
      }

      const newQ = {
        id: window.SQL_QUESTIONS.length + 1,
        title: title,
        difficulty: difficulty,
        category: category,
        companies: companiesStr.split(",").map(c => c.trim()).filter(Boolean),
        problem: problem,
        schema: "",
        solution: solution,
        explanation: explanation || "Custom submitted interview challenge."
      };

      window.SQL_QUESTIONS.push(newQ);
      alert(`Question #${newQ.id} added successfully!`);
      // Trigger render updates
      initMNCQuestions();
      // Clear inputs
      document.querySelectorAll(".admin-input-q").forEach(el => el.value = "");
    });
  }

  // 2. Add Quiz Form
  const addQuizBtn = document.getElementById("admin-add-quiz-btn");
  if (addQuizBtn) {
    addQuizBtn.addEventListener("click", () => {
      const q = document.getElementById("admin-quiz-q").value;
      const opt0 = document.getElementById("admin-quiz-opt0").value;
      const opt1 = document.getElementById("admin-quiz-opt1").value;
      const opt2 = document.getElementById("admin-quiz-opt2").value;
      const opt3 = document.getElementById("admin-quiz-opt3").value;
      const answer = parseInt(document.getElementById("admin-quiz-ans").value, 10);
      const exp = document.getElementById("admin-quiz-exp").value;

      if (!q || !opt0 || !opt1) {
        alert("Please write the question and at least two options.");
        return;
      }

      const newQuiz = {
        q: q,
        options: [opt0, opt1, opt2, opt3].filter(Boolean),
        answer: answer,
        exp: exp || "Conceptual quiz challenge."
      };

      window.quizQuestions.push(newQuiz);
      alert("Quiz question added successfully!");
      initQuiz(); // reload quiz questions
      // Clear inputs
      document.querySelectorAll(".admin-input-quiz").forEach(el => el.value = "");
    });
  }

  // 3. Add Resource Form
  const addResBtn = document.getElementById("admin-add-res-btn");
  if (addResBtn) {
    addResBtn.addEventListener("click", () => {
      const title = document.getElementById("admin-res-title").value;
      const category = document.getElementById("admin-res-cat").value;
      const desc = document.getElementById("admin-res-desc").value;
      const level = document.getElementById("admin-res-level").value;
      const url = document.getElementById("admin-res-url").value;

      if (!title || !url) {
        alert("Please specify the Title and Outbound URL link.");
        return;
      }

      const newRes = {
        id: window.RESOURCES.length + 1,
        category: category,
        title: title,
        desc: desc || "Reference link.",
        level: level,
        url: url
      };

      window.RESOURCES.push(newRes);
      alert("Resource reference added successfully!");
      initResourceHub();
      document.querySelectorAll(".admin-input-res").forEach(el => el.value = "");
    });
  }
}
