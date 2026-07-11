
const MOCK_DB = {
  departments: [
    { dept_id: 1, dept_name: "Engineering", location: "San Francisco" },
    { dept_id: 2, dept_name: "Product Management", location: "New York" }
  ],
  employees: [
    { emp_id: 101, first_name: "Alice", last_name: "Smith", dept_id: 1, salary: 125000, hire_date: "2021-03-15" },
    { emp_id: 102, first_name: "Bob", last_name: "Johnson", dept_id: 1, salary: 98000, hire_date: "2022-06-01" },
    { emp_id: 103, first_name: "Carol", last_name: "Danvers", dept_id: 2, salary: 135000, hire_date: "2020-01-10" }
  ]
};
function executeMockQuery(queryStr, db) {
  let sql = queryStr.replace(/\s+/g, " ").trim();
  if (sql.endsWith(";")) sql = sql.slice(0, -1).trim();
  if (!sql.toUpperCase().startsWith("SELECT")) {
    throw new Error("Only SELECT queries are supported");
  }
  const selectRegex = /^SELECT\s+(.*?)\s+FROM\s+(.*?)(?:\s+JOIN\s+(.*?)\s+ON\s+(.*?))?(?:\s+WHERE\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i;
  const match = sql.match(selectRegex);
  if (!match) {
    throw new Error("Could not parse query structure.");
  }
  const selectClause = match[1].trim();
  const primaryTableClause = match[2].trim();
  const joinTableClause = match[3] ? match[3].trim() : null;
  const joinConditionClause = match[4] ? match[4].trim() : null;
  const whereClause = match[5] ? match[5].trim() : null;
  const orderByClause = match[6] ? match[6].trim() : null;
  const limitClause = match[7] ? match[7].trim() : null;
  console.log("Parsed Elements:");
  console.log("  SELECT:", selectClause);
  console.log("  FROM:", primaryTableClause);
  console.log("  JOIN:", joinTableClause);
  console.log("  ON:", joinConditionClause);
  console.log("  WHERE:", whereClause);
  console.log("  ORDER BY:", orderByClause);
  console.log("  LIMIT:", limitClause);
  const parseTableAndAlias = (clause) => {
    const parts = clause.split(/\s+/);
    return { tableName: parts[0].toLowerCase(), alias: parts[1] || parts[0] };
  };
  const primaryTable = parseTableAndAlias(primaryTableClause);
  let workingData = db[primaryTable.tableName].map(row => {
    const newRow = {};
    for (let key in row) newRow[`${primaryTable.alias}.${key}`] = row[key];
    return newRow;
  });
  if (joinTableClause) {
    const joinTable = parseTableAndAlias(joinTableClause);
    const condParts = joinConditionClause.split("=");
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
    if (!opMatch) throw new Error("WHERE parsing failed");
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
      if (operator === ">") return parsedRowVal > parsedValStr;
      if (operator === "<") return parsedRowVal < parsedValStr;
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
  return projectedData;
}
// Test cases
try {
  console.log("--- TEST 1: Simple SELECT ---");
  const r1 = executeMockQuery("SELECT first_name, salary FROM employees WHERE salary > 100000", MOCK_DB);
  console.log("Result 1:", r1);
  console.log("\n--- TEST 2: JOIN SELECT ---");
  const r2 = executeMockQuery("SELECT e.first_name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id", MOCK_DB);
  console.log("Result 2:", r2);
  console.log("\n--- TEST 3: SELECT * ---");
  const r3 = executeMockQuery("SELECT * FROM departments", MOCK_DB);
  console.log("Result 3:", r3);
} catch (e) {
  console.error("Test failed:", e);
}
