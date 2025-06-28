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
        WHEN id = 78 THEN crypt('Fnoa734r-wefd', gen_salt('bf'))
        ELSE crypt(RANDOM()::text, gen_salt('bf'))
        END AS password_hash
FROM
    user_generator;
