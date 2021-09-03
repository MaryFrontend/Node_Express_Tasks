import { pool, userSchema } from '../src/database';

const searchUsername = async (username: string, password?: string): Promise<true | false> => {
    const queryString = `SELECT * FROM ${userSchema}.user WHERE username = $1`;
    try {
      await pool.query(queryString, [username]);
      return true;
    } catch (error) {
      console.log(`Exception in auth.repository: ${error.message}`);
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
      console.log(`Exception in auth.repository: ${error.message}`);
      await client.query('COMMIT');
      return false;
    } finally {
      client.release();
    }
  };

  export { signupUser, searchUsername };