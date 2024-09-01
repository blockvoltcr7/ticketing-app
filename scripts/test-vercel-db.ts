import { sql } from '@vercel/postgres';

async function main() {
  try {
    // Create a new table
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Table "test_table" created successfully');

    // Insert a test row
    const result = await sql`
      INSERT INTO test_table (name) VALUES ('Test Entry') RETURNING *
    `;
    console.log('Inserted row:', result.rows[0]);

    // Query the table
    const { rows } = await sql`SELECT * FROM test_table`;
    console.log('Query result:', rows);

    console.log('Connection to Vercel PostgreSQL successful!');
  } catch (error) {
    console.error('Error connecting to Vercel PostgreSQL:', error);
  }
}

main();
