// SQL Mastery Hub - Static Data

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
        <li><strong>DCL (Data Control Language)</strong>: Deals with permissions and access control.
          <ul>
            <li><code>GRANT</code>: Give users permissions.</li>
            <li><code>REVOKE</code>: Take away permissions.</li>
          </ul>
        </li>
        <li><strong>TCL (Transaction Control Language)</strong>: Manages transactions.
          <ul>
            <li><code>COMMIT</code>: Save changes permanently.</li>
            <li><code>ROLLBACK</code>: Undo changes since the last commit.</li>
            <li><code>SAVEPOINT</code>: Set points within a transaction to rollback to.</li>
          </ul>
        </li>
      </ul>
      
      <h3>Basic SQL Query Structure</h3>
      <pre><code class="language-sql">SELECT column1, column2 
FROM table_name 
WHERE condition;</code></pre>
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
        <li><code>IS NULL</code> / <code>IS NOT NULL</code>: Checks for empty values.</li>
      </ul>

      <h3>Aggregating Data with GROUP BY</h3>
      <p>Aggregate functions collapse multiple rows into a single summary row. Common aggregate functions are: <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, and <code>MAX()</code>.</p>
      <p>If you use aggregate functions alongside non-aggregated columns, you <strong>must</strong> include those non-aggregated columns in a <code>GROUP BY</code> clause.</p>

      <h3>WHERE vs. HAVING</h3>
      <ul>
        <li><strong>WHERE</strong> filters raw rows <i>before</i> aggregation. It cannot contain aggregate functions (e.g., <code>WHERE SUM(salary) > 5000</code> is invalid).</li>
        <li><strong>HAVING</strong> filters grouped rows <i>after</i> aggregation. It is applied directly to aggregate values (e.g., <code>HAVING SUM(salary) > 5000</code>).</li>
      </ul>

      <pre><code class="language-sql">SELECT department_id, COUNT(*), AVG(salary)
FROM employees
WHERE hire_date > '2020-01-01'
GROUP BY department_id
HAVING AVG(salary) > 60000;</code></pre>
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
        <li><strong>LEFT JOIN (LEFT OUTER JOIN)</strong>: Returns all rows from the left table, and matching rows from the right table. If no match, right columns return <code>NULL</code>.</li>
        <li><strong>RIGHT JOIN (RIGHT OUTER JOIN)</strong>: Returns all rows from the right table, and matching rows from the left table. If no match, left columns return <code>NULL</code>.</li>
        <li><strong>FULL OUTER JOIN</strong>: Returns rows when there is a match in <i>either</i> table. Unmatched columns return <code>NULL</code>.</li>
        <li><strong>CROSS JOIN</strong>: Returns the Cartesian product of both tables (every row from table A joined with every row from table B). No <code>ON</code> clause is used.</li>
        <li><strong>SELF JOIN</strong>: A regular join where a table is joined with itself (useful for hierarchical structures, like matching employees to their managers).</li>
      </ul>

      <h3>Visualizing JOINS (Venn Diagrams)</h3>
      <p>Use the interactive JOIN diagram below to see how these matches work visually!</p>

      <h3>Set Operations</h3>
      <p>Set operations combine the results of two or more <code>SELECT</code> queries. The queries must have the same number of columns with compatible data types.</p>
      <ul>
        <li><code>UNION</code>: Combines result sets, removing duplicate rows.</li>
        <li><code>UNION ALL</code>: Combines result sets, keeping duplicates (faster because it doesn't perform a sorting/deduplication step).</li>
        <li><code>INTERSECT</code>: Returns only rows that appear in <i>both</i> result sets.</li>
        <li><code>EXCEPT</code> (or <code>MINUS</code>): Returns rows from the first query that are <i>not</i> present in the second.</li>
      </ul>
    `
  },
  {
    id: "subqueries",
    title: "4. Subqueries & CTEs",
    summary: "Deep dive into nested queries, correlated subqueries, and clean modular code with Common Table Expressions (CTEs).",
    content: `
      <h3>Subqueries</h3>
      <p>A subquery is a query nested inside another query (the outer query). Subqueries can be used in <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, and <code>HAVING</code> clauses.</p>
      <ul>
        <li><strong>Single-Row Subquery</strong>: Returns one row and one column. Used with comparison operators like <code>=</code>, <code>&gt;</code>, <code>&lt;</code>.</li>
        <li><strong>Multi-Row Subquery</strong>: Returns multiple rows. Used with operators like <code>IN</code>, <code>ANY</code>, or <code>ALL</code>.</li>
        <li><strong>Correlated Subquery</strong>: A subquery that references columns of the outer query. It executes once for each candidate row evaluated by the outer query (slower for large datasets).</li>
      </ul>

      <h3>Common Table Expressions (CTEs)</h3>
      <p>A CTE is a temporary result set defined within the execution scope of a single query. It is defined using the <code>WITH</code> clause. CTEs improve readability and make query structures modular.</p>
      <pre><code class="language-sql">WITH DeptAverage AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
SELECT e.employee_name, e.salary, d.avg_sal
FROM employees e
JOIN DeptAverage d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal;</code></pre>

      <h3>Recursive CTEs</h3>
      <p>A recursive CTE references itself. It is commonly used to traverse hierarchical structures, like organizational charts, category trees, or flight pathways.</p>
    `
  },
  {
    id: "window",
    title: "5. Window Functions",
    summary: "Unlock advanced analytical capabilities using ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and sliding windows.",
    content: `
      <h3>What are Window Functions?</h3>
      <p>Window functions perform calculations across a set of table rows that are related to the current row, but unlike regular aggregate functions, they do not collapse rows into a single summary row. Each row retains its individual identity.</p>
      <p>They are defined using the <code>OVER</code> clause, which dictates how rows are partitioned and ordered.</p>

      <h3>Core Syntax</h3>
      <pre><code class="language-sql">FUNCTION() OVER (
    PARTITION BY column_to_group
    ORDER BY column_to_sort
    ROWS/RANGE BETWEEN ... -- optional frame clause
)</code></pre>

      <h3>Key Window Functions</h3>
      <ul>
        <li><code>ROW_NUMBER()</code>: Assigns a unique sequential integer to each row within a partition, starting at 1.</li>
        <li><code>RANK()</code>: Assigns a rank to each row. If values are identical, they get the same rank, and the next rank is skipped (e.g., 1, 2, 2, 4).</li>
        <li><code>DENSE_RANK()</code>: Ranks rows, but identical values get the same rank without skipping any numbers (e.g., 1, 2, 2, 3).</li>
        <li><code>LAG(col, offset)</code>: Accesses data from a previous row in the partition without a self-join.</li>
        <li><code>LEAD(col, offset)</code>: Accesses data from a subsequent row in the partition.</li>
        <li><code>FIRST_VALUE()</code> / <code>LAST_VALUE()</code>: Returns the first or last value in the sorted window frame.</li>
      </ul>

      <h3>Example: Ranking Employees in Departments</h3>
      <pre><code class="language-sql">SELECT employee_name, department_id, salary,
       DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) as salary_rank
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
      
      <h3>Clustered vs. Non-Clustered Indexes</h3>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Clustered Index</th>
            <th>Non-Clustered Index</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Physical Storage</strong></td>
            <td>Sorts and stores the actual data rows in the index order.</td>
            <td>Stores pointers to the physical rows; does not sort the actual table data.</td>
          </tr>
          <tr>
            <td><strong>Limit per Table</strong></td>
            <td>Only 1 (since data can only be physically sorted one way).</td>
            <td>Multiple (typically up to 999 depending on the database).</td>
          </tr>
          <tr>
            <td><strong>Creation</strong></td>
            <td>Usually created automatically on the Primary Key.</td>
            <td>Created manually on columns frequently used in WHERE, JOIN, and ORDER BY.</td>
          </tr>
        </tbody>
      </table>

      <h3>Query Tuning Best Practices</h3>
      <ul>
        <li><strong>Avoid SELECT *</strong>: Fetch only the columns you need to reduce network load and memory consumption.</li>
        <li><strong>Use Indexes Wisely</strong>: Index columns used in <code>WHERE</code> filters, <code>JOIN</code> conditions, and <code>ORDER BY</code> clauses. But avoid over-indexing because index updates slow down <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> statements.</li>
        <li><strong>Sargable Queries</strong>: Write queries that utilize indexes. For example, avoid wrapping indexed columns in functions (e.g., use <code>WHERE hire_date >= '2023-01-01'</code> instead of <code>WHERE YEAR(hire_date) = 2023</code>).</li>
        <li><strong>Analyze Execution Plans</strong>: Use commands like <code>EXPLAIN</code> (PostgreSQL / MySQL) or <code>SHOWPLAN</code> (SQL Server) to check how the database optimizer executes a query and identify bottlenecks like full table scans.</li>
      </ul>
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
        <li><strong>Atomicity</strong>: \"All or nothing.\" If any part of the transaction fails, the entire transaction is rolled back, leaving the database unchanged.</li>
        <li><strong>Consistency</strong>: A transaction transitions the database from one valid state to another, adhering to all constraints, rules, and triggers.</li>
        <li><strong>Isolation</strong>: Transactions execute concurrently without interfering with one another. Intermediate states are invisible to other transactions.</li>
        <li><strong>Durability</strong>: Once committed, transaction results are permanent and survive system failures (written to non-volatile storage).</li>
      </ul>

      <h3>Transaction Isolation Levels</h3>
      <p>Concurrent execution can cause anomalies. Databases define 4 isolation levels to manage this:</p>
      <table>
        <thead>
          <tr>
            <th>Isolation Level</th>
            <th>Dirty Read</th>
            <th>Non-Repeatable Read</th>
            <th>Phantom Read</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Read Uncommitted</strong></td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Read Committed</strong></td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Repeatable Read</strong></td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Serializable</strong></td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h3>Anomalies Explained</h3>
      <ul>
        <li><strong>Dirty Read</strong>: Transaction A reads data modified by Transaction B before B has committed. If B rolls back, A's data is invalid.</li>
        <li><strong>Non-Repeatable Read</strong>: Transaction A reads a row, Transaction B updates that row and commits. When A reads the row again, it has changed.</li>
        <li><strong>Phantom Read</strong>: Transaction A queries rows matching a condition. Transaction B inserts new rows matching that condition and commits. When A queries again, new \"phantom\" rows appear.</li>
      </ul>
    `
  },
  {
    id: "advanced",
    title: "8. Advanced SQL Functions",
    summary: "Explore dynamic pivoting, CASE expressions, working with JSON columns, and database triggers.",
    content: `
      <h3>Conditional Logic: CASE WHEN</h3>
      <p>The <code>CASE</code> expression evaluates conditional statements and returns a value, behaving like an if-else statement in programming languages.</p>
      <pre><code class="language-sql">SELECT employee_name, salary,
       CASE 
           WHEN salary >= 100000 THEN 'High'
           WHEN salary >= 60000 THEN 'Medium'
           ELSE 'Entry'
       END AS salary_tier
