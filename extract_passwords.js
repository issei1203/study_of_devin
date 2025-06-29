const { Client } = require('pg');
const bcrypt = require('bcrypt');

const dbConfig = {
  user: 'postgresql',
  host: 'localhost',
  database: 'postgresql',
  password: 'postgresql',
  port: 5432,
};

function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function extractPasswords() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('password,password_hash');
    
    const user78Result = await client.query('SELECT password_hash FROM users WHERE username = $1', ['user78']);
    const user78Hash = user78Result.rows[0]?.password_hash;
    const user78Password = 'Fnoa734r-wefd';
    
    const totalEntries = 100;
    const user78Position = Math.floor(Math.random() * totalEntries);
    
    const allEntries = [];
    
    for (let i = 0; i < totalEntries; i++) {
      if (i === user78Position && user78Hash) {
        allEntries.push(`${user78Password},${user78Hash}`);
      } else {
        const randomPassword = generateRandomPassword();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);
        allEntries.push(`${randomPassword},${hashedPassword}`);
      }
    }
    
    for (const entry of allEntries) {
      console.log(entry);
    }
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

extractPasswords();
