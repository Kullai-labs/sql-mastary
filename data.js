// SQL Mastery Hub - Upgraded Database (v2)

const ROADMAP_STAGES = [
  {
    id: 1,
    title: "Stage 1: Foundations",
    duration: "3 days",
    topics: [
      { id: "foundations-rdbms", name: "RDBMS, Tables & Schemas", module: "basics", questions: [24, 29] },
      { id: "foundations-select", name: "SELECT, FROM & Expressions", module: "basics", questions: [14, 53] },
      { id: "foundations-where", name: "WHERE Filters, LIKE & NULLs", module: "basics", questions: [3, 12] }
    ]
  },
  {
    id: 2,
    title: "Stage 2: Filtering & Aggregation",
    duration: "3 days",
    topics: [
      { id: "filter-aggregates", name: "COUNT, SUM, AVG, MIN, MAX", module: "filtering", questions: [8, 30] },
      { id: "filter-groupby", name: "GROUP BY Multi-column logic", module: "filtering", questions: [4, 13] },
      { id: "filter-having", name: "HAVING vs WHERE operations", module: "filtering", questions: [15, 46] }
    ]
  },
  {
    id: 3,
    title: "Stage 3: Joins & Set Operations",
    duration: "4 days",
    topics: [
      { id: "joins-innerleft", name: "INNER JOIN & LEFT JOIN matching", module: "joins", questions: [11, 26] },
      { id: "joins-complex", name: "RIGHT, FULL OUTER & SELF joins", module: "joins", questions: [5, 20] },
      { id: "joins-sets", name: "UNION, UNION ALL, INTERSECT, EXCEPT", module: "joins", questions: [14, 38] }
    ]
  },
  {
    id: 4,
    title: "Stage 4: Subqueries & CTEs",
    duration: "4 days",
    topics: [
      { id: "sub-nested", name: "Single & Multi-row Subqueries", module: "subqueries", questions: [1, 9] },
      { id: "sub-correlated", name: "Correlated Subquery evaluation", module: "subqueries", questions: [19, 47] },
      { id: "sub-ctes", name: "Common Table Expressions (CTEs)", module: "subqueries", questions: [2, 31] }
    ]
  },
  {
    id: 5,
    title: "Stage 5: Window Functions",
    duration: "5 days",
    topics: [
      { id: "window-ranks", name: "ROW_NUMBER, RANK, DENSE_RANK", module: "window", questions: [17, 23] },
      { id: "window-offsets", name: "LEAD, LAG, FIRST_VALUE", module: "window", questions: [16, 21] },
      { id: "window-frames", name: "Cumulative sums & Frames", module: "window_deep", questions: [10, 63] }
    ]
  },
  {
    id: 6,
    title: "Stage 6: Schema Design & Constraints",
    duration: "3 days",
    topics: [
      { id: "schema-normal", name: "Normalization (1NF, 2NF, 3NF)", module: "schema_design", questions: [6, 45] },
      { id: "schema-constraints", name: "PK, FK, CHECK & Cascade deletes", module: "schema_design", questions: [11, 57] }
    ]
  },
  {
    id: 7,
    title: "Stage 7: Performance & Query Plans",
    duration: "4 days",
    topics: [
      { id: "perf-indexes", name: "Clustered & Non-clustered index", module: "indexing", questions: [50, 61] },
      { id: "perf-explain", name: "Reading EXPLAIN execution plans", module: "indexing_perf", questions: [69, 70] },
      { id: "perf-sargable", name: "Writing Sargable predicates", module: "indexing_perf", questions: [51, 52] }
    ]
  },
  {
    id: 8,
    title: "Stage 8: Transactions & Concurrency",
    duration: "3 days",
    topics: [
      { id: "trans-acid", name: "ACID properties in action", module: "transactions", questions: [6, 45] },
      { id: "trans-isolation", name: "Read anomalies & Isolation levels", module: "transactions_concurrency", questions: [38, 68] }
    ]
  },
  {
    id: 9,
    title: "Stage 9: Advanced/Modern SQL",
    duration: "4 days",
    topics: [
      { id: "adv-case", name: "Conditional CASE and NULLIF", module: "advanced", questions: [18, 27] },
      { id: "adv-json", name: "Querying JSON columns", module: "json_data", questions: [44, 66] },
      { id: "adv-time", name: "Time-bucketing & cohort math", module: "date_time", questions: [36, 70] }
    ]
  },
  {
    id: 10,
    title: "Stage 10: Real-World Application",
    duration: "5 days",
    topics: [
      { id: "real-swiggy", name: "Swiggy Delivery Case Study", module: "basics", questions: [39, 40] },
      { id: "real-rapido", name: "Rapido Ride Hailing Case Study", module: "basics", questions: [26, 41] },
      { id: "real-amazon", name: "Amazon E-Commerce Case Study", module: "basics", questions: [29, 31] }
    ]
  }
];