FROM employees;</code></pre>

      <h3>Pivoting and Unpivoting</h3>
      <p>Pivoting rotates a table from a state of rows to columns, aggregating data. Unpivoting rotates columns back into rows. Most databases support <code>PIVOT</code> and <code>UNPIVOT</code> syntax directly, or you can achieve pivoting using aggregate functions with conditional filters (<code>SUM(CASE WHEN...)</code>).</p>

      <h3>Handling JSON in SQL</h3>
      <p>Modern RDBMS like PostgreSQL and MySQL support native JSON datatypes. You can extract keys using JSON path operators:</p>
      <ul>
        <li>PostgreSQL: <code>data->>'key'</code> extracts text value, <code>data->'key'</code> extracts JSON object.</li>
        <li>MySQL: <code>JSON_EXTRACT(data, '$.key')</code> or <code>data->'$.key'</code>.</li>
      </ul>

      <h3>Coalesce and Null Handling</h3>
      <ul>
        <li><code>COALESCE(val1, val2, ..., default)</code>: Returns the first non-null expression in its argument list.</li>
        <li><code>NULLIF(val1, val2)</code>: Returns <code>NULL</code> if the two inputs are equal, otherwise returns the first value. Highly useful for avoiding \"Divide by Zero\" errors: <code>amount / NULLIF(quantity, 0)</code>.</li>
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
WHERE w1.temperature > w2.temperature;

-- PostgreSQL syntax alternative
-- ON w1.recordDate = w2.recordDate + INTERVAL '1 day'
-- SQL Server syntax alternative
-- ON w1.recordDate = DATEADD(day, 1, w2.recordDate)`,
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
    schema: `Table: Employee (same as Department Highest Salary)`,
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
    explanation: "If a node's parent ID (p_id) is NULL, it is the 'Root'. If a node's ID is present in the parent column (p_id) of other nodes, it has children and is therefore an 'Inner' node. Otherwise, it is a 'Leaf' node. Note the 'IS NOT NULL' guard in the subquery to ensure correct IN logic."
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
    explanation: "We join the follow table onto itself where the follower of one relation matches the followee of another. This guarantees the user is a second-degree entity. Grouping by followee (who is also a follower) yields their follower count. Sorting is alphabetical."
  },
  {
    id: 21,
    title: "Consecutive Numbers",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Microsoft", "Oracle"],
    problem: "Write a SQL query to find all numbers that appear at least three times consecutively.",
    schema: `Table: Logs
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| num         | int     |
+-------------+---------+`,
    solution: `-- Method 1: Using LEAD/LAG
