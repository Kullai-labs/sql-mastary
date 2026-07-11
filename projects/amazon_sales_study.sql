-- =========================================================================
-- CASE STUDY: Amazon E-Commerce Sales Analysis
-- =========================================================================
-- Purpose: Monitor low-stock items, aggregate sales, and calculate brand popularity.
-- Demonstration: Joins, SUM summaries, and inventory check constraint rules.
-- =========================================================================

-- 1. DATABASE SCHEMA CREATION (DDL)

CREATE TABLE amazon_products (
    prod_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    stock INT CHECK (stock >= 0)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    prod_id INT,
    qty INT NOT NULL CHECK (qty > 0),
    total INT NOT NULL,
    FOREIGN KEY (prod_id) REFERENCES amazon_products(prod_id) ON DELETE CASCADE
);


-- 2. POPULATE DUMMY RECORDS (DML)

INSERT INTO amazon_products (prod_id, title, brand, stock) VALUES 
(1, 'Wireless Mouse', 'Logitech', 15),
(2, 'Mechanical Keyboard', 'Keychron', 4),
(3, 'USB-C Hub', 'Anker', 0);

INSERT INTO orders (id, prod_id, qty, total) VALUES 
(1001, 1, 2, 2000),
(1002, 2, 1, 7500);


-- 3. ANALYTICAL CASE QUESTIONS & ANSWERS

-- Challenge 1: List all products that are completely out of stock (stock = 0).
-- Expected Output: Titles of out of stock products.
SELECT title 
FROM amazon_products 
WHERE stock = 0;

-- Challenge 2: Find the total quantity sold and revenue generated for each brand.
-- Expected Output: Sum total of sales volume grouped by brand name.
SELECT p.brand, SUM(o.qty) AS total_sold, SUM(o.total) AS total_revenue
FROM amazon_products p 
JOIN orders o ON p.prod_id = o.prod_id 
GROUP BY p.brand;
