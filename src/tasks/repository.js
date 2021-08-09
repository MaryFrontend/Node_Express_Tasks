const { pool, schema } = require('../database');

const getAll = async() => {
    const queryString = `SELECT * FROM ${schema}.task`; 
    try{
        const result = await pool.query(queryString);
        return result.rows;
    } catch(error) {
        console.log(`Exception in repository.getAll: ${error.message}`);
        return null;
    }
};
const getById = async(id) => {
    const queryString = `SELECT * FROM ${schema}.task WHERE id = $1`;
    try {
        const taskById = await pool.query(queryString,[id]);
        return taskById.rows[0];
    } catch(error) { 
        console.log(`Exception in repository.getById: ${error.message}`); 
        return null;
    }
};
const createOne = async(task) => {
    const client = await pool.connect();
    const { title, description } = task;  
    try{
        await client.query('BEGIN');
        const queryString = `INSERT INTO ${schema}.task (title, description) VALUES ($1, $2)`;
        const taskResult = await client.query(queryString,[title, description]);     
        await client.query('COMMIT');
        if (taskResult.rowCount > 0 ) return task;
        else throw new Error('Not Found');
    } catch(error) {
        console.log(`Exception in repository.createOne: ${error.message}`);
        await client.query('COMMIT');
        return null;
    } finally{
        client.release();
    } 
};

const updateOne = async (id, task) => {
    const { title, description } = task;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const queryString =`UPDATE  ${schema}.task SET title = $1, description = $2 WHERE id = ${id}`;
      const taskResult = await client.query(queryString, [title, description]);
      await client.query('COMMIT');
      if (taskResult.rowCount > 0 ) return task;
        else throw new Error('Not Found');
    } catch (error) {
      console.log(`Exception in repository.updateOne: ${error.message}}`);
      await client.query('ROLLBACK');
      return null;
    } finally {
      client.release();
    }
};
const deleteOne = async(id) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const queryString = `DELETE FROM ${schema}.task WHERE id = $1`;
        const taskResult = await client.query(queryString,[id]);
        await client.query('COMMIT');
        if (taskResult.rowCount > 0) return id;
        else throw new Error('Not Found '); 
    } catch(error) {
        console.log(`Exception in repository.delete: ${error.message}`);
        await client.query('ROLLBACK');
        return null;
    } finally {
        client.release();
    }
};

module.exports = { getAll, getById, createOne, updateOne, deleteOne };