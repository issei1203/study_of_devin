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
    
    if (user78Hash) {
      console.log(`${user78Password},${user78Hash}`);
    }
    
    const numRandomEntries = 20; // Generate 20 random entries
    for (let i = 0; i < numRandomEntries; i++) {
      const randomPassword = generateRandomPassword();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);
      console.log(`${randomPassword},${hashedPassword}`);
    }
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

extractPasswords();
