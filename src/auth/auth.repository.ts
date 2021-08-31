import { pool, userSchema } from '../database';

const createOneUser = async (user: User): Promise<User | null> => {
  const client = await pool.connect();
  const { name, login, password } = user;
    
  try {
      await client.query('BEGIN');
      const queryString = `INSERT INTO ${userSchema}.user (name, login, password) VALUES ($1, $2 ,crypt($3, gen_salt('bf')))`;
      const taskResult = await client.query(queryString, [name, login, password]);
      await client.query('COMMIT');
      if (taskResult.rowCount > 0) return user;
      else throw new Error('Not Found');
    } catch (error) {
      console.log(`Exception in repository.createOne: ${error.message}`);
      await client.query('ROLLBACK');
      return null;
    } finally {
      client.release();
    }
}



export { createOneUser };