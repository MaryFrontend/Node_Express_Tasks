const { query } = require('express');
const { pool, schema } = require('../database');

const getAll = async() => {
    const queryString = `SELECT * FROM ${schema}.task`; 
    try{
        const result = await pool.query(queryString);
        console.log(result.rows);
        return result.rows;
    } catch(e) {

    }
};
const getById = async(id) => {
    const queryString = `SELECT * FROM ${schema}.task WHERE id = $1`;
    try {
        const taskById = await pool.query(queryString,[id]);
        console.log(taskById.rows);
        return taskById.rows;
    } catch(e) {  

    }
};
const createOne = async(task) => {
    const client = await pool.connect();
    const { title, description } = task;  
    console.log('CreateOne', task);
    try{
        await client.query('BEGIN');
        const queryString = `INSERT INTO ${schema}.task (title, description) VALUES ($1, $2)`;
        const taskResult = await client.query(queryString,[title, description]);     
        await client.query('COMMIT');
        if (taskResult.rowCount > 0 ) return task;
        else throw new Error();
    } catch(error) {
        console.log(`Rolling back saveObj task for: ${task}, Error: ${error}`);
        await client.query('COMMIT');
        throw error;
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
      console.log('taskResult',taskResult);
      await client.query('COMMIT');
      console.log('111111', task);
      if (taskResult.rowCount > 0 ) return  task ;
        else throw new Error();
    } catch (error) {
      console.log(`Rolling back update task for: ${id}, ${task}, Error: ${error}`);
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
};
const deleteOne = async(id) => {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const queryString = `DELETE FROM task WHERE id = $1`;//?
        const taskResult = await client.query(queryString,[id]);
        await client.query('COMMIT');
        if (taskResult.rowCount > 0 ) return task;
        else throw new Error(); 
    } catch(e) {
        console.log(`Rolling back delete task for: ${id}, Error: ${error}`);
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { getAll, getById, createOne, updateOne, deleteOne };