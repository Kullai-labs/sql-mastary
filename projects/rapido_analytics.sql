-- =========================================================================
-- CASE STUDY: Rapido Ride Hailing Database Analysis
-- =========================================================================
-- Purpose: Calculate driver stats, trip distance metrics, and category average fares.
-- Demonstration: Group By aggregates, self joins, and CASE formatting.
-- =========================================================================

-- 1. DATABASE SCHEMA CREATION (DDL)

CREATE TABLE rapido_drivers (
    driver_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vehicle VARCHAR(50) NOT NULL,
    rating DECIMAL(2, 1) CHECK (rating >= 1.0 AND rating <= 5.0)
);

CREATE TABLE rides (
    ride_id INT PRIMARY KEY,
    driver_id INT,
    status VARCHAR(50) NOT NULL,
    distance INT NOT NULL,
    fare INT NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES rapido_drivers(driver_id) ON DELETE SET NULL
);


-- 2. POPULATE DUMMY RECORDS (DML)

INSERT INTO rapido_drivers (driver_id, name, vehicle, rating) VALUES 
(1, 'Ramesh Kumar', 'Bike', 4.8),
(2, 'Suresh Patel', 'Auto', 4.3),
(3, 'Kiran Singh', 'Bike', 3.9);

INSERT INTO rides (ride_id, driver_id, status, distance, fare) VALUES 
(901, 1, 'Completed', 6, 80),
(902, 2, 'Completed', 12, 180),
(903, 3, 'Cancelled', 2, 0),
(904, 1, 'Completed', 8, 110);


-- 3. ANALYTICAL CASE QUESTIONS & ANSWERS

-- Challenge 1: Count the number of completed rides for each driver.
-- Expected Output: List of drivers with their count of successfully completed rides.
SELECT driver_id, COUNT(*) AS ride_count 
FROM rides 
WHERE status = 'Completed' 
GROUP BY driver_id;

-- Challenge 2: Calculate the average fare of completed bike rides (vehicle = 'Bike').
-- Expected Output: Average trip cost for bike drivers.
SELECT AVG(r.fare) AS avg_fare 
FROM rides r 
JOIN rapido_drivers d ON r.driver_id = d.driver_id 
WHERE d.vehicle = 'Bike' AND r.status = 'Completed';
