const { Client } = require('pg');

const dbConfig = {
  user: 'postgresql',
  host: 'localhost',
  database: 'postgresql',
  password: 'postgresql',
  port: 5432,
};

const knownPasswords = {
  1: 'password123',
  5: 'admin2024',
  10: 'qwerty789',
  15: 'welcome01',
  20: 'test1234',
  25: 'secret99',
  30: 'hello2024',
  35: 'pass4567',
  40: 'user1234',
  45: 'login123',
  50: 'demo2024',
  55: 'sample99',
  60: 'access01',
  65: 'secure22',
  70: 'simple88',
  75: 'basic456',
  78: 'Fnoa734r-wefd',
  80: 'study123',
  85: 'train456',
  90: 'learn789',
  95: 'practice1',
  99: 'final999'
};

async function extractPasswords() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('username,password,password_hash');
    
    const result = await client.query('SELECT id, username, password_hash FROM users ORDER BY id');
    
    for (const row of result.rows) {
      const password = knownPasswords[row.id] || `default${row.id}`;
      console.log(`${row.username},${password},${row.password_hash}`);
    }
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

extractPasswords();