WITH CheckedNums AS (
    SELECT num,
           LAG(num, 1) OVER(ORDER BY id) AS prev_num,
           LEAD(num, 1) OVER(ORDER BY id) AS next_num
    FROM Logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM CheckedNums
WHERE num = prev_num AND num = next_num;

-- Method 2: Multi-table self-join
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l1.id = l3.id - 2
WHERE l1.num = l2.num AND l1.num = l3.num;`,
    explanation: "Method 1 uses LAG and LEAD in a CTE to get the value of the preceding and succeeding row. If all three values match, it is a consecutive number. Method 2 joins the table with copies representing the next two rows (id + 1 and id + 2) and checks if the values are equal. Method 1 is preferred if ID columns have gaps."
  },
  {
    id: 22,
    title: "Nth Highest Salary",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Google", "Facebook", "Amazon"],
    problem: "Write a SQL query to get the nth highest salary from the Employee table. Return NULL if not found.",
    schema: `Table: Employee (same as Second Highest Salary)`,
    solution: `-- In MySQL/PostgreSQL as a Function
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (
      SELECT DISTINCT salary
      FROM Employee
      ORDER BY salary DESC
      LIMIT 1 OFFSET N
  );
END;`,
    explanation: "We utilize LIMIT 1 OFFSET (N-1) to fetch the Nth highest unique salary after ordering in descending order. Because LIMIT/OFFSET clauses cannot evaluate expressions inside, we declare and subtract 1 from N prior to running the query."
  },
  {
    id: 23,
    title: "Rank Scores",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Meta", "Netflix"],
    problem: "Write a SQL query to rank scores. If there is a tie between two scores, both should have the same ranking. After a tie, the next ranking number should be the next consecutive integer value (i.e. dense ranking).",
    schema: `Table: Scores
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| score       | decimal |
+-------------+---------+`,
    solution: `-- Using DENSE_RANK()
SELECT score,
       DENSE_RANK() OVER(ORDER BY score DESC) AS \`rank\`
FROM Scores;`,
    explanation: "We utilize the built-in DENSE_RANK() window function ordered by score in descending order. Unlike RANK(), DENSE_RANK() ensures that subsequent rank integers increment by exactly 1 without gaps after values tie."
  },
  {
    id: 24,
    title: "Combine Two Tables",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Apple", "LinkedIn"],
    problem: "Write a SQL query to report the first name, last name, city, and state for each person in the Person table. If the address of a personId is not in the Address table, report null.",
    schema: `Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| personId    | int     |
| lastName    | varchar |
| firstName   | varchar |
+-------------+---------+

Table: Address
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| addressId   | int     |
| personId    | int     |
| city        | varchar |
| state       | varchar |
+-------------+---------+`,
    solution: `-- Simple LEFT JOIN
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`,
    explanation: "A LEFT JOIN guarantees that all records from the left table (Person) are retained, regardless of whether a matching personId is found in the right table (Address). Unmatched rows default to NULL for city and state."
  },
  {
    id: 25,
    title: "Find Median Salary",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Google", "Stripe"],
    problem: "Write a SQL query to find the median salary for each company.",
    schema: `Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| company     | varchar |
| salary      | int     |
+-------------+---------+`,
    solution: `-- Using ROW_NUMBER() and COUNT()
WITH RankedSalaries AS (
    SELECT id, company, salary,
           ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn,
           COUNT(*) OVER(PARTITION BY company) AS total_count
    FROM Employee
)
SELECT id, company, salary
FROM RankedSalaries
WHERE rn BETWEEN total_count / 2.0 AND total_count / 2.0 + 1
ORDER BY company, salary;`,
    explanation: "We assign a unique rank to each employee within a company sorted by salary. We also find the total employee count per company. The median rows are those where the rank is within [Total/2, Total/2 + 1]. This works perfectly for both odd and even counts."
  },
  {
    id: 26,
    title: "Top Travellers",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Uber", "Lyft"],
    problem: "Write a SQL query to report the distance travelled by each user. Output should be ordered by travelled_distance desc. If two users travelled the same distance, order them by name asc.",
    schema: `Table: Users
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+

Table: Rides
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| user_id     | int     |
| distance    | int     |
+-------------+---------+`,
    solution: `-- LEFT JOIN with COALESCE to handle 0 distance
SELECT u.name, COALESCE(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;`,
    explanation: "We LEFT JOIN Users and Rides so users who haven't taken any rides are not omitted. SUM(distance) totals a user's mileage. COALESCE ensures users with no rides return 0 rather than NULL. We group by ID and Name to distinguish users sharing identical names."
  },
  {
    id: 27,
    title: "Calculate Special Bonus",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Apple", "Stripe"],
    problem: "Write a SQL query to calculate the bonus of each employee. The bonus of an employee is 100% of their salary if the ID of the employee is an odd number and the employee name does not start with the character 'M'. Otherwise, the bonus is 0.",
    schema: `Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+`,
    solution: `-- Using CASE WHEN and LIKE
SELECT employee_id,
       CASE 
           WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
           ELSE 0
       END AS bonus
FROM Employees
ORDER BY employee_id;`,
    explanation: "The logic evaluates if the employee_id is odd (employee_id % 2 = 1) AND their name does not start with 'M' (name NOT LIKE 'M%'). If both conditions are met, their bonus is equal to their salary; otherwise, it defaults to 0."
  },
  {
    id: 28,
    title: "Group Sold Products By Date",
    difficulty: "Medium",
    category: "Aggregations",
    companies: ["Amazon", "Shopify"],
    problem: "Write a SQL query to find for each date the number of different products sold and their names. The sold product names for each date should be sorted lexicographically and comma-separated.",
    schema: `Table: Activities
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| sell_date   | date    |
| product     | varchar |
+-------------+---------+`,
    solution: `-- In MySQL using GROUP_CONCAT
SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;

-- In PostgreSQL using STRING_AGG
-- SELECT sell_date,
--        COUNT(DISTINCT product) AS num_sold,
--        STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products
-- FROM Activities GROUP BY sell_date ORDER BY sell_date;`,
    explanation: "We group by sell_date, and use COUNT(DISTINCT product) to find the unique counts. For concatenating strings, MySQL uses GROUP_CONCAT while PostgreSQL uses STRING_AGG. We configure these functions to sort alphabetically and delimit strings with a comma."
  },
  {
    id: 29,
    title: "Product Sales Analysis I",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Amazon", "Walmart"],
    problem: "Write a SQL query that reports the product_name, year, and price for each sales_id in the Sales table.",
    schema: `Table: Sales
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| year        | int   |
| quantity    | int   |
| price       | int   |
+-------------+-------+

Table: Product
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
+--------------+---------+`,
    solution: `-- Simple INNER JOIN
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;`,
    explanation: "This is a basic relational lookup query. We join the Sales table to the Product table matching on the product_id column, and select the product name alongside the sales year and transaction price."
  },
  {
    id: 30,
    title: "Product Sales Analysis II",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Amazon", "Costco"],
    problem: "Write a SQL query that reports the total quantity sold per product id.",
    schema: `Table: Sales (same as Product Sales Analysis I)`,
    solution: `-- SUM aggregate with GROUP BY
SELECT product_id, SUM(quantity) AS total_quantity
FROM Sales
GROUP BY product_id;`,
    explanation: "We group the sales records by their product_id, and sum the quantity values in each group to calculate the total units sold for each individual product."
  },
  {
    id: 31,
    title: "Product Sales Analysis III",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Amazon", "Target"],
    problem: "Write a SQL query that selects the product id, year, quantity, and price for the first year of every product sold.",
    schema: `Table: Sales (same as Product Sales Analysis I)`,
    solution: `-- Method 1: Using Subquery
SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
);

-- Method 2: Using RANK() Window Function
WITH RankedSales AS (
    SELECT product_id, year, quantity, price,
           RANK() OVER(PARTITION BY product_id ORDER BY year ASC) as rnk
    FROM Sales
)
SELECT product_id, year AS first_year, quantity, price
FROM RankedSales
WHERE rnk = 1;`,
    explanation: "Method 1 finds the minimum year for each product_id in a subquery, then filters the outer Sales table to match those product-year combinations. Method 2 ranks records chronologically per product, returning all entries ranking at #1 (if there were multiple sales in that first year)."
  },
  {
    id: 32,
    title: "Project Employees I",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Meta", "Accenture"],
    problem: "Write a SQL query that reports the average experience years of all the employees for each project, rounded to 2 decimal places.",
    schema: `Table: Project
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| project_id  | int     |
| employee_id | int     |
+-------------+---------+

Table: Employee
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| employee_id      | int     |
| name             | varchar |
| experience_years | int     |
+------------------+---------+`,
    solution: `-- JOIN, AVG and ROUND
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
    explanation: "We join the Project and Employee tables based on the employee_id, group by project_id, compute the average experience_years of employees within each group, and round the result to two decimal places."
  },
  {
    id: 33,
    title: "Project Employees II",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Meta", "Cognizant"],
    problem: "Write a SQL query that reports all the projects that have the most employees.",
    schema: `Table: Project & Employee (same as Project Employees I)`,
    solution: `-- Method 1: Using HAVING with Max Count Subquery
SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) = (
    SELECT COUNT(employee_id) AS cnt
    FROM Project
    GROUP BY project_id
    ORDER BY cnt DESC
    LIMIT 1
);`,
    explanation: "We group projects by project_id and count their associated employees. The HAVING clause keeps only project groups whose employee count matches the maximum employee count returned by the subquery."
  },
  {
    id: 34,
    title: "Project Employees III",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Meta", "Infosys"],
    problem: "Write a SQL query that reports the most experienced employees in each project. In case of a tie, report all employees with the maximum experience.",
    schema: `Table: Project & Employee (same as Project Employees I)`,
    solution: `-- Using DENSE_RANK window function
