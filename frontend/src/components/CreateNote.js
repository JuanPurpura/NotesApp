import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

export default function CreateNote() {
  const { id: _id } = useParams(); // Obtener _id de useParams
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUsers();
    if (_id) {
      getNoteById(_id);
    }
  }, [_id]);

  async function getUsers() {
    const res = await axios.get('http://localhost:4000/api/users');
    setUsers(res.data.map(user => user.username));
    setUserSelected(res.data[0].username);
  }

  async function getNoteById(noteId) {
    const res = await axios.get(`http://localhost:4000/api/notes/${noteId}`);
    const note = res.data;
    setTitle(note.title);
    setContent(note.content);
    setDate(new Date(note.date));
    setUserSelected(note.author);
    setEditing(true);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newNote = {
      title,
      content,
      date,
      author: userSelected
    };

    if (editing) {
      await axios.put(`http://localhost:4000/api/notes/${_id}`, newNote);
    } else {
      await axios.post('http://localhost:4000/api/notes', newNote);
    }

    window.location.href = '/';
  }

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>{editing ? 'Edit note' : 'Create note'}</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              value={userSelected}
              onChange={e => setUserSelected(e.target.value)}
            >
              {users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <textarea
              name="content"
              className="form-control"
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-2">
            <DatePicker
              className="form-control"
              selected={date}
              onChange={newDate => setDate(newDate)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
