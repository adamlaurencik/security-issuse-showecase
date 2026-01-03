-- Database initialization script for Security Demo Shop

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users (passwords are plaintext for demo - security issue!)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@shop.local', 'admin123', 'admin'),
('john_doe', 'john@example.com', 'password123', 'customer'),
('jane_smith', 'jane@example.com', 'jane2024', 'customer');

-- Insert sample products
INSERT INTO products (name, description, price, stock, image_url) VALUES
('Laptop Pro 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 50, '/images/laptop.jpg'),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 200, '/images/mouse.jpg'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader', 49.99, 150, '/images/hub.jpg'),
('Mechanical Keyboard', 'RGB mechanical keyboard with Cherry MX switches', 129.99, 75, '/images/keyboard.jpg'),
('Monitor 27"', '4K IPS monitor with HDR support', 449.99, 30, '/images/monitor.jpg'),
('Webcam HD', '1080p webcam with built-in microphone', 79.99, 100, '/images/webcam.jpg'),
('Headphones', 'Noise-cancelling over-ear headphones', 199.99, 60, '/images/headphones.jpg'),
('External SSD 1TB', 'Portable SSD with USB 3.2 Gen 2', 89.99, 120, '/images/ssd.jpg');

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES
(2, 1329.98, 'completed', '123 Main St, City, Country'),
(3, 79.98, 'pending', '456 Oak Ave, Town, Country');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 1299.99),
(1, 2, 1, 29.99),
(2, 2, 1, 29.99),
(2, 3, 1, 49.99);

-- Insert sample reviews
INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
(2, 1, 5, 'Excellent laptop! Very fast and reliable.'),
(3, 2, 4, 'Good mouse, comfortable to use.'),
(2, 4, 5, 'Best keyboard I have ever used!');
