CREATE DATABASE ecommerce;

/* Products Table */

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    style VARCHAR(25),
    color VARCHAR(25),
    img VARCHAR(25),
    price MONEY,
    stock INTEGER
);

/* Inserting t-shirts */

INSERT INTO products (name, style, color, img, price, stock) VALUES ('T-shirt', 'crewneck', 'white', 'T_SHIRT_WHITE', 12.00, 5);
INSERT INTO products (name, style, color, img, price, stock) VALUES ('T-shirt', 'crewneck', 'pink', 'T_SHIRT_PINK', 12.00, 4);
INSERT INTO products (name, style, color, img, price, stock) VALUES ('T-shirt', 'crewneck', 'red', 'T_SHIRT_RED', 12.00, 6);

/* Inserting pants */

INSERT INTO products (name, style, color, img, price, stock) VALUES ('Pants', 'jeans', 'black', 'JEANS_BLACK', 60.00, 3);
INSERT INTO products (name, style, color, img, price, stock) VALUES ('Pants', 'jeans', 'blue', 'JEANS_BLUE', 60.00, 4);
INSERT INTO products (name, style, color, img, price, stock) VALUES ('Pants', 'jogger', 'black', 'JOGGER_BLACK', 60.00, 8);

/* Inserting jackets */

INSERT INTO products (name, style, color, img, price, stock) VALUES ('Jacket', 'bomber', 'blue', 'JACKET_BLUE', 60.00, 3);
INSERT INTO products (name, style, color, img, price, stock) VALUES ('Jacket', 'hooded bomber', 'red', 'JACKET_RED', 60.00, 3);

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(25),
    last_name VARCHAR(25),
    img VARCHAR(256),
    email VARCHAR(50)
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id)
);

CREATE TABLE cart_products (
    cart_id INTEGER REFERENCES carts(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price_each MONEY,
    PRIMARY KEY (cart_id, product_id)
);