import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err, 'err');
    }
  };
  const getTodo = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos');
      const jsonData = await res.json();
      setTodos(jsonData);
    } catch {}
  };
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};
export default ListTodo;
