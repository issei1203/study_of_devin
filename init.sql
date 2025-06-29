CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

INSERT INTO users (id, username, password_hash)
WITH RECURSIVE user_generator(id) AS (
    SELECT 1
    UNION ALL
    SELECT id + 1 FROM user_generator WHERE id < 100
)
SELECT
    id,
    'user' || id AS username,
    CASE
        WHEN id = 1 THEN crypt('password123', gen_salt('bf'))
        WHEN id = 5 THEN crypt('admin2024', gen_salt('bf'))
        WHEN id = 10 THEN crypt('qwerty789', gen_salt('bf'))
        WHEN id = 15 THEN crypt('welcome01', gen_salt('bf'))
        WHEN id = 20 THEN crypt('test1234', gen_salt('bf'))
        WHEN id = 25 THEN crypt('secret99', gen_salt('bf'))
        WHEN id = 30 THEN crypt('hello2024', gen_salt('bf'))
        WHEN id = 35 THEN crypt('pass4567', gen_salt('bf'))
        WHEN id = 40 THEN crypt('user1234', gen_salt('bf'))
        WHEN id = 45 THEN crypt('login123', gen_salt('bf'))
        WHEN id = 50 THEN crypt('demo2024', gen_salt('bf'))
        WHEN id = 55 THEN crypt('sample99', gen_salt('bf'))
        WHEN id = 60 THEN crypt('access01', gen_salt('bf'))
        WHEN id = 65 THEN crypt('secure22', gen_salt('bf'))
        WHEN id = 70 THEN crypt('simple88', gen_salt('bf'))
        WHEN id = 75 THEN crypt('basic456', gen_salt('bf'))
        WHEN id = 78 THEN crypt('Fnoa734r-wefd', gen_salt('bf'))
        WHEN id = 80 THEN crypt('study123', gen_salt('bf'))
        WHEN id = 85 THEN crypt('train456', gen_salt('bf'))
        WHEN id = 90 THEN crypt('learn789', gen_salt('bf'))
        WHEN id = 95 THEN crypt('practice1', gen_salt('bf'))
        WHEN id = 99 THEN crypt('final999', gen_salt('bf'))
        ELSE crypt('default' || id::text, gen_salt('bf'))
        END AS password_hash
FROM
    user_generator;
