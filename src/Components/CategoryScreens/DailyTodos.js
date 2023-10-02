import React, { useEffect, useState } from 'react';
import TaskBar from './TaskBar';
import { API_PATH } from '../../Api/Api';
import './DailyTodos.css';

const DailyTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const categoryId = 2;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_PATH}/categoryTodos/?userId=${userId}&categoryId=${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [categoryId, userId]);

  return (
    <div className='TodoListTable'>
      <div className="screen-heading">Daily List</div>
      {loading ? (
        <p>Loading...</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <TaskBar
            key={todo.id}
            DateTime={todo.completedByTime}
            Headline={todo.todoHeadline}
            rowId={todo.id}
            isActive={todo.isActive}
            description={todo.todoDescription}
            CategoryId={categoryId}
          />
        ))
      ) : (
        <p>No TodoList Available</p>
      )}
    </div>
  );
};

export default DailyTodos;
