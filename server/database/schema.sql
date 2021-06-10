CREATE DATABASE ecommerce_api;

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10),
    description VARCHAR(50)
);

INSERT INTO test (name, description) VALUES ('probando', 'esto es una prueba');

INSERT INTO test (name, description) VALUES ('otra vez', 'a ver si sale');