WITH RankedEmployees AS (
    SELECT p.project_id, e.employee_id,
           DENSE_RANK() OVER(PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk
    FROM Project p
    JOIN Employee e ON p.employee_id = e.employee_id
)
SELECT project_id, employee_id
FROM RankedEmployees
WHERE rnk = 1;`,
    explanation: "We join Project and Employee, then partition rows by project_id, ranking employees inside each project in descending order of experience_years. Selecting rows ranked equal to 1 returns the most experienced personnel."
  },
  {
    id: 35,
    title: "Reformat Department Table",
    difficulty: "Medium",
    category: "Basics",
    companies: ["Amazon", "Oracle"],
    problem: "Write a SQL query to reformat the table so that there is a department id column and a revenue column for each month.",
    schema: `Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| revenue     | int     |
| month       | varchar |
+-------------+---------+`,
    solution: `-- Dynamic Pivoting using SUM and CASE WHEN
SELECT id,
       SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue,
       SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue,
       SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue,
       SUM(CASE WHEN month = 'Apr' THEN revenue ELSE NULL END) AS Apr_Revenue,
       SUM(CASE WHEN month = 'May' THEN revenue ELSE NULL END) AS May_Revenue,
       SUM(CASE WHEN month = 'Jun' THEN revenue ELSE NULL END) AS Jun_Revenue,
       SUM(CASE WHEN month = 'Jul' THEN revenue ELSE NULL END) AS Jul_Revenue,
       SUM(CASE WHEN month = 'Aug' THEN revenue ELSE NULL END) AS Aug_Revenue,
       SUM(CASE WHEN month = 'Sep' THEN revenue ELSE NULL END) AS Sep_Revenue,
       SUM(CASE WHEN month = 'Oct' THEN revenue ELSE NULL END) AS Oct_Revenue,
       SUM(CASE WHEN month = 'Nov' THEN revenue ELSE NULL END) AS Nov_Revenue,
       SUM(CASE WHEN month = 'Dec' THEN revenue ELSE NULL END) AS Dec_Revenue
FROM Department
GROUP BY id;`,
    explanation: "This rotates month rows into 12 columns. We group by department ID. For each group, we compute conditional aggregates: if the month matches, we retain revenue, else we return NULL. SUM collapses these results into a single row per ID."
  },
  {
    id: 36,
    title: "Active Users (Consecutive Logins)",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Google", "Facebook", "TikTok"],
    problem: "Write a SQL query to find the active users who logged in to their accounts for five or more consecutive days. Return the id and name of these active users.",
    schema: `Table: Accounts
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+

Table: Logins
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| login_date  | date    |
+-------------+---------+`,
    solution: `-- Using Difference of Dates Grouping Technique
WITH UniqueLogins AS (
    SELECT DISTINCT id, login_date 
    FROM Logins
),
GroupedLogins AS (
    SELECT id, login_date,
           ROW_NUMBER() OVER (PARTITION BY id ORDER BY login_date) AS rn
    FROM UniqueLogins
)
SELECT DISTINCT a.id, a.name
FROM GroupedLogins g
JOIN Accounts a ON g.id = a.id
GROUP BY a.id, a.name, DATE_SUB(g.login_date, INTERVAL g.rn DAY)
HAVING COUNT(*) >= 5;`,
    explanation: "First, deduplicate multiple logins on the same day. Second, assign sequential numbers (rn) to logins ordered by date per user. If dates are consecutive, the difference between login_date and rn will be constant. Grouping by user and that date difference (DATE_SUB), we count rows; if the count >= 5, the user logged in for 5+ consecutive days."
  },
  {
    id: 37,
    title: "Monthly Transactions I",
    difficulty: "Medium",
    category: "Aggregations",
    companies: ["Stripe", "PayPal"],
    problem: "Write a SQL query to find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.",
    schema: `Table: Transactions
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| country        | varchar |
| state          | enum    |
| amount         | int     |
| trans_date     | date    |
+----------------+---------+`,
    solution: `-- Conditional aggregation with GROUP BY
SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(id) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,
    explanation: "We extract the year and month string from trans_date. We group results by month and country. Using conditional SUM logic, we count and total only the transactions where the status state equals 'approved'."
  },
  {
    id: 38,
    title: "Monthly Transactions II",
    difficulty: "Hard",
    category: "Joins",
    companies: ["Stripe", "Adyen"],
    problem: "Write a SQL query to find for each month and country, the number of approved transactions and their total amount, the number of chargebacks and their total amount.",
    schema: `Table: Transactions (same as Monthly Transactions I)

Table: Chargebacks
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| trans_id       | int     |
| trans_date     | date    |
+----------------+---------+`,
    solution: `-- UNION transaction events and aggregate
WITH Events AS (
    SELECT country, amount, 
           DATE_FORMAT(trans_date, '%Y-%m') AS month, 
           'approved' AS type
    FROM Transactions
    WHERE state = 'approved'
    UNION ALL
    SELECT t.country, t.amount, 
           DATE_FORMAT(c.trans_date, '%Y-%m') AS month, 
           'chargeback' AS type
    FROM Chargebacks c
    JOIN Transactions t ON c.trans_id = t.id
)
SELECT month, country,
       SUM(CASE WHEN type = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(CASE WHEN type = 'approved' THEN amount ELSE 0 END) AS approved_amount,
       SUM(CASE WHEN type = 'chargeback' THEN 1 ELSE 0 END) AS chargeback_count,
       SUM(CASE WHEN type = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount
FROM Events
GROUP BY month, country;`,
    explanation: "We construct a CTE called Events that unions approved transactions and chargebacks, standardizing dates. Approved events come from Transactions. Chargeback events join Chargebacks with Transactions to retrieve the country and amount. Finally, we group by month and country, using conditional SUM aggregates."
  },
  {
    id: 39,
    title: "Immediate Food Delivery I",
    difficulty: "Easy",
    category: "Basics",
    companies: ["DoorDash", "UberEats"],
    problem: "If the customer's preferred delivery date is the same as the order date, the order is called immediate; otherwise, it is scheduled. Write a SQL query to find the percentage of immediate orders, rounded to 2 decimal places.",
    schema: `Table: Delivery
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+`,
    solution: `-- SUM aggregate conditional check divided by total count
SELECT ROUND(
    SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
    2
) AS immediate_percentage
FROM Delivery;`,
    explanation: "We compare order_date and customer_pref_delivery_date. If they are equal, it counts as 1, else 0. We sum these up to get immediate order counts, multiply by 100 to get percentage scale, divide by the total row count (COUNT(*)), and round to 2 decimal places."
  },
  {
    id: 40,
    title: "Immediate Food Delivery II",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["DoorDash", "Instacart"],
    problem: "Write a SQL query to find the percentage of immediate orders among the first orders of all customers, rounded to 2 decimal places.",
    schema: `Table: Delivery (same as Immediate Food Delivery I)`,
    solution: `-- Subquery filtering for first orders
SELECT ROUND(
    SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
    2
) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);`,
    explanation: "First, we filter the dataset to include only the first order for each customer. We do this by verifying that the customer_id and order_date exist in the subquery result containing MIN(order_date) grouped by customer_id. We then perform the identical percentage calculation on this filtered set."
  },
  {
    id: 41,
    title: "Last Person to Fit in the Bus",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Uber", "Lyft"],
    problem: "There is a queue of people waiting to board a bus. However, the bus has a weight limit of 1000 kgs. Write a SQL query to find the person_name of the last person that can fit on the bus without exceeding the limit.",
    schema: `Table: Queue
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| person_name | varchar |
| weight      | int     |
| turn        | int     |
+-------------+---------+`,
    solution: `-- Using cumulative weight window function
WITH RunningWeights AS (
    SELECT person_name, turn,
           SUM(weight) OVER(ORDER BY turn) AS cumulative_weight
    FROM Queue
)
SELECT person_name
FROM RunningWeights
WHERE cumulative_weight <= 1000
ORDER BY turn DESC
LIMIT 1;`,
    explanation: "We use a CTE to calculate the cumulative sum of weights ordered by the boarding turn. In the outer query, we filter for rows where cumulative_weight is less than or equal to 1000. Sorting descending by turn and selecting the first row yields the last passenger who successfully boarded."
  },
  {
    id: 42,
    title: "Number of Comments per Post",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Facebook", "Reddit"],
    problem: "Write a SQL query to find the number of comments per post. The table may contain duplicate submissions or sub-comments; you must filter unique comments.",
    schema: `Table: Submissions
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| sub_id        | int     |
| parent_id     | int     |
+---------------+---------+`,
    solution: `-- Self join with distinct counts
SELECT p.sub_id AS post_id,
       COUNT(DISTINCT c.sub_id) AS number_of_comments
FROM Submissions p
LEFT JOIN Submissions c ON p.sub_id = c.parent_id
WHERE p.parent_id IS NULL
GROUP BY p.sub_id
ORDER BY post_id;`,
    explanation: "Submissions with parent_id IS NULL are posts. We self-join the table: matching parent post (p) to child comment (c) on parent_id = sub_id. We aggregate by p.sub_id and calculate the count of distinct comment IDs to prevent duplicate count errors."
  },
  {
    id: 43,
    title: "List Products Ordered in a Period",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Amazon", "Target"],
    problem: "Write a SQL query to get the names of products that have at least 100 units ordered in February 2020 and their amount.",
    schema: `Table: Products
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| product_category| varchar |
+---------------+---------+

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| order_date    | date    |
| unit          | int     |
+---------------+---------+`,
    solution: `-- Joins with date filters and HAVING
SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
    explanation: "We join the Products and Orders tables, filter for orders placed in February 2020, and group by product. Finally, the HAVING clause filters out products that did not achieve a combined unit count of 100 or more during this month."
  },
  {
    id: 44,
    title: "Find Users With Valid E-Mails",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Meta"],
    problem: "Write a SQL query to find the users who have valid emails. A valid email has a prefix name and a domain. Prefix name starts with a letter and can contain letters, digits, underscore, period, and/or dash. Domain must be '@leetcode.com'.",
    schema: `Table: Users
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| name          | varchar |
| mail          | varchar |
+---------------+---------+`,
    solution: `-- Using Regular Expressions (MySQL / PostgreSQL)
SELECT user_id, name, mail
FROM Users
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode\\\\.com$';`,
    explanation: "We use a regular expression (REGEXP operator) to validate the email format. The regex pattern breaks down as follows: '^' anchors start, '[a-zA-Z]' matches a starting letter, '[a-zA-Z0-9_.-]*' matches zero or more valid characters in the prefix, and '@leetcode\\\\.com$' asserts the email ends with exactly '@leetcode.com'."
  },
  {
    id: 45,
    title: "Swap Salary",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Microsoft"],
    problem: "Write a SQL query to swap all 'f' and 'm' values (i.e. change f to m and vice versa) with a single update statement and no intermediate temp tables.",
    schema: `Table: Salary
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| name        | varchar  |
| sex         | char(1)  |
| salary      | int      |
+-------------+----------+`,
    solution: `-- Single UPDATE with CASE WHEN
UPDATE Salary
SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;`,
    explanation: "We execute an UPDATE statement. Instead of setting a static value, we use a CASE expression. If sex is 'm', we assign 'f'; otherwise, we assign 'm'. This dynamically swaps all genders in a single query pass."
  },
  {
    id: 46,
    title: "Actors and Directors Three Times",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Netflix", "Amazon Prime"],
    problem: "Write a SQL query to find all actors and directors who cooperated together at least three times.",
    schema: `Table: ActorDirector
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| actor_id    | int     |
| director_id | int     |
| timestamp   | int     |
+-------------+---------+`,
    solution: `-- Grouping by two columns
SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(timestamp) >= 3;`,
    explanation: "We group rows by both actor_id and director_id. This isolates each unique actor-director pairing. The HAVING clause counts their collaborations (using timestamp or count(*)) and keeps pairs with 3 or more entries."
  },
  {
    id: 47,
    title: "Sales Person",
    difficulty: "Easy",
    category: "Joins",
    companies: ["Google", "Salesforce"],
    problem: "Write a SQL query to report the names of all the salespersons who did not have any orders related to the company with the name 'RED'.",
    schema: `Table: SalesPerson, Company, Orders (Linked via IDs)`,
    solution: `-- Using NOT IN subquery
SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id
    FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);`,
    explanation: "First, the subquery joins Orders and Company to identify all sales_id keys linked to orders placed by the company 'RED'. The outer query then selects salespersons whose IDs do not exist within that list."
  },
  {
    id: 48,
    title: "Sales Analysis I",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Amazon", "Shopify"],
    problem: "Write a SQL query that reports the best seller by total sales price; if there is a tie, report all seller_ids.",
    schema: `Table: Product & Sales (Linked via product_id)`,
    solution: `-- HAVING with Max Price aggregation subquery
SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT SUM(price) AS total
    FROM Sales
    GROUP BY seller_id
    ORDER BY total DESC
    LIMIT 1
);`,
    explanation: "We group Sales by seller_id, totaling their generated revenue using SUM(price). The HAVING clause compares each seller's aggregate against a subquery that retrieves the single maximum seller revenue value in the table."
  },
  {
    id: 49,
    title: "Sales Analysis II",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Amazon", "eBay"],
    problem: "Write a SQL query that reports the buyers who bought S8 but not iPhone.",
    schema: `Table: Product & Sales`,
    solution: `-- Conditional aggregation filters
SELECT s.buyer_id
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
GROUP BY s.buyer_id
HAVING SUM(CASE WHEN p.product_name = 'S8' THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN p.product_name = 'iPhone' THEN 1 ELSE 0 END) = 0;`,
    explanation: "We join sales with products and group by buyer_id. In the HAVING clause, we use conditional counts: we ensure the buyer has purchased 'S8' (sum > 0) AND has never purchased 'iPhone' (sum = 0)."
  },
  {
    id: 50,
    title: "Sales Analysis III",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Amazon", "Stripe"],
    problem: "Write a SQL query that reports the products that were only sold in the first quarter of 2019.",
    schema: `Table: Product & Sales`,
    solution: `-- Group by with min/max date checks
SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' 
   AND MAX(s.sale_date) <= '2019-03-31';`,
    explanation: "We join the tables and group by product. The HAVING clause guarantees that the earliest sale date (MIN) is on or after January 1, 2019, and the latest sale date (MAX) is on or before March 31, 2019. If any sale occurred outside this window, the product is filtered out."
  },
  {
    id: 51,
    title: "User Activity 30 Days I",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Meta"],
    problem: "Write a SQL query to find the daily active user count for a period of 30 days ending 2019-07-27 inclusively. A user was active on someday if they made at least one activity on that day.",
    schema: `Table: Activity
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| session_id    | int     |
| activity_date | date    |
| activity_type | enum    |
+---------------+---------+`,
    solution: `-- Grouping by Date with active user distinct count
SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'
GROUP BY activity_date;`,
    explanation: "We filter transactions using a WHERE clause to isolate dates in the 30-day window ending on July 27, 2019. Grouping by activity_date, we calculate COUNT(DISTINCT user_id) to count unique active users per day."
  },
  {
    id: 52,
    title: "User Activity 30 Days II",
    difficulty: "Easy",
    category: "Aggregations",
    companies: ["Google", "Meta"],
    problem: "Write a SQL query to find the average number of sessions per user for a period of 30 days ending 2019-07-27 inclusively, rounded to 2 decimal places.",
    schema: `Table: Activity (same as User Activity 30 Days I)`,
    solution: `-- Subquery count divided by distinct users
SELECT ROUND(
    COALESCE(
        COUNT(DISTINCT session_id) / COUNT(DISTINCT user_id), 
        0
    ), 
    2
) AS average_sessions_per_user
FROM Activity
WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27';`,
    explanation: "We filter activities within the 30-day date range. We count total unique session IDs and divide by total unique user IDs to find the average sessions per user, rounding to 2 decimal places. COALESCE protects against division issues if no records match."
  },
  {
    id: 53,
    title: "Article Views I",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Amazon"],
    problem: "Write a SQL query to find all the authors that viewed at least one of their own articles, sorted in ascending order by their id.",
    schema: `Table: Views
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| article_id    | int     |
| author_id     | int     |
| viewer_id     | int     |
| view_date     | date    |
+---------------+---------+`,
    solution: `-- Comparing columns and sorting
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id ASC;`,
    explanation: "An author views their own article when author_id is equal to viewer_id. We select those rows, apply DISTINCT to remove duplicates, and sort the IDs in ascending order."
  },
  {
    id: 54,
    title: "Article Views II",
    difficulty: "Medium",
    category: "Aggregations",
    companies: ["Google", "Baidu"],
    problem: "Write a SQL query to find all the users who viewed more than one article on the same date, sorted in ascending order by their id.",
    schema: `Table: Views (same as Article Views I)`,
    solution: `-- Grouping by user and date
SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY viewer_id, view_date
HAVING COUNT(DISTINCT article_id) > 1
ORDER BY id ASC;`,
    explanation: "We group the view logs by both viewer_id and view_date. Within each group, we compute COUNT(DISTINCT article_id). If a user viewed more than one distinct article on a single day, they are selected. We apply DISTINCT in the outer query to handle users who met this condition on multiple dates."
  },
  {
    id: 55,
    title: "Market Analysis I",
    difficulty: "Medium",
    category: "Joins",
    companies: ["MercadoLibre", "eBay"],
    problem: "Write a SQL query to find for each user, the join date and the number of orders they made as a buyer in 2019.",
    schema: `Table: Users, Orders, Items (Linked via IDs)`,
    solution: `-- LEFT JOIN with conditional filters
SELECT u.user_id AS buyer_id, 
       u.join_date, 
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019
GROUP BY u.user_id, u.join_date;`,
    explanation: "We LEFT JOIN Users and Orders. Crucially, the order year filter (YEAR(order_date) = 2019) must be placed in the JOIN's ON clause, not the WHERE clause. If placed in the WHERE clause, users with zero orders in 2019 would be excluded. Grouping by ID gives us correct counts."
  },
  {
    id: 56,
    title: "Customer Order Frequency",
    difficulty: "Medium",
    category: "Joins",
    companies: ["Amazon", "Target"],
    problem: "Write a SQL query to report the customer_id and name of customers who have spent at least $100 in both June and July 2020.",
    schema: `Table: Customers, Product, Orders (Linked)`,
    solution: `-- JOIN and HAVING with conditional spending checks
SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Product p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN o.order_date LIKE '2020-06%' THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN o.order_date LIKE '2020-07%' THEN o.quantity * p.price ELSE 0 END) >= 100;`,
    explanation: "We join the three tables to calculate transaction prices. We group by customer. In the HAVING clause, we calculate total spending for June 2020 and July 2020 separately. Only customers whose totals are both >= 100 are returned."
  },
  {
    id: 57,
    title: "Employees Whose Manager Left",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Oracle", "Cisco"],
    problem: "Write a SQL query to report the IDs of the employees whose salary is strictly less than $30000 and whose manager left the company (i.e. managerId is not present in Employee table). Sort by ID.",
    schema: `Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| manager_id  | int     |
| salary      | int     |
+-------------+---------+`,
    solution: `-- Filtering with NOT IN
SELECT employee_id
FROM Employees
WHERE salary < 30000
  AND manager_id IS NOT NULL
  AND manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY employee_id;`,
    explanation: "We query employees making less than $30,000. To check if a manager left, we ensure manager_id is not null, and use NOT IN to confirm their manager's ID does not exist in the active employee_id column. We sort ascending."
  },
  {
    id: 58,
    title: "Top Percentile Salaries",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Google", "Meta", "Bloomberg"],
    problem: "Write a SQL query to find the employees whose salary is in the top 10 percentile of their department. Sort by department and salary.",
    schema: `Table: Employee (same as Department Highest Salary)`,
    solution: `-- Using PERCENT_RANK() window function
WITH SalaryPercentiles AS (
    SELECT e.name AS Employee, e.salary AS Salary, e.departmentId,
           PERCENT_RANK() OVER(PARTITION BY e.departmentId ORDER BY e.salary ASC) AS pr
    FROM Employee e
)
SELECT d.name AS Department, s.Employee, s.Salary
FROM SalaryPercentiles s
JOIN Department d ON s.departmentId = d.id
WHERE s.pr >= 0.9
ORDER BY Department, Salary DESC;`,
    explanation: "We calculate percentiles using PERCENT_RANK() partitioned by department, sorting salary in ascending order. This ranks salaries from 0.0 (lowest) to 1.0 (highest). To get the top 10 percentile, we filter for percentiles >= 0.9."
  },
  {
    id: 59,
    title: "Friend Requests I: Acceptance Rate",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Meta", "LinkedIn"],
    problem: "Write a SQL query to find the overall acceptance rate of friend requests, rounded to 2 decimal places. Acceptance rate is (total accepted requests) / (total requests).",
    schema: `Table: FriendRequest & RequestAccepted`,
    solution: `-- Distinct counts division
SELECT ROUND(
    COALESCE(
        (SELECT COUNT(DISTINCT sender_id, send_to_id) FROM RequestAccepted) /
        (SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest) * 100, 
        0
    ), 
    2
) AS accept_rate;`,
    explanation: "We calculate distinct sender-receiver pairs in both tables to avoid duplicate logs. We divide the count of accepted requests by the count of sent requests, multiply by 100, and round. COALESCE outputs 0 if the sent requests subquery is empty."
  },
  {
    id: 60,
    title: "Friend Requests II: Most Friends",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Meta", "LinkedIn"],
    problem: "Write a SQL query to find the people who have the most friends and the most friends count. The result format should list the user ID and their count of friends.",
    schema: `Table: RequestAccepted
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| requester_id| int     |
| accepter_id | int     |
| accept_date | date    |
+-------------+---------+`,
    solution: `-- Union requester and accepter columns and aggregate
WITH AllFriendships AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT id, COUNT(id) AS num
FROM AllFriendships
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
    explanation: "A friendship consists of two IDs: a requester and an accepter. We use UNION ALL to compile all IDs into a single column. Grouping by ID and counting occurrences calculates friend counts. We sort descending and apply LIMIT 1."
  },
  {
    id: 61,
    title: "Invested in 2016 (Insurance)",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Allstate", "Progressive"],
    problem: "Write a SQL query to report the sum of all total investment values in 2016 (tiv_2016) for all policyholders who: (1) have the same tiv_2015 value as one or more other policyholders, and (2) are not located in the same city as any other policyholder (lat, lon unique). Round to 2 decimal places.",
    schema: `Table: Insurance
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| pid         | int     |
| tiv_2015    | decimal |
| tiv_2016    | decimal |
| lat         | decimal |
| lon         | decimal |
+-------------+---------+`,
    solution: `-- Method 1: Using Window COUNT() functions
WITH CheckedInsurance AS (
    SELECT tiv_2016,
           COUNT(*) OVER(PARTITION BY tiv_2015) AS count_2015,
           COUNT(*) OVER(PARTITION BY lat, lon) AS count_location
    FROM Insurance
)
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM CheckedInsurance
WHERE count_2015 > 1 AND count_location = 1;`,
    explanation: "We use a CTE to calculate window aggregates: count_2015 counts policyholders sharing a tiv_2015 value, and count_location counts those sharing coordinates. In the outer query, we filter for policyholders where count_2015 > 1 AND count_location = 1, and sum their tiv_2016 values."
  },
  {
    id: 62,
    title: "Median Employee Salary",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Google", "Stripe"],
    problem: "Write a SQL query to find the median salary of each company. (Same query as Q25, structured for validation).",
    schema: `Table: Employee (same as Find Median Salary)`,
    solution: `-- Using ROW_NUMBER() and COUNT() OVER
WITH Ranked AS (
    SELECT id, company, salary,
           ROW_NUMBER() OVER(PARTITION BY company ORDER BY salary, id) AS rn,
           COUNT(*) OVER(PARTITION BY company) AS cnt
    FROM Employee
)
SELECT id, company, salary
FROM Ranked
WHERE rn BETWEEN cnt / 2.0 AND cnt / 2.0 + 1
ORDER BY company, salary;`,
    explanation: "This assigns sequential row numbers within each company ordered by salary. The median rows are those where the row number lies in the range [cnt/2, cnt/2 + 1], which dynamically accommodates both odd and even sample sizes."
  },
  {
    id: 63,
    title: "Find Cumulative Salary",
    difficulty: "Hard",
    category: "Window Functions",
    companies: ["Microsoft", "Oracle"],
    problem: "Write a SQL query to calculate the cumulative salary summary of every employee, excluding the most recent month. For each month, sum the salary of that month and the previous two months.",
    schema: `Table: Employee
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| month       | int  |
| salary      | int  |
+-------------+------+`,
    solution: `-- Using Window Frames with ROWS exclusion
WITH ExcludeRecent AS (
    SELECT id, month, salary,
           MAX(month) OVER(PARTITION BY id) AS max_month
    FROM Employee
)
SELECT id, month,
       SUM(salary) OVER(
           PARTITION BY id 
           ORDER BY month 
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS Salary
FROM ExcludeRecent
WHERE month < max_month
ORDER BY id ASC, month DESC;`,
    explanation: "First, we use a window function to find each employee's most recent month. In the outer query, we filter out those months. We calculate a running total using SUM(salary) with a window frame spanning '2 PRECEDING AND CURRENT ROW' (totaling the current month plus the previous two months)."
  },
  {
    id: 64,
    title: "Game Play Analysis IV",
    difficulty: "Medium",
    category: "Subqueries",
    companies: ["Tencent", "Epic Games"],
    problem: "Write a SQL query to report the fraction of players that logged in again on the day after the day they first logged in, rounded to 2 decimal places.",
    schema: `Table: Activity (same as Game Play Analysis I)`,
    solution: `-- Self join of logins on min date + 1 day
WITH FirstLogins AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM Activity
    GROUP BY player_id
)
SELECT ROUND(
    COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 
    2
) AS fraction
FROM Activity a
JOIN FirstLogins f ON a.player_id = f.player_id
WHERE a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);`,
    explanation: "We identify the first login date for each player in a CTE. We join this CTE back to the main Activity table, filtering for rows where a player logged in exactly one day after their first date. Dividing this count by the total unique player count gives the fraction."
  },
  {
    id: 65,
    title: "Trips and Users",
    difficulty: "Hard",
    category: "Joins",
    companies: ["Uber", "Lyft", "Grab"],
    problem: "Write a SQL query to find the cancellation rate of requests with unbanned users (both client and driver must not be banned) each day between '2013-10-01' and '2013-10-03'. Round to 2 decimal places.",
    schema: `Table: Trips, Users`,
    solution: `-- Joins with double unbanned verification
