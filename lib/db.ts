// Import the sql function from the Vercel Postgres library to interact with the database.
import { sql } from '@vercel/postgres';

// Define an asynchronous function named 'query' that takes a SQL query string and an optional array of values to execute a database query and return the result.
export async function query(query: string, values: any[] = []) {
  try {
    // Execute the SQL query with the provided values and await the result.
    const result = await sql.query(query, values);
    // Return the result of the query.
    return result;
  } catch (error) {
    // Log any errors that occur during the database query to the console.
    console.error('Database query error:', error);
    // Rethrow the error to be handled by the calling function.
    throw error;
  }
}