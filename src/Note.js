import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import NoteContext from './NoteContext';
import './Note.css';

function deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

function Note(props) {
  return (
    <NoteContext.Consumer>
      {(context) => (
        <div className='note'>
          <Link className='note-link' to={`/note/${props.id}`}>
            <h2>{props.name}</h2>
          </Link>
            <div>
              <span className='date-modified'>Modified on {format((props.modified), 'Do MMM YYYY')}</span>
            </div>
            <button
              className='delete-note-btn'
              onClick={() => {
                deleteNoteRequest(
                  props.id,
                  context.deleteNote
                )
              }}
            >
              Delete note
            </button>
        </div>
      )}
    </NoteContext.Consumer>
  );
}
  
export default Note;

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.instanceOf(Date)
}