SELECT t.request_at AS Day,
       ROUND(
           SUM(CASE WHEN t.status LIKE 'cancelled%' THEN 1 ELSE 0 END) / COUNT(*), 
           2
       ) AS \`Cancellation Rate\`
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;`,
    explanation: "We query trips within the date range, joining the Users table twice to verify that both the client (c) and driver (d) are unbanned (banned = 'No'). We group by request date and calculate the cancellation percentage by dividing cancelled trips by total trips."
  },
  {
    id: 66,
    title: "Shortest Distance in Plane",
    difficulty: "Medium",
    category: "Basics",
    companies: ["Google", "Lyft"],
    problem: "Write a SQL query to find the shortest distance between any two points from the Point2D table, rounded to 2 decimal places.",
    schema: `Table: Point2D
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
+-------------+------+`,
    solution: `-- Self join checking coordinates
SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1
JOIN Point2D p2 ON p1.x <> p2.x OR p1.y <> p2.y;`,
    explanation: "We do a self-join of Point2D to compute the Euclidean distance between every unique pair of points using SQRT(POW(x1-x2, 2) + POW(y1-y2, 2)). The join condition (p1.x <> p2.x OR p1.y <> p2.y) prevents points from pairing with themselves. MIN retrieves the shortest distance."
  },
  {
    id: 67,
    title: "Shortest Distance in Line",
    difficulty: "Easy",
    category: "Basics",
    companies: ["Google", "Uber"],
    problem: "Write a SQL query to find the shortest distance between any two points in the Point1D table.",
    schema: `Table: Point1D
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
+-------------+------+`,
    solution: `-- Self join on greater value
SELECT MIN(p1.x - p2.x) AS shortest
FROM Point1D p1
JOIN Point1D p2 ON p1.x > p2.x;`,
    explanation: "We self-join Point1D. By filtering for rows where p1.x > p2.x, we pair points without checking them twice or comparing a point to itself. Finding the minimum difference (p1.x - p2.x) yields the shortest distance."
  },
  {
    id: 68,
    title: "User Login Intervals",
    difficulty: "Medium",
    category: "Window Functions",
    companies: ["Slack", "Teams", "Google"],
    problem: "Write a SQL query to calculate the session duration for users. A session is defined as active logins where the interval between consecutive logins is less than 30 minutes.",
    schema: `Table: Logins (user_id, login_time)`,
    solution: `-- Session grouping using LAG and cumulative sum
WITH SessionBreaks AS (
    SELECT user_id, login_time,
           LAG(login_time) OVER(PARTITION BY user_id ORDER BY login_time) AS prev_login
    FROM Logins
),
SessionIds AS (
    SELECT user_id, login_time,
           SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, prev_login, login_time) >= 30 THEN 1 ELSE 0 END) 
           OVER(PARTITION BY user_id ORDER BY login_time) AS session_id
    FROM SessionBreaks
)
SELECT user_id, session_id,
       MIN(login_time) AS session_start,
       MAX(login_time) AS session_end,
       TIMESTAMPDIFF(MINUTE, MIN(login_time), MAX(login_time)) AS duration_minutes
FROM SessionIds
GROUP BY user_id, session_id;`,
    explanation: "First, we get each user's previous login time using LAG. Second, we flag logins spaced 30+ minutes apart, and calculate a running total of those flags to assign unique session IDs. Finally, we group by user and session ID, calculating durations."
  },
  {
    id: 69,
    title: "Top K Search Queries",
    difficulty: "Medium",
    category: "Aggregations",
    companies: ["Google", "Yahoo", "Bing"],
    problem: "Write a SQL query to retrieve the top 3 search queries by volume for each date. In case of ties, order query alphabetically.",
    schema: `Table: SearchLogs (query, search_date, search_volume)`,
    solution: `-- Ranking queries per day with DENSE_RANK
WITH DailyRanks AS (
    SELECT search_date, query, SUM(search_volume) AS total_volume,
           DENSE_RANK() OVER(
               PARTITION BY search_date 
               ORDER BY SUM(search_volume) DESC, query ASC
           ) AS rnk
    FROM SearchLogs
    GROUP BY search_date, query
)
SELECT search_date, query, total_volume
FROM DailyRanks
WHERE rnk <= 3
ORDER BY search_date DESC, rnk ASC;`,
    explanation: "We group searches by date and query to calculate total search volume. We apply DENSE_RANK() partitioned by search_date, ordering by volume descending and query ascending. The outer query selects ranks 1, 2, and 3."
  },
  {
    id: 70,
    title: "User Retention Rate (Cohort Analysis)",
    difficulty: "Hard",
    category: "Joins",
    companies: ["Meta", "Amazon", "Netflix"],
    problem: "Write a SQL query to calculate the Month-over-Month cohort retention rate. Calculate the percentage of users active in month M who also performed an action in month M+1.",
    schema: `Table: UserActivity (user_id, activity_date)`,
    solution: `-- Self join on month interval
WITH MonthlyActiveUsers AS (
    SELECT DISTINCT user_id,
           DATE_FORMAT(activity_date, '%Y-%m-01') AS active_month
    FROM UserActivity
)
SELECT m1.active_month AS cohort_month,
       COUNT(DISTINCT m1.user_id) AS active_users,
       COUNT(DISTINCT m2.user_id) AS retained_users,
       ROUND(COUNT(DISTINCT m2.user_id) * 100.0 / COUNT(DISTINCT m1.user_id), 2) AS retention_rate
FROM MonthlyActiveUsers m1
LEFT JOIN MonthlyActiveUsers m2 
  ON m1.user_id = m2.user_id 
  AND m2.active_month = DATE_ADD(m1.active_month, INTERVAL 1 MONTH)
GROUP BY m1.active_month
ORDER BY cohort_month;`,
    explanation: "First, we convert activity dates to month starting dates and deduplicate users per month. Second, we LEFT JOIN this dataset with itself on the condition that the user is the same and month m2 is exactly 1 month after m1. Finally, we count active and retained users per month to calculate retention rates."
  }
];

