import { sql } from '@vercel/postgres';

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('Connection successful. Current time:', result[0].now);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testConnection();