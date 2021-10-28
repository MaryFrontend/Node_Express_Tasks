import { pool, userSchema } from '../database';

const signupUser = async (user: User): Promise< Boolean > => {
  const client = await pool.connect();
  const { username, password } = user;
  try {
    await client.query('BEGIN');
    const queryString = `INSERT INTO ${userSchema}.user (username, password) VALUES ($1, $2)`;
    const taskResult = await client.query(queryString, [username, password]);
    await client.query('COMMIT');
    if (taskResult.rowCount > 0) return true;
    else return false;
  } catch (error) {
    console.log(`Exception in auth.repository: ${error}`);
    await client.query('COMMIT');
    return false;
  } finally {
    client.release();
  }
};

const searchLogin = async (user: User): Promise< Boolean > => {
  const queryString = `SELECT * FROM ${userSchema}.user WHERE username = $1`;
  try {
    const oneUser = await pool.query(queryString, [user.username]);
    if (!oneUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(`Exception in auth.repository: ${error}`);
    throw error;
  }
};

export { signupUser, searchLogin };