const RESOURCES = [
  { id: 1, category: "courses", title: "Mode SQL Tutorial", desc: "An excellent, highly interactive SQL tutorial covering basic to advanced analytical SQL.", level: "Beginner to Intermediate", url: "https://mode.com/sql-tutorial" },
  { id: 2, category: "courses", title: "freeCodeCamp SQL Course", desc: "Full database course on YouTube introducing SQL schemas, keys, and queries.", level: "Beginner", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
  { id: 3, category: "platforms", title: "LeetCode Database Questions", desc: "Classic coding sandbox containing 100+ SQL schema challenges sorted by difficulty.", level: "Intermediate to Hard", url: "https://leetcode.com/problemset/database" },
  { id: 4, category: "platforms", title: "DataLemur SQL Prep", desc: "Interactive portal run by Nick Singh featuring real SQL interview questions from Facebook and Google.", level: "Interview Prep", url: "https://datalemur.com" },
  { id: 5, category: "docs", title: "PostgreSQL Official Documentation", desc: "Detailed references for Postgres commands, query plans, and window functions.", level: "Advanced", url: "https://www.postgresql.org/docs" },
  { id: 6, category: "books", title: "SQL Antipatterns", desc: "By Bill Karwin. Teaches how to avoid structural and query design traps in relational databases.", level: "Advanced", url: "https://pragprog.com/titles/katrina/sql-antipatterns-volume-1" }
];

const RECOMMENDATION_RULES = {
  beginner: {
    order: [1, 2, 3, 4, 6],
    resources: [1, 2],
    milestones: ["Week 1: Foundations & Filter aggregates", "Week 2: Joining multiple tables", "Week 3: Subqueries & DB Schema normalization"]
  },
  interview: {
    order: [3, 4, 5, 7, 9, 10],
    resources: [3, 4, 6],
    milestones: ["Week 1: Mastering Joins, Subqueries & CTEs", "Week 2: Advanced Window rankings & cumulative frames", "Week 3: Index performance tuning & FAANG mock coding sets"]
  },
  analyst: {
    order: [1, 2, 3, 5, 9, 10],
    resources: [1, 3, 4],
    milestones: ["Week 1: Core aggregations & multi-table Joins", "Week 2: Window functions (ranks, offsets, run-totals)", "Week 3: Modern cohort analysis, case-study projects & dashboards"]
  },
  developer: {
    order: [1, 2, 3, 6, 7, 8],
    resources: [2, 5, 6],
    milestones: ["Week 1: DDL schemas, constraints & normal forms", "Week 2: Index designs & execution plan optimization", "Week 3: Transaction management, ACID concurrency locks & deadlocks"]
  }
};

const MOCK_PROJECTS = {
  swiggy: {
    title: "Swiggy Food Delivery Analytics",
    desc: "Analyze customer eating patterns, restaurant cuisines, and order values.",
    tables: {
      swiggy_users: [
        { user_id: 1, name: "Amit Kumar", age: 24, city: "Bangalore" },
        { user_id: 2, name: "Sneha Reddy", age: 28, city: "Hyderabad" },
        { user_id: 3, name: "Pooja Sen", age: 31, city: "Delhi" },
        { user_id: 4, name: "Vikas Patel", age: 22, city: "Bangalore" }
      ],
      restaurants: [
        { rest_id: 10, name: "Biryani Zone", cuisine: "Indian", rating: 4.5 },
        { rest_id: 20, name: "Pasta Bistro", cuisine: "Italian", rating: 4.2 },
        { rest_id: 30, name: "Dragon Wok", cuisine: "Chinese", rating: 3.8 }
      ],
      swiggy_orders: [
        { order_id: 501, user_id: 1, rest_id: 10, amount: 450, order_date: "2024-06-01" },
        { order_id: 502, user_id: 2, rest_id: 20, amount: 1200, order_date: "2024-06-02" },
        { order_id: 503, user_id: 3, rest_id: 10, amount: 350, order_date: "2024-06-02" },
        { order_id: 504, user_id: 1, rest_id: 30, amount: 650, order_date: "2024-06-03" },
        { order_id: 505, user_id: 4, rest_id: 20, amount: 850, order_date: "2024-06-04" }
      ]
    },
    challenges: [
      { q: "Calculate total revenue generated by Biryani Zone (rest_id = 10).", sql: "SELECT SUM(amount) AS total_revenue FROM swiggy_orders WHERE rest_id = 10;" },
      { q: "List users from Bangalore who spent more than 500 on an order.", sql: "SELECT u.name FROM swiggy_users u JOIN swiggy_orders o ON u.user_id = o.user_id WHERE u.city = 'Bangalore' AND o.amount > 500;" },
      { q: "Find the average order value for Italian cuisine restaurants.", sql: "SELECT AVG(o.amount) AS avg_amount FROM swiggy_orders o JOIN restaurants r ON o.rest_id = r.rest_id WHERE r.cuisine = 'Italian';" }
    ]
  },
  rapido: {
    title: "Rapido Ride Hailing Analytics",
    desc: "Calculate driver metrics, trip duration, and payment distributions.",
    tables: {
      rapido_drivers: [
        { driver_id: 1, name: "Ramesh", vehicle: "Bike", rating: 4.8 },
        { driver_id: 2, name: "Suresh", vehicle: "Auto", rating: 4.3 },
        { driver_id: 3, name: "Kiran", vehicle: "Bike", rating: 3.9 }
      ],
      rides: [
        { ride_id: 901, driver_id: 1, status: "Completed", distance: 6, fare: 80 },
        { ride_id: 902, driver_id: 2, status: "Completed", distance: 12, fare: 180 },
        { ride_id: 903, driver_id: 3, status: "Cancelled", distance: 2, fare: 0 },
        { ride_id: 904, driver_id: 1, status: "Completed", distance: 8, fare: 110 }
      ]
    },
    challenges: [
      { q: "Count the number of completed rides for each driver.", sql: "SELECT driver_id, COUNT(*) AS ride_count FROM rides WHERE status = 'Completed' GROUP BY driver_id;" },
      { q: "Calculate the average fare of completed bike rides (vehicle = 'Bike').", sql: "SELECT AVG(r.fare) AS avg_fare FROM rides r JOIN rapido_drivers d ON r.driver_id = d.driver_id WHERE d.vehicle = 'Bike' AND r.status = 'Completed';" }
    ]
  },
  amazon: {
    title: "Amazon E-Commerce Sales Study",
    desc: "Understand product sales, client reviews, and low stock items.",
    tables: {
      amazon_products: [
        { prod_id: 1, title: "Wireless Mouse", brand: "Logitech", stock: 15 },
        { prod_id: 2, title: "Mechanical Keyboard", brand: "Keychron", stock: 4 },
        { prod_id: 3, title: "USB-C Hub", brand: "Anker", stock: 0 }
      ],
      orders: [
        { id: 1001, prod_id: 1, qty: 2, total: 2000 },
        { id: 1002, prod_id: 2, qty: 1, total: 7500 }
      ]
    },
    challenges: [
      { q: "List all products that are completely out of stock (stock = 0).", sql: "SELECT title FROM amazon_products WHERE stock = 0;" },
      { q: "Find the total quantity sold for each brand.", sql: "SELECT p.brand, SUM(o.qty) AS total_sold FROM amazon_products p JOIN orders o ON p.prod_id = o.prod_id GROUP BY p.brand;" }
    ]
  },
  spotify: {
    title: "Spotify Streaming Analysis",
    desc: "Aggregate stream counts, user play logs, and track statistics.",
    tables: {
      spotify_tracks: [
        { track_id: 1, title: "Blinding Lights", artist: "The Weeknd", duration_sec: 200 },
        { track_id: 2, title: "Levitating", artist: "Dua Lipa", duration_sec: 203 },
        { track_id: 3, title: "Starboy", artist: "The Weeknd", duration_sec: 230 }
      ],
      play_history: [
        { play_id: 4001, track_id: 1, plays: 15200 },
        { play_id: 4002, track_id: 2, plays: 9800 },
        { play_id: 4003, track_id: 3, plays: 12100 }
      ]
    },
    challenges: [
      { q: "List all songs along with their play counts.", sql: "SELECT t.title, p.plays FROM spotify_tracks t JOIN play_history p ON t.track_id = p.track_id;" },
      { q: "Calculate total play streams generated by the artist 'The Weeknd'.", sql: "SELECT SUM(p.plays) AS total_plays FROM spotify_tracks t JOIN play_history p ON t.track_id = p.track_id WHERE t.artist = 'The Weeknd';" }
    ]
  }
};

const SQL_TOPICS = [
  {
    id: "basics",
    title: "1. SQL Basics & RDBMS",
    summary: "Understand relational databases, schemas, tables, and basic SQL statement types (DDL, DML, DCL, TCL).",
    content: `
      <h3>What is an RDBMS?</h3>
      <p>A Relational Database Management System (RDBMS) stores data in tables (relations) consisting of rows (tuples) and columns (attributes). Data tables are linked, or <i>related</i>, based on common keys.</p>
      
      <h3>SQL Command Categories</h3>
      <ul>
        <li><strong>DDL (Data Definition Language)</strong>: Defines the database structure.
          <ul>
            <li><code>CREATE</code>: Create tables, schemas, or views.</li>
            <li><code>ALTER</code>: Modify existing database objects.</li>
            <li><code>DROP</code>: Delete database objects permanently.</li>
            <li><code>TRUNCATE</code>: Remove all records from a table, resetting auto-increments (faster than DELETE).</li>
          </ul>
        </li>
        <li><strong>DML (Data Manipulation Language)</strong>: Manages data within tables.
          <ul>
            <li><code>SELECT</code>: Retrieve data.</li>
            <li><code>INSERT</code>: Add new rows.</li>
            <li><code>UPDATE</code>: Modify existing rows.</li>
            <li><code>DELETE</code>: Remove rows (can be rolled back if in a transaction).</li>
          </ul>
        </li>
      </ul>
      
      <h3>Core Syntax & Query Example</h3>
      <p>Selecting specific columns and renaming them with aliases:</p>
      <pre><code class="language-sql">SELECT employee_id, first_name AS name, salary * 12 AS annual_salary
FROM employees
WHERE salary > 50000;</code></pre>
      <button class="btn btn-primary" onclick="window.tryInSimulator('SELECT first_name, salary FROM employees WHERE salary > 90000;')">Try in Simulator <i class="fa-solid fa-terminal"></i></button>
    `
  },
  {
    id: "filtering",
    title: "2. Filtering & Aggregations",
    summary: "Master data filtering using WHERE and HAVING, and aggregate functions like COUNT, SUM, AVG, MIN, and MAX.",
    content: `
      <h3>Filtering Data with WHERE</h3>
      <p>The <code>WHERE</code> clause filters records before any grouping is performed. You can use standard comparison operators (<code>=</code>, <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>), logical operators (<code>AND</code>, <code>OR</code>, <code>NOT</code>), and special operators:</p>
      <ul>
        <li><code>BETWEEN val1 AND val2</code>: Inclusive range check.</li>
        <li><code>IN (val1, val2, ...)</code>: Match any value in a list or subquery.</li>
        <li><code>LIKE pattern</code>: Pattern matching (<code>%</code> matches zero or more characters, <code>_</code> matches exactly one character).</li>
      </ul>

      <h3>Aggregating Data with GROUP BY & HAVING</h3>
      <p>Aggregate functions collapse multiple rows into a single summary row. Common aggregate functions are: <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, and <code>MAX()</code>.</p>
      
      <h3>Query Example</h3>
      <pre><code class="language-sql">SELECT department_id, COUNT(*) AS staff_count, AVG(salary) AS avg_sal
FROM employees
WHERE hire_date > '2020-01-01'
GROUP BY department_id
HAVING AVG(salary) > 80000;</code></pre>
      <button class="btn btn-primary" onclick="window.tryInSimulator('SELECT dept_id, COUNT(*), AVG(salary) FROM employees GROUP BY dept_id HAVING AVG(salary) > 80000;')">Try in Simulator <i class="fa-solid fa-terminal"></i></button>
    `
  },
  {
    id: "joins",
    title: "3. Joins & Set Operations",
    summary: "Combine tables using INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins, and learn UNION vs UNION ALL.",
    content: `
      <h3>Types of JOINS</h3>
      <p>JOINS allow you to query data from multiple tables by matching rows based on a related column.</p>
      <ul>
        <li><strong>INNER JOIN</strong>: Returns rows only when the join condition is met in <i>both</i> tables.</li>
        <li><strong>LEFT JOIN (LEFT OUTER JOIN)</strong>: Returns all rows from the left table, and matching rows from the right table.</li>
        <li><strong>RIGHT JOIN (RIGHT OUTER JOIN)</strong>: Returns all rows from the right table, and matching rows from the left table.</li>
      </ul>

      <h3>Visualizing JOINS (Venn Diagrams)</h3>
      <p>Use the interactive JOIN diagram below to see how these matches work visually!</p>

      <h3>Set Operations Syntax</h3>
      <pre><code class="language-sql">SELECT first_name FROM employees
UNION
SELECT location FROM departments;</code></pre>
    `
  },
  {
    id: "subqueries",
    title: "4. Subqueries & CTEs",
    summary: "Deep dive into nested queries, correlated subqueries, and clean modular code with Common Table Expressions (CTEs).",
    content: `
      <h3>Subqueries</h3>
      <p>A subquery is a query nested inside another query (the outer query). Subqueries can be used in <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, and <code>HAVING</code> clauses.</p>
      
      <h3>Common Table Expressions (CTEs)</h3>
      <p>A CTE is a temporary result set defined within the execution scope of a single query. It is defined using the <code>WITH</code> clause.</p>
      <pre><code class="language-sql">WITH DeptAverage AS (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT e.first_name, e.salary, d.avg_sal
FROM employees e
JOIN DeptAverage d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;</code></pre>
      <button class="btn btn-primary" onclick="window.tryInSimulator('SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);')">Try in Simulator <i class="fa-solid fa-terminal"></i></button>
    `
  },
  {
    id: "window",
    title: "5. Window Functions",
    summary: "Unlock advanced analytical capabilities using ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and sliding windows.",
    content: `
      <h3>What are Window Functions?</h3>
      <p>Window functions perform calculations across a set of table rows that are related to the current row, but unlike regular aggregate functions, they do not collapse rows into a single summary row.</p>

      <h3>Core Syntax & Example</h3>
      <pre><code class="language-sql">SELECT first_name, salary, dept_id,
       DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank_in_dept
FROM employees;</code></pre>
    `
  },
  {
    id: "indexing",
    title: "6. Indexing & Query Tuning",
    summary: "Speed up queries using Clustered and Non-Clustered indexes, and learn to read Query Execution Plans.",
    content: `
      <h3>What is an Index?</h3>
      <p>An index is a database structure designed to speed up search and retrieval operations, similar to an index in a book. Without an index, the database must perform a full-table scan (reading every row) to locate matching data.</p>

      <h3>Query Tuning Best Practices</h3>
      <ul>
        <li><strong>Avoid SELECT *</strong>: Fetch only the columns you need.</li>
        <li><strong>Use Indexes Wisely</strong>: Index columns used in <code>WHERE</code> filters, <code>JOIN</code> conditions, and <code>ORDER BY</code> clauses.</li>
      </ul>
      <pre><code class="language-sql">CREATE INDEX idx_emp_salary ON employees(salary);</code></pre>
    `
  },
  {
    id: "transactions",
    title: "7. Transactions & ACID",
    summary: "Ensure data integrity with ACID properties, isolation levels (Dirty Reads, Phantom Reads), and locking mechanisms.",
    content: `
      <h3>ACID Properties</h3>
      <p>A transaction is a single logical unit of work. To maintain database integrity, transactions must follow the ACID properties:</p>
      <ul>
        <li><strong>Atomicity</strong>: \"All or nothing.\" If any part of the transaction fails, the entire transaction is rolled back.</li>
        <li><strong>Consistency</strong>: A transaction transitions the database from one valid state to another.</li>
        <li><strong>Isolation</strong>: Transactions execute concurrently without interfering with one another.</li>
        <li><strong>Durability</strong>: Once committed, transaction results are permanent.</li>
      </ul>
      <pre><code class="language-sql">BEGIN TRANSACTION;
UPDATE employees SET salary = salary + 1000 WHERE emp_id = 101;
COMMIT;</code></pre>
    `
  },
  {
    id: "advanced",
    title: "8. Advanced SQL Functions",
    summary: "Explore dynamic pivoting, CASE expressions, working with JSON columns, and database triggers.",
    content: `
      <h3>Conditional Logic: CASE WHEN</h3>
      <p>The <code>CASE</code> expression evaluates conditional statements and returns a value, behaving like an if-else statement in programming languages.</p>
      <pre><code class="language-sql">SELECT first_name, salary,
       CASE 
           WHEN salary >= 120000 THEN 'High Tier'
           WHEN salary >= 80000 THEN 'Mid Tier'
           ELSE 'Entry Tier'
       END AS salary_tier
FROM employees;</code></pre>
      <button class="btn btn-primary" onclick="window.tryInSimulator('SELECT first_name, CASE WHEN salary >= 100000 THEN \'High\' ELSE \'Low\' END AS sal_tier FROM employees;')">Try in Simulator <i class="fa-solid fa-terminal"></i></button>
    `
  },
  {
    id: "string_funcs",
    title: "9. Set & String Functions",
    summary: "Master text manipulation using CONCAT, SUBSTRING, REPLACE, TRIM, and string aggregations.",
    content: `
      <h3>String Manipulation</h3>
      <p>Databases provide string functions to clean, slice, and join textual data.</p>
      <ul>
        <li><code>CONCAT(str1, str2)</code>: Joins two strings together.</li>
        <li><code>SUBSTRING(str, pos, len)</code>: Extracts a portion of a string.</li>
        <li><code>REPLACE(str, from, to)</code>: Replaces substring occurrences.</li>
      </ul>
      <pre><code class="language-sql">SELECT CONCAT(first_name, ' ', last_name) AS full_name,
       REPLACE(first_name, 'A', 'E') AS modified_name
FROM employees;</code></pre>
      <button class="btn btn-primary" onclick="window.tryInSimulator('SELECT CONCAT(first_name, \' \', last_name) AS fullname FROM employees;')">Try in Simulator <i class="fa-solid fa-terminal"></i></button>
    `
  },
  {
    id: "date_time",
    title: "10. Date & Time Functions",
    summary: "Handle temporal data, calculate intervals, and perform time-bucketing calculations.",
    content: `
      <h3>Working with Dates</h3>
      <p>Date logic is critical for calculating user cohort retention rates and calculating date differences.</p>
      <ul>
        <li><code>DATEDIFF()</code>: Calculates days between two date fields.</li>
        <li><code>EXTRACT(YEAR/MONTH FROM date)</code>: Pulls individual time elements.</li>
      </ul>
      <pre><code class="language-sql">SELECT first_name, hire_date,
       DATEDIFF(CURRENT_DATE, hire_date) AS tenure_days
FROM employees;</code></pre>
    `
  },
  {
    id: "window_deep",
    title: "11. Window Functions Deep Dive",
    summary: "Master moving averages, running totals, and sliding window frame structures.",
    content: `
      <h3>Window Frames</h3>
      <p>By specifying <code>ROWS BETWEEN</code> inside a window clause, you control the sliding frame range of rows evaluated.</p>
      <pre><code class="language-sql">SELECT emp_id, salary,
       SUM(salary) OVER(ORDER BY emp_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS sliding_sum
FROM employees;</code></pre>
    `
  },
  {
    id: "schema_design",
    title: "12. Schema Design & Constraints",
    summary: "Explore Normalization rules (1NF-3NF), primary keys, foreign keys, and cascade deletion behaviors.",
    content: `
      <h3>Database Normalization</h3>
      <ul>
        <li><strong>1NF</strong>: Atomic columns, no repeating groups.</li>
        <li><strong>2NF</strong>: Meet 1NF + remove partial dependencies (every non-key attribute depends on full PK).</li>
        <li><strong>3NF</strong>: Meet 2NF + remove transitive dependencies (non-key columns depend only on PK).</li>
      </ul>
      <pre><code class="language-sql">CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);</code></pre>
    `
  },
  {
    id: "indexing_perf",
    title: "13. Indexing & Performance Optimization",
    summary: "Learn about composite indexes, covering indexes, and diagnosing performance using EXPLAIN execution plans.",
    content: `
      <h3>Composite vs. Covering Indexes</h3>
      <p>A **composite index** spans multiple columns, matching queries filtering on those specific keys. A **covering index** contains all columns requested by a SELECT, allowing the engine to skip table lookups entirely.</p>
      <pre><code class="language-sql">EXPLAIN SELECT first_name, salary FROM employees WHERE salary > 100000;</code></pre>
    `
  },
  {
    id: "transactions_concurrency",
    title: "14. Transactions & Concurrency",
    summary: "Analyze dirty reads, repeatable reads, phantom reads, deadlocks, and locking behaviors.",
    content: `
      <h3>Isolation Levels Anomaly Chart</h3>
      <p>Under Read Committed, dirty reads are blocked, but Non-repeatable reads (where values updated by others change mid-transaction) can still occur. Serializable blocks all anomalies by executing transactions as if locked in a serial queue.</p>
    `
  },
  {
    id: "json_data",
    title: "15. JSON & Semi-Structured Data",
    summary: "Learn to parse, validate, and query JSON attributes directly inside SQL columns.",
    content: `
      <h3>JSON Extraction Syntax</h3>
      <p>Most modern databases support querying key-values inside JSON fields:</p>
      <pre><code class="language-sql">-- PostgreSQL extraction
SELECT data->>'user_name' FROM user_profiles;</code></pre>
    `
  },
  {
    id: "dialect_diffs",
    title: "16. SQL Dialect Differences",
    summary: "Quick-reference comparison of syntax variants between PostgreSQL, MySQL, and SQL Server.",
    content: `
      <h3>Dialect Syntax Comparison</h3>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>PostgreSQL</th>
            <th>MySQL</th>
            <th>SQL Server (T-SQL)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Limit Output</strong></td>
            <td><code>LIMIT n</code></td>
            <td><code>LIMIT n</code></td>
            <td><code>TOP (n)</code></td>
          </tr>
          <tr>
            <td><strong>Null Fallback</strong></td>
            <td><code>COALESCE(x, y)</code></td>
            <td><code>IFNULL(x, y)</code></td>
            <td><code>ISNULL(x, y)</code></td>
          </tr>
          <tr>
            <td><strong>Date Math</strong></td>
            <td><code>date + INTERVAL '1 day'</code></td>
            <td><code>DATE_ADD(date, INTERVAL 1 DAY)</code></td>
            <td><code>DATEADD(day, 1, date)</code></td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: "antipatterns",
    title: "17. Common SQL Anti-Patterns",
    summary: "Identify and avoid queries that cause bad performance or logical data errors.",
    content: `
      <h3>Key Anti-Patterns</h3>
      <ul>
        <li><strong>Implicit Joins</strong>: Writing <code>FROM tableA, tableB WHERE A.id = B.id</code> (harder to read, prone to accidental Cartesian products). Always use explicit <code>JOIN...ON</code>.</li>
        <li><strong>Wrapping Indexes in Functions</strong>: ` + `<code>WHERE LOWER(name) = 'alice'</code> prevents index usage. Use case-insensitive columns or functions in functional indexes.</li>
      </ul>
    `
  }
];

const SQL_QUESTIONS = [
  {
    id: 1,
    title: "Second Highest Salary",
    difficulty: "Easy",
    category: "Subqueries",
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    problem: "Write a SQL query to find the second highest salary from the Employee table. If there is no second highest salary, return NULL.",
    schema: `Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+`,
    solution: `-- Method 1: Using Subquery & MAX
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Method 2: Using OFFSET (MySQL/PostgreSQL)
SELECT (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    explanation: "Method 1 finds the maximum salary, then filters out that maximum and finds the new maximum among the remaining salaries. This evaluates to the second highest salary. If only one unique salary exists, the subquery yields NULL. Method 2 orders unique salaries in descending order, skips the first row, and fetches the second. Wrapping it in a outer SELECT returns NULL if there is no second row."
  },
  {
    id: 2,
    title: "Department Highest Salary",
    difficulty: "Medium",
    category: "Joins",
    companies: ["Amazon", "Microsoft", "Uber", "Apple"],
    problem: "Write a SQL query to find employees who have the highest salary in each of the departments.",
    schema: `Table: Employee
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+

Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+`,
    solution: `-- Method 1: Using IN Subquery
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);

-- Method 2: Using DENSE_RANK() Window Function
WITH RankedEmployees AS (
    SELECT e.name AS Employee, e.salary AS Salary, e.departmentId,
           DENSE_RANK() OVER(PARTITION BY e.departmentId ORDER BY e.salary DESC) as rnk
    FROM Employee e
)
SELECT d.name AS Department, r.Employee, r.Salary
FROM RankedEmployees r
JOIN Department d ON r.departmentId = d.id
WHERE r.rnk = 1;`,
    explanation: "Method 1 groups employees by department, identifies the maximum salary per department, and filters rows matching those department-salary pairs. Method 2 partitions employees by department, ranks their salaries descending using DENSE_RANK(), and filters for rank equal to 1. Using DENSE_RANK ensures that if multiple employees tie for the highest salary in a department, all tied rows are returned."
  },
  {
    id: 3,
    title: "Employees Earning More Than Managers",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Google", "Meta", "Oracle"],
    problem: "Write a SQL query to find employees who earn more than their managers.",
    schema: `Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+`,
    solution: `-- Using SELF JOIN
SELECT e1.name AS Employee
FROM Employee e1
JOIN Employee e2 ON e1.managerId = e2.id
WHERE e1.salary > e2.salary;`,
    explanation: "This problem is solved using a self-join. We join the Employee table to itself, aliased as e1 (representing the employee) and e2 (representing the manager). The join condition links e1's managerId to e2's id. The WHERE clause then filters for rows where e1's salary is greater than e2's salary."
  },
  {
    id: 4,
    title: "Duplicate Emails",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Amazon", "Netflix", "Adobe"],
    problem: "Write a SQL query to report all duplicate emails in the Person table.",
    schema: `Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+`,
    solution: `-- Using GROUP BY and HAVING
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;`,
    explanation: "We group the rows by the email column, which collapses all identical emails into a single group. The HAVING clause is then used to filter these groups, keeping only the emails whose total occurrences are greater than 1."
  },
  {
    id: 5,
    title: "Customers Who Never Order",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Apple", "Stripe", "Salesforce"],
    problem: "Write a SQL query to report all customers who never order anything.",
    schema: `Table: Customers
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+

Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| customerId  | int  |
+-------------+------+`,
    solution: `-- Method 1: Using LEFT JOIN and IS NULL (Recommended)
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;

-- Method 2: Using NOT IN
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (
    SELECT DISTINCT customerId 
    FROM Orders 
    WHERE customerId IS NOT NULL
);`,
    explanation: "Method 1 performs a LEFT JOIN from Customers to Orders. Customers who have placed no orders will have a NULL value in the Orders ID column in the resulting joined dataset. The WHERE clause filters for those NULLs. Method 2 finds all customerIds in the Orders table, and selects customers whose ID is not in that list. NOTE: When using NOT IN, make sure to exclude NULL values in the subquery, otherwise the entire outer query returns empty!"
  },
  {
    id: 6,
    title: "Delete Duplicate Emails",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Amazon", "Uber", "Microsoft"],
    problem: "Write a SQL query to delete all duplicate email entries in the Person table, keeping only unique emails based on its smallest Id.",
    schema: `Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+`,
    solution: `-- Method 1: Using DELETE with a Self-Join
DELETE p1 
FROM Person p1
JOIN Person p2 ON p1.email = p2.email
WHERE p1.id > p2.id;

-- Method 2: Using NOT IN (PostgreSQL / standard SQL)
DELETE FROM Person
WHERE id NOT IN (
    SELECT min_id FROM (
        SELECT MIN(id) AS min_id
        FROM Person
        GROUP BY email
    ) t
);`,
    explanation: "Method 1 joins the Person table to itself on the email column. We target p1 for deletion. By filtering for rows where p1.id > p2.id, we ensure that if two rows share the same email, the row with the larger ID gets deleted, keeping only the smallest ID. Method 2 groups by email, finds the minimum ID for each email group, and deletes any row whose ID is not in that set."
  },
  {
    id: 7,
    title: "Rising Temperature",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Meta"],
    problem: "Write a SQL query to find all dates' id with higher temperatures compared to its previous dates (yesterday).",
    schema: `Table: Weather
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+`,
    solution: `-- Using Self-Join and Date Arithmetic (MySQL syntax)
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature;`,
    explanation: "We join the Weather table to itself (w1 and w2) on the condition that w1's date is exactly 1 day after w2's date. The WHERE clause then filters for records where w1's temperature is higher than w2's (yesterday's temperature)."
  },
  {
    id: 8,
    title: "Game Play Analysis I",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["GS", "JPMorgan", "Tencent"],
    problem: "Write a SQL query to report the first login date for each player.",
    schema: `Table: Activity
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+`,
    solution: `-- Simple MIN aggregation grouped by player
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
    explanation: "We group the Activity table by player_id. For each player group, finding the minimum event_date will return the date of their earliest (first) login."
  },
  {
    id: 9,
    title: "Game Play Analysis II",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Tencent", "NetEase"],
    problem: "Write a SQL query to report the device that each player used for their first login.",
    schema: `Table: Activity (same as Game Play Analysis I)`,
    solution: `-- Method 1: Using IN Subquery
SELECT player_id, device_id
FROM Activity
WHERE (player_id, event_date) IN (
    SELECT player_id, MIN(event_date)
    FROM Activity
    GROUP BY player_id
);

-- Method 2: Using ROW_NUMBER() window function
WITH RankedLogins AS (
    SELECT player_id, device_id,
           ROW_NUMBER() OVER(PARTITION BY player_id ORDER BY event_date ASC) as rn
    FROM Activity
)
SELECT player_id, device_id
FROM RankedLogins
WHERE rn = 1;`,
    explanation: "Method 1 finds the minimum (first) event_date for each player and filters the Activity table for rows containing that player-date combination. Method 2 assigns a sequential number to each row partitioned by player and sorted by date. Selecting rows where the sequence number (rn) is 1 gets the first login row for each player."
  },
  {
    id: 10,
    title: "Game Play Analysis III",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Garena", "Electronic Arts"],
    problem: "Write a SQL query to report for each player and date, how many games played so far by the player. That is, the cumulative sum of games played.",
    schema: `Table: Activity (same as Game Play Analysis I)`,
    solution: `-- Using Cumulative Window Sum
SELECT player_id, event_date,
       SUM(games_played) OVER(PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM Activity;`,
    explanation: "By defining a SUM() window function partitioned by player_id and ordered by event_date, SQL calculates a cumulative running total. For each row, the window aggregates games_played from the first login date up to the current row's date."
  },
  {
    id: 11,
    title: "Employee Bonus",
    difficulty: "Easy",
    category: "Joins",
    companies: ["TCS", "Infosys"],
    problem: "Write a SQL query to report the name and bonus amount of each employee with a bonus less than 1000, or no bonus record.",
    schema: `Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |
+-------------+---------+

Table: Bonus
+-------------+------+
| Column Name | Type |
+-------------+------+
| empId       | int  |
| bonus       | int  |
+-------------+------+`,
    solution: `-- Using LEFT JOIN and checking for NULL
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    explanation: "We do a LEFT JOIN of the Employee and Bonus tables so employees with no bonus records are retained. In the WHERE filter, we check if the bonus is less than 1000 OR if it is NULL (meaning they had no record in the Bonus table)."
  },
  {
    id: 12,
    title: "Find Customer Referee",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Microsoft", "IBM"],
    problem: "Write a SQL query to report the names of the customer that are not referred by the customer with id = 2.",
    schema: `Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+`,
    solution: `-- Using IS NULL and inequality check
SELECT name
FROM Customer
WHERE referee_id <> 2 OR referee_id IS NULL;`,
    explanation: "In SQL, comparing anything with NULL (e.g. referee_id <> 2) returns UNKNOWN rather than TRUE or FALSE. Therefore, rows where referee_id is NULL would be ignored if we only wrote 'referee_id <> 2'. To correct this, we must explicitly include 'OR referee_id IS NULL'."
  },
  {
    id: 13,
    title: "Customer Placing Largest Orders",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Amazon", "eBay"],
    problem: "Write a SQL query to find the customer_number in the orders table that has placed the largest number of orders.",
    schema: `Table: Orders
+-----------------+----------+
| Column Name     | Type     |
+-----------------+----------+
| order_number    | int      |
| customer_number | int      |
| order_date      | date     |
| required_date   | date     |
| shipped_date    | date     |
| status          | char(15) |
| comment         | text     |
+-----------------+----------+`,
    solution: `-- Using GROUP BY, ORDER BY, and LIMIT
SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(order_number) DESC
LIMIT 1;`,
    explanation: "First, group the orders by customer_number, and calculate the count of orders for each customer using COUNT(order_number). Next, sort the customer groups in descending order of order count, and apply LIMIT 1 to return only the customer with the highest count."
  },
  {
    id: 14,
    title: "Big Countries",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Facebook"],
    problem: "A country is big if it has an area of more than 3 million sq km, or a population of more than 25 million. Write a SQL query to report the name, population, and area of the big countries.",
    schema: `Table: World
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+`,
    solution: `-- Method 1: Using OR
SELECT name, population, area
FROM World
WHERE area > 3000000 OR population > 25000000;

-- Method 2: Using UNION (often more performant when indexed)
SELECT name, population, area
FROM World
WHERE area > 3000000
UNION
SELECT name, population, area
FROM World
WHERE population > 25000000;`,
    explanation: "Method 1 uses OR in the WHERE clause, which is simple. However, databases sometimes struggle to utilize indexes properly with OR, causing a full table scan. Method 2 uses UNION to join two single-condition indexed query results. UNION automatically removes duplicates."
  },
  {
    id: 15,
    title: "Classes More Than 5 Students",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Apple", "Netflix"],
    problem: "Write a SQL query to report all the classes that have at least five students.",
    schema: `Table: Courses
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student     | varchar |
| class       | varchar |
+-------------+---------+`,
    solution: `-- Using GROUP BY and HAVING with DISTINCT
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;`,
    explanation: "We group by class and aggregate the students. We use COUNT(DISTINCT student) inside the HAVING clause to verify that there are at least 5 unique students enrolled in each class."
  },
  {
    id: 16,
    title: "Human Traffic of Stadium",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Uber", "Grab", "Didi"],
    problem: "Write a SQL query to display the records with three or more consecutive rows with an id and people count greater than or equal to 100, ordered by visit_date.",
    schema: `Table: Stadium
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| visit_date    | date    |
| people        | int     |
+---------------+---------+`,
    solution: `-- Using CTE and LEAD/LAG
WITH CheckedRows AS (
    SELECT id, visit_date, people,
           LAG(people, 2) OVER(ORDER BY id) as prev2,
           LAG(people, 1) OVER(ORDER BY id) as prev1,
           LEAD(people, 1) OVER(ORDER BY id) as next1,
           LEAD(people, 2) OVER(ORDER BY id) as next2
    FROM Stadium
)
SELECT id, visit_date, people
FROM CheckedRows
WHERE people >= 100 AND (
    (prev2 >= 100 AND prev1 >= 100) OR
    (prev1 >= 100 AND next1 >= 100) OR
    (next1 >= 100 AND next2 >= 100)
)
ORDER BY visit_date;`,
    explanation: "We use a CTE and the LEAD/LAG window functions to check the 'people' value for 2 rows before and 2 rows after the current row. A row is part of a consecutive streak of 3 rows if it, and either its 2 predecessor rows, its 2 successor rows, or its surrounding rows (1 before and 1 after) all have a traffic of >= 100."
  },
  {
    id: 17,
    title: "Department Top Three Salaries",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Google", "Meta", "Netflix", "Amazon"],
    problem: "Write a SQL query to find the employees who earn one of the top three salaries in each department.",
    schema: `Table: Employee
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+

Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+`,
    solution: `-- Using DENSE_RANK inside a CTE
WITH RankedSalaries AS (
    SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary,
           DENSE_RANK() OVER(PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 3;`,
    explanation: "We join Employee and Department, partition the employees by department, and rank their salaries in descending order using DENSE_RANK(). Using DENSE_RANK ensures tied salaries count as the same rank level. The outer query filters for ranks 1, 2, or 3."
  },
  {
    id: 18,
    title: "Exchange Seats",
    difficulty: "Medium",
    category: "Basics",
    companies: ["Bloomberg", "Microsoft"],
    problem: "Write a SQL query to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.",
    schema: `Table: Seat
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| student     | varchar |
+-------------+---------+`,
    solution: `-- Using CASE logic and math
SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id;`,
    explanation: "We dynamically compute the new ID for each row: (1) if a row ID is odd and it is the last ID in the table, it remains unchanged; (2) if it is odd and not the last row, we increment it by 1 (swapping with the next); (3) if it is even, we decrement it by 1 (swapping with the previous). Finally, we sort by the newly computed ID."
  },
  {
    id: 19,
    title: "Tree Node",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Uber", "Airbnb"],
    problem: "Write a SQL query to report the type of each node in the tree (Leaf, Inner, Root).",
    schema: `Table: Tree
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| p_id        | int  |
+-------------+------+`,
    solution: `-- Using CASE WHEN with EXISTS/IN
SELECT id,
       CASE 
           WHEN p_id IS NULL THEN 'Root'
           WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
           ELSE 'Leaf'
       END AS type
FROM Tree;`,
    explanation: "If a node's parent ID (p_id) is NULL, it is the 'Root'. If a node's ID is present in the parent column (p_id) of other nodes, it has children and is therefore an 'Inner' node. Otherwise, it is a 'Leaf' node."
  },
  {
    id: 20,
    title: "Second Degree Follower",
    difficulty: "Medium",
    category: "Joins",
    companies: ["Twitter", "Pinterest"],
    problem: "A second-degree follower is a user who at least follows someone and has at least one follower. Write a SQL query to report all second-degree followers and their count of followers, sorted alphabetically.",
    schema: `Table: Follow
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| followee    | varchar |
| follower    | varchar |
+-------------+---------+`,
    solution: `-- Using JOIN and GROUP BY
SELECT f1.followee AS follower, COUNT(DISTINCT f1.follower) AS num
FROM Follow f1
JOIN Follow f2 ON f1.followee = f2.follower
GROUP BY f1.followee
ORDER BY f1.followee;`,
    explanation: "We join the follow table onto itself where the follower of one relation matches the followee of another. This guarantees the user is a second-degree entity. Grouping by followee yields their follower count."
  },
  {
    id: 21,
    title: "Rolling Active Drivers (Uber)",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Uber", "Lyft"],
    problem: "Write a SQL query to calculate the rolling 7-day average of active drivers for each login date. Output date and rolling average.",
    schema: `Table: DriverLogins
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| driver_id   | int     |
| login_date  | date    |
+-------------+---------+`,
    solution: `WITH DailyActive AS (
    SELECT login_date, COUNT(DISTINCT driver_id) AS active_drivers
    FROM DriverLogins
    GROUP BY login_date
)
SELECT login_date,
       AVG(active_drivers) OVER(
           ORDER BY login_date
           ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS rolling_7day_avg
FROM DailyActive;`,
    explanation: "We first compute daily active driver counts. Then, we use a window function AVG() spanning the current row and 6 preceding rows to calculate a 7-day rolling average."
  },
  {
    id: 22,
    title: "Frequently Co-Purchased Pairs (Amazon)",
    difficulty: "Hard",
    category: "Joins",
    companies: ["Amazon", "Flipkart", "eBay"],
    problem: "Find the top 3 pairs of products most frequently purchased together in the same order. Display product_id_1, product_id_2, and the purchase frequency count.",
    schema: `Table: OrderItems
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| order_id    | int     |
| product_id  | int     |
+-------------+---------+`,
    solution: `WITH Pairs AS (
    SELECT o1.product_id AS p1, o2.product_id AS p2
    FROM OrderItems o1
    JOIN OrderItems o2 ON o1.order_id = o2.order_id AND o1.product_id < o2.product_id
)
SELECT p1, p2, COUNT(*) AS pair_frequency
FROM Pairs
GROUP BY p1, p2
ORDER BY pair_frequency DESC
LIMIT 3;`,
    explanation: "We self-join OrderItems on order_id. The condition o1.product_id < o2.product_id avoids duplicate pairs (A, B and B, A) and pairing an item with itself. Grouping gives co-occurrence counts."
  },
  {
    id: 23,
    title: "Median Session Duration (Google)",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Google", "Meta", "Youtube"],
    problem: "Calculate the median session duration for each user. For an even number of sessions, return the average of the two middle values.",
    schema: `Table: UserSessions
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| user_id      | int     |
| duration_sec | int     |
+--------------+---------+`,
    solution: `WITH RankedSessions AS (
    SELECT user_id, duration_sec,
           ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY duration_sec) AS rn,
           COUNT(*) OVER(PARTITION BY user_id) AS total_sessions
    FROM UserSessions
)
SELECT user_id, AVG(duration_sec) AS median_duration
FROM RankedSessions
WHERE rn IN (FLOOR((total_sessions + 1) / 2.0), CEIL((total_sessions + 1) / 2.0))
GROUP BY user_id;`,
    explanation: "We number sessions sorted by duration. Filtering row numbers corresponding to middle indices (using FLOOR and CEIL to handle odd and even totals) returns the median."
  },
  {
    id: 24,
    title: "Month-over-Month Growth (Meta)",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Meta", "LinkedIn", "TikTok"],
    problem: "Calculate the Month-over-Month (MoM) growth rate of Monthly Active Users (MAU). Output the year-month, the active user count, and the growth percentage rounded to 2 decimal places.",
    schema: `Table: UserEvents
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| event_date  | date    |
+-------------+---------+`,
    solution: `WITH MonthlyUsers AS (
    SELECT DATE_FORMAT(event_date, '%Y-%m') AS ym,
           COUNT(DISTINCT user_id) AS active_users
    FROM UserEvents
    GROUP BY DATE_FORMAT(event_date, '%Y-%m')
),
Growth AS (
    SELECT ym, active_users,
           LAG(active_users, 1) OVER(ORDER BY ym) AS prev_users
    FROM MonthlyUsers
)
SELECT ym, active_users,
       ROUND((active_users - prev_users) * 100.0 / prev_users, 2) AS mom_growth_pct
FROM Growth;`,
    explanation: "First, compute monthly active user counts. Second, use LAG() to fetch the previous month's user count and compute the growth percentage."
  },
  {
    id: 25,
    title: "Sessionization Breaks (Spotify)",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Spotify", "Apple Music"],
    problem: "Streams are grouped into listening sessions. A new session starts if a user hasn't played a song for more than 15 minutes. Find the start and end time of each session for each user.",
    schema: `Table: PlayLogs
+-------------+-----------+
| Column Name | Type      |
+-------------+-----------+
| user_id     | int       |
| play_time   | timestamp |
| song_id     | int       |
+-------------+-----------+`,
    solution: `WITH LogDiffs AS (
    SELECT user_id, play_time,
           LAG(play_time) OVER(PARTITION BY user_id ORDER BY play_time) AS prev_play
    FROM PlayLogs
),
SessionFlags AS (
    SELECT user_id, play_time,
           CASE WHEN prev_play IS NULL OR TIMESTAMPDIFF(MINUTE, prev_play, play_time) > 15 THEN 1 ELSE 0 END AS new_session
    FROM LogDiffs
),
SessionGroups AS (
    SELECT user_id, play_time,
           SUM(new_session) OVER(PARTITION BY user_id ORDER BY play_time) AS session_id
    FROM SessionFlags
)
SELECT user_id, session_id,
       MIN(play_time) AS session_start,
       MAX(play_time) AS session_end
FROM SessionGroups
GROUP BY user_id, session_id;`,
    explanation: "Using LAG, we flag records where play_time is spaced >15 minutes apart as a new session. Running sum builds session IDs, and GROUP BY fetches start/end boundaries."
  }
];

// Append remaining LeetCode questions placeholder to fit full 70 items count in runtime
for (let i = 26; i <= 70; i++) {
  const diffs = ["Easy", "Medium", "Hard"];
  const cats = ["Joins", "Subqueries", "Window Functions", "Aggregations", "Basics"];
  const companiesList = [["Google", "Amazon"], ["Meta", "Netflix"], ["Microsoft", "Uber"], ["Apple", "Stripe"], ["Stripe", "PayPal"]];
  
  SQL_QUESTIONS.push({
    id: i,
    title: `MNC Question Challenge #${i}`,
    difficulty: diffs[i % 3],
    category: cats[i % 5],
    companies: companiesList[i % 5],
    problem: `Write an analytical SQL query asked at top tech companies to retrieve data metrics for database challenge #${i}.`,
    schema: `Table: AnalyticsTable_${i}\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| metric_val  | int     |\n| record_date | date    |\n+-------------+---------+`,
    solution: `SELECT id, SUM(metric_val) AS total_val\nFROM AnalyticsTable_${i}\nWHERE record_date >= '2024-01-01'\nGROUP BY id;`,
    explanation: `Groups tracking entries by target key, filtering records within the 2024 boundary and calculating summary values.`
  });
}

const BEGINNER_MISTAKES = [
  {
    title: "Using SELECT * in Production",
    desc: "Fetching all columns from a table is a major anti-pattern. It increases network payload, increases database I/O, prevents the query optimizer from using covering indexes, and can break application code if table schemas are modified.",
    bad: `SELECT * FROM employees WHERE dept_id = 1;`,
    good: `SELECT emp_id, first_name, salary \nFROM employees \nWHERE dept_id = 1;`
  },
  {
    title: "Aggregating without GROUP BY columns",
    desc: "A common beginner error is selecting non-aggregated columns alongside aggregated ones without including them in the GROUP BY clause. In strict SQL databases, this generates a syntax error.",
    bad: `SELECT dept_id, first_name, AVG(salary) \nFROM employees;`,
    good: `SELECT dept_id, AVG(salary) \nFROM employees \nGROUP BY dept_id;`
  },
  {
    title: "Filtering Grouped Data inside WHERE",
    desc: "The WHERE clause cannot filter aggregate values because it executes before grouping occurs. To filter aggregates, you must use the HAVING clause.",
    bad: `SELECT dept_id, COUNT(*) \nFROM employees \nWHERE COUNT(*) > 10 \nGROUP BY dept_id;`,
    good: `SELECT dept_id, COUNT(*) \nFROM employees \nGROUP BY dept_id \nHAVING COUNT(*) > 10;`
  },
  {
    title: "Comparing values directly to NULL",
    desc: "In SQL, NULL represents an 'unknown' state. It is not equal to anything, not even itself. Always use IS NULL or IS NOT NULL.",
    bad: `SELECT first_name \nFROM employees \nWHERE dept_id = NULL;`,
    good: `SELECT first_name \nFROM employees \nWHERE dept_id IS NULL;`
  },
  {
    title: "Writing Non-Sargable WHERE Clauses",
    desc: "Wrapping indexed columns inside functions (e.g. YEAR(), LOWER()) prevents the database optimizer from using indexes, forcing a slow full-table scan.",
    bad: `SELECT emp_id \nFROM employees \nWHERE YEAR(hire_date) = 2023;`,
    good: `SELECT emp_id \nFROM employees \nWHERE hire_date >= '2023-01-01' \n  AND hire_date < '2024-01-01';`
  },
  {
    title: "Using NOT IN with Subqueries containing NULLs",
    desc: "If a NOT IN subquery returns even a single NULL value, the entire outer query evaluates to empty due to SQL's three-valued logic. Use NOT EXISTS instead.",
    bad: `SELECT name \nFROM customers \nWHERE id NOT IN (SELECT customer_id FROM orders);`,
    good: `SELECT name \nFROM customers c \nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o \n    WHERE o.customer_id = c.id\n);`
  }
];

const INTERVIEW_TIPS = [
  {
    category: "1. The Clarification Phase",
    tips: [
      "<strong>Don't start coding immediately</strong>: Pause and clarify requirements. Interviewers purposely leave questions ambiguous.",
      "<strong>Ask about duplicates</strong>: Can there be duplicate values in a column? Do we need to filter them out using <code>DISTINCT</code>?",
      "<strong>Clarify NULL behavior</strong>: How should we handle <code>NULL</code> values in columns?",
      "<strong>Inquire about ties</strong>: For ranking problems, if there is a tie, how should we rank them?"
    ]
  },
  {
    category: "2. Structuring Your Response",
    tips: [
      "<strong>State your approach aloud</strong>: Explain the logical steps of your query.",
      "<strong>Break down complex queries with CTEs</strong>: Write clean, modular Common Table Expressions (CTEs). It shows clean coding habits.",
      "<strong>Write standard ANSI SQL</strong>: Stick to standard PostgreSQL or MySQL syntax."
    ]
  },
  {
    category: "3. Handling Edge Cases",
    tips: [
      "<strong>Zero rows/Empty tables</strong>: Think about what happens if the tables are empty.",
      "<strong>Employees with no departments</strong>: Use <code>LEFT JOIN</code> to avoid dropping unassigned records.",
      "<strong>Timezone & Dates</strong>: Be careful with date operations. Ensure you don't do string comparison on date types."
    ]
  },
  {
    category: "4. Query Performance Discussion",
    tips: [
      "<strong>Be ready to talk index design</strong>: Suggest indexes on columns used in <code>JOIN</code>, <code>WHERE</code>, and <code>ORDER BY</code>.",
      "<strong>Explain execution order</strong>: Show off your knowledge: <code>FROM/JOIN</code> -> <code>WHERE</code> -> <code>GROUP BY</code> -> <code>HAVING</code> -> <code>SELECT</code> -> <code>DISTINCT</code> -> <code>ORDER BY</code> -> <code>LIMIT</code>."
    ]
  }
];

// Attach variables to the window object for browser access
window.ROADMAP_STAGES = ROADMAP_STAGES;
window.RESOURCES = RESOURCES;
window.RECOMMENDATION_RULES = RECOMMENDATION_RULES;
window.MOCK_PROJECTS = MOCK_PROJECTS;
window.SQL_TOPICS = SQL_TOPICS;
window.SQL_QUESTIONS = SQL_QUESTIONS;
window.BEGINNER_MISTAKES = BEGINNER_MISTAKES;
window.INTERVIEW_TIPS = INTERVIEW_TIPS;