const BEGINNER_MISTAKES = [
  {
    title: "Using SELECT * in Production",
    desc: "Fetching all columns from a table is a major anti-pattern. It increases network payload, increases database I/O, prevents the query optimizer from using covering indexes, and can break application code if table schemas are modified.",
    bad: `SELECT * FROM employees WHERE department_id = 5;`,
    good: `SELECT employee_id, first_name, salary \nFROM employees \nWHERE department_id = 5;`
  },
  {
    title: "Aggregating without GROUP BY columns",
    desc: "A common beginner error is selecting non-aggregated columns alongside aggregated ones without including them in the GROUP BY clause. In strict SQL databases (PostgreSQL/SQL Server), this generates a syntax error. In older MySQL configurations, it returns random rows.",
    bad: `SELECT department_id, employee_name, AVG(salary) \nFROM employees;`,
    good: `SELECT department_id, AVG(salary) \nFROM employees \nGROUP BY department_id;`
  },
  {
    title: "Filtering Grouped Data inside WHERE",
    desc: "The WHERE clause cannot filter aggregate values (like SUM, COUNT, AVG) because it executes before grouping occurs. Attempting to do so results in a syntax error. To filter aggregates, you must use the HAVING clause.",
    bad: `SELECT department_id, COUNT(*) \nFROM employees \nWHERE COUNT(*) > 10 \nGROUP BY department_id;`,
    good: `SELECT department_id, COUNT(*) \nFROM employees \nGROUP BY department_id \nHAVING COUNT(*) > 10;`
  },
  {
    title: "Comparing values directly to NULL",
    desc: "In SQL, NULL represents an 'unknown' state. It is not equal to anything, not even itself. Comparing NULL using the equal sign (= NULL) or not equal sign (<> NULL) returns UNKNOWN, making the query return zero rows. Always use IS NULL or IS NOT NULL.",
    bad: `SELECT employee_name \nFROM employees \nWHERE manager_id = NULL;`,
    good: `SELECT employee_name \nFROM employees \nWHERE manager_id IS NULL;`
  },
  {
    title: "Writing Non-Sargable WHERE Clauses",
    desc: "Wrapping indexed columns inside functions (e.g. YEAR(), LOWER(), CONCAT()) prevents the database optimizer from using indexes, forcing a slow full-table scan. Write conditions that keep the indexed column raw.",
    bad: `SELECT employee_id \nFROM employees \nWHERE YEAR(hire_date) = 2023;`,
    good: `SELECT employee_id \nFROM employees \nWHERE hire_date >= '2023-01-01' \n  AND hire_date < '2024-01-01';`
  },
  {
    title: "Using NOT IN with Subqueries containing NULLs",
    desc: "If a NOT IN subquery returns even a single NULL value, the entire outer query evaluates to empty (zero rows) due to SQL's three-valued logic. Use NOT EXISTS, a LEFT JOIN, or filter out NULLs in the subquery.",
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
      "<strong>Clarify NULL behavior</strong>: How should we handle <code>NULL</code> values in columns? Should they be ignored or replaced with a default value (e.g., using <code>COALESCE</code>)?",
      "<strong>Inquire about ties</strong>: For ranking problems, if there is a tie, how should we rank them? (e.g. <code>RANK()</code>, <code>DENSE_RANK()</code>, or <code>ROW_NUMBER()</code>)?"
    ]
  },
  {
    category: "2. Structuring Your Response",
    tips: [
      "<strong>State your approach aloud</strong>: Explain the logical steps of your query (e.g. 'First, I will group by user ID, then I'll filter using a window function...').",
      "<strong>Break down complex queries with CTEs</strong>: Instead of writing giant nested subqueries, write clean, modular Common Table Expressions (CTEs). It shows clean coding habits.",
      "<strong>Write standard ANSI SQL</strong>: Stick to standard PostgreSQL or MySQL syntax unless the interviewer specifies a specific flavor."
    ]
  },
  {
    category: "3. Handling Edge Cases",
    tips: [
      "<strong>Zero rows/Empty tables</strong>: Think about what happens if the tables are empty. Will your aggregate functions handle it gracefully?",
      "<strong>Employees with no departments</strong>: When performing joins, make sure you use the correct type. If an employee doesn't have a department, does an <code>INNER JOIN</code> accidentally drop them? (Use <code>LEFT JOIN</code>).",
      "<strong>Timezone & Dates</strong>: Be careful with date operations. Ensure you don't do string comparison on date types."
    ]
  },
  {
    category: "4. Query Performance Discussion",
    tips: [
      "<strong>Be ready to talk index design</strong>: If asked to optimize a query, suggest indexes on columns used in <code>JOIN</code>, <code>WHERE</code>, and <code>ORDER BY</code>.",
      "<strong>Suggest CTEs vs Subqueries</strong>: Explain that CTEs are good for readability, but in some databases, they are materialized and might run slower than optimized subqueries.",
      "<strong>Explain execution order</strong>: Show off your knowledge of how SQL queries execute logically: <code>FROM/JOIN</code> -> <code>WHERE</code> -> <code>GROUP BY</code> -> <code>HAVING</code> -> <code>SELECT</code> -> <code>DISTINCT</code> -> <code>ORDER BY</code> -> <code>LIMIT/OFFSET</code>."
    ]
  }
];

// Exporting so that other scripts can import if needed, or simply keeping them global for standard inline script execution.
window.SQL_TOPICS = SQL_TOPICS;
window.SQL_QUESTIONS = SQL_QUESTIONS;
window.BEGINNER_MISTAKES = BEGINNER_MISTAKES;
window.INTERVIEW_TIPS = INTERVIEW_TIPS;
