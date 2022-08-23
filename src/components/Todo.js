import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import './todo.css'

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  //read
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
          // console.log(todos)
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="my-4 shadow-5-strong p-4 todo-card">
      <div className="row my-4">
        <div className="col-sm-10">
          <h2>Todo List</h2>
        </div>
        <div className="col-sm-2">
          <button className='btn btn-primary m-1' onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div className="my-4">
        <div className="form-outline mb-4">
          <input className="add-edit-todo" type='text' placeholder="Write Todo here" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        </div>
        {isEdit ? (
        <div>
          <button className='btn btn-primary ' onClick={handleEditConfirm}>Update</button>
        </div>
      ) : (
        <div>
          <button className='btn btn-primary ' onClick={writeToDatabase}>Add</button>
        </div>
      )}
        
      </div>
      <div className="my-4 todo-items">
        {
          todos.map(todo => (
            <div className="todo-item my-3">
              <h5>{todo.todo}</h5>
              <button className='btn btn-warning m-2' onClick={() => handleUpdate(todo)}>Update</button>
              <button className='btn btn-danger m-2' onClick={() => handleDelete(todo.uidd)}>Delete</button>
              
            </div>            
          ))
        }
      </div>
    </div>
  )
}

export default Todo