import React from 'react';
import Note from './Note';
import './NoteList.css';

function NoteList(routeProps) {
return (
    <div className='noteList'>
      <ul>
        {routeProps.notes.map(note =>
          <li className='noteList-itm' key={note.id}>
            <Note 
              id={note.id}
              name={note.name}
              modified={note.modified} />
          </li>
        )}
      </ul>
      <div className='add-btn-section'>
        <button className='addNote-btn'>
          Add note
        </button>
      </div>
    </div>
  );
}

NoteList.defaultProps = {
  notes: []
}

export default NoteList;