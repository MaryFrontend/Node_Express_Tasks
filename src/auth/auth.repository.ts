import { pool, userSchema } from '../database';

const searchUsername = async (user: User): Promise<User | false> => {
  const queryString = `SELECT * FROM ${userSchema}.user WHERE username = $1`;
  try {
    const oneUser = await pool.query(queryString, [user.username]);
    return oneUser;
  } catch (error) {
    console.log(`Exception in auth.repository: ${error}`);
    return false;
  }
};

const signupUser = async (user: User): Promise<User | false> => {
  const client = await pool.connect();
  const { username, password } = user;
  try {
    await client.query('BEGIN');
    const queryString = `INSERT INTO ${userSchema}.user (username, password) VALUES ($1, crypt($2, gen_salt('bf')))`;
    const taskResult = await client.query(queryString, [username, password]);
    await client.query('COMMIT');
    if (taskResult.rowCount > 0) return user;
    else throw new Error('Not Found');
  } catch (error) {
    console.log(`Exception in auth.repository: ${error}`);
    await client.query('COMMIT');
    return false;
  } finally {
    client.release();
  }
};

export { signupUser, searchUsername };