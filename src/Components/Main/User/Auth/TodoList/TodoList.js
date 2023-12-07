import React, { useEffect, useState } from 'react';
import Header from '../../../../Shared/Header';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { config } from '../../../../../App';
import Logout from '../../../../Shared/Logout';
import Todo from './Todo';

const TodoList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [todo, setTodo] = useState({ description: '' });
  const [allTodos, setAllTodos] = useState([]);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setTodo({ description: e.target.value });
  };

  const handleAdd = async () => {
    if (!token) {
      enqueueSnackbar('Please log in again to use the platform!', { variant: 'warning' });
      return;
    }

    try {
      if (todo.description) {
        const url = `${config.endpoint}/task/addTask`;
        await axios.post(url, todo, { headers: { Authorization: `Bearer ${token}` } });
        setTodo({ description: '' });
        performAPICall();
        enqueueSnackbar('Successfully Uploaded', { variant: 'success' });
      }
      else{
        enqueueSnackbar('Please enter some task', { variant: 'warning' });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdate = async (id, newData, tag) => {
    if (!token) {
      enqueueSnackbar('Please log in again to use the platform!', { variant: 'warning' });
      return;
    }

    try {
      const url = `${config.endpoint}/task/${id}`;
      if (tag === 'edit') {
        await axios.patch(url, newData, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('Successfully Done', { variant: 'success' });
      } else if (tag === 'delete') {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('Successfully Deleted', { variant: 'success' });
      }

      performAPICall();
    } catch (error) {
      handleApiError(error);
    }
  };

  const performAPICall = async () => {
    try {
      const listOfTodoList = await axios.get(`${config.endpoint}/task/allTask`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllTodos(listOfTodoList.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        enqueueSnackbar('Unauthorized User!', { variant: 'error' });
      } else if (status === 500) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
      else if (status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    } else {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <Header />
        <Logout />
      </div>
      <div className='container mt-5'>
        <h4 className='mb-4'>Add Todos!</h4>
        <div className='mb-3'>
          <input type='text' value={todo.description} onChange={(e) => handleChange(e)} />
        </div>
        <button className='btn btn-primary' onClick={handleAdd}>
          Add Task
        </button>
      </div>

      <div className='container mt-5'>
        <h4 className='mb-4'>Your Tasks:</h4>
        <ul className='list-group'>
          {allTodos.length !== 0 ? (
            allTodos.map((userFile) => (
              <Todo key={userFile.id} userData={userFile} handleUpdate={handleUpdate} />
            ))
          ) : (
            'No Task yet to be completed !'
          )}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
