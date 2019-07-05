import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Note.css';

function Note(props) {
  return (
      <div className='note'>
        <Link className='note-link' to={`/note/${props.id}`}>
            <h2>{props.name}</h2>
        </Link>
        <div>
            <span className='date-modified'>Date modified on {format((props.modified), 'Do MMM YYYY')}</span>
        </div>
        <button className='delete-note-btn'>
            Delete note
        </button>
      </div>
    );
  }
  
  export default Note;