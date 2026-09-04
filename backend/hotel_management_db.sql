-- ==========================================================
-- LuxeStay Hotel Management System - MySQL Database Schema
-- Technologies: MySQL 8.0+, Hibernate ORM / Spring Data JPA
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `hotel_management_db`
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `hotel_management_db`;

-- ----------------------------------------------------------
-- 1. Table: users
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(20),
    `role` ENUM('ADMIN', 'RECEPTIONIST', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_user_username` (`username`),
    INDEX `idx_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 2. Table: rooms
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rooms` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `room_number` VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `price_per_night` DECIMAL(10, 2) NOT NULL,
    `capacity` INT NOT NULL DEFAULT 2,
    `status` ENUM('available', 'occupied', 'maintenance', 'cleaning') NOT NULL DEFAULT 'available',
    `description` TEXT,
    `amenities` TEXT, -- JSON / comma-separated string
    `image_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_room_number` (`room_number`),
    INDEX `idx_room_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 3. Table: bookings
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `booking_reference` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` BIGINT NOT NULL,
    `guest_name` VARCHAR(100) NOT NULL,
    `guest_email` VARCHAR(100) NOT NULL,
    `guest_phone` VARCHAR(20),
    `room_id` BIGINT NOT NULL,
    `room_number` VARCHAR(20) NOT NULL,
    `room_type` VARCHAR(50) NOT NULL,
    `check_in_date` DATE NOT NULL,
    `check_out_date` DATE NOT NULL,
    `nights` INT NOT NULL DEFAULT 1,
    `guests_count` INT NOT NULL DEFAULT 1,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `payment_status` ENUM('UNPAID', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'UNPAID',
    `special_requests` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT,
    INDEX `idx_booking_ref` (`booking_reference`),
    INDEX `idx_booking_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 4. Table: staff
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `staff` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `department` VARCHAR(50) NOT NULL,
    `shift` VARCHAR(30) NOT NULL DEFAULT 'Morning',
    `salary` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `status` ENUM('Active', 'On Leave', 'Inactive') NOT NULL DEFAULT 'Active',
    `hire_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_staff_dept` (`department`),
    INDEX `idx_staff_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 5. Table: service_requests
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `service_requests` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT,
    `guest_name` VARCHAR(100) NOT NULL,
    `room_number` VARCHAR(20) NOT NULL,
    `service_type` VARCHAR(50) NOT NULL, -- Housekeeping, Room Service, Maintenance, Laundry, Transportation
    `description` TEXT NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `assigned_staff` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_service_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 6. Table: check_in_records
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `check_in_records` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT NOT NULL,
    `guest_name` VARCHAR(100) NOT NULL,
    `room_number` VARCHAR(20) NOT NULL,
    `id_proof_type` VARCHAR(50),
    `id_proof_number` VARCHAR(50),
    `check_in_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `check_out_time` TIMESTAMP NULL,
    `staff_in_charge` VARCHAR(100),
    `notes` TEXT,
    FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------
-- 7. Table: payments
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `payments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_method` ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING') NOT NULL,
    `transaction_id` VARCHAR(100) UNIQUE,
    `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `status` ENUM('SUCCESS', 'FAILED', 'PENDING', 'REFUNDED') NOT NULL DEFAULT 'SUCCESS',
    FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- SEED DATA
-- ==========================================================

-- Insert Users (Password: 123)
INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `phone`, `role`) VALUES
(1, 'admin', '123', 'Administrator', 'admin@luxestay.com', '+1 555-0100', 'ADMIN'),
(2, 'staff', '123', 'Front Desk Staff', 'staff@luxestay.com', '+1 555-0101', 'RECEPTIONIST'),
(3, 'new_guest', '123', 'Alex Morgan', 'alex@example.com', '+1 555-0199', 'GUEST')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Insert Rooms
INSERT INTO `rooms` (`id`, `room_number`, `name`, `type`, `price_per_night`, `capacity`, `status`, `description`, `amenities`, `image_url`) VALUES
(1, '101', 'Deluxe Ocean Suite', 'Deluxe Suite', 250.00, 2, 'available', 'Stunning ocean view with king-size bed and marble bath.', 'WiFi, Ocean View, King Bed, Mini Bar, Smart TV, AC', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'),
(2, '102', 'Executive King Room', 'Executive', 180.00, 2, 'available', 'Spacious executive room ideal for business travelers with dedicated workspace.', 'WiFi, Workspace, King Bed, City View, Coffee Maker', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'),
(3, '103', 'Presidential Penthouse', 'Penthouse', 500.00, 4, 'available', 'Top-floor luxury penthouse with panoramic city views and private jacuzzi.', 'WiFi, Jacuzzi, Private Terrace, 2 King Beds, Butler Service', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'),
(4, '201', 'Standard Double Room', 'Standard', 120.00, 2, 'available', 'Comfortable and cozy double room with all modern essentials.', 'WiFi, Queen Bed, AC, En-suite Bathroom', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'),
(5, '202', 'Family Garden Suite', 'Family Suite', 290.00, 4, 'available', 'Spacious suite overlooking lush gardens, perfect for families.', 'WiFi, Garden View, 2 Queen Beds, Kitchenette, Bathtub', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800')
ON DUPLICATE KEY UPDATE `room_number`=`room_number`;

-- Insert Staff Members
INSERT INTO `staff` (`id`, `name`, `email`, `phone`, `role`, `department`, `shift`, `salary`, `status`, `hire_date`) VALUES
(1, 'Elena Rostova', 'elena@luxestay.com', '+1 555-0201', 'Front Desk Lead', 'Reception', 'Morning', 4200.00, 'Active', '2024-01-15'),
(2, 'Marcus Vance', 'marcus@luxestay.com', '+1 555-0202', 'Executive Chef', 'Kitchen', 'Evening', 5500.00, 'Active', '2023-06-10'),
(3, 'Sarah Jenkins', 'sarah@luxestay.com', '+1 555-0203', 'Head Housekeeper', 'Housekeeping', 'Morning', 3800.00, 'Active', '2024-03-01'),
(4, 'David Chen', 'david@luxestay.com', '+1 555-0204', 'Maintenance Tech', 'Maintenance', 'Night', 3900.00, 'Active', '2024-02-20')
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Insert Bookings
INSERT INTO `bookings` (`id`, `booking_reference`, `user_id`, `guest_name`, `guest_email`, `guest_phone`, `room_id`, `room_number`, `room_type`, `check_in_date`, `check_out_date`, `nights`, `guests_count`, `total_amount`, `status`, `payment_status`, `special_requests`) VALUES
(1, 'BK-1001', 3, 'Alex Morgan', 'alex@example.com', '+1 555-0199', 1, '101', 'Deluxe Suite', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 3, 2, 750.00, 'CONFIRMED', 'PAID', 'Late check-in around 8 PM, extra towels requested.')
ON DUPLICATE KEY UPDATE `booking_reference`=`booking_reference`;

-- Insert Service Requests
INSERT INTO `service_requests` (`id`, `user_id`, `guest_name`, `room_number`, `service_type`, `description`, `priority`, `status`, `assigned_staff`) VALUES
(1, 3, 'Alex Morgan', '101', 'Housekeeping', 'Fresh towels and extra pillows requested.', 'MEDIUM', 'PENDING', 'Sarah Jenkins')
ON DUPLICATE KEY UPDATE `id`=`id`;
