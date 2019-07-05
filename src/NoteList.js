import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Note from './Note';
// import STORE from './store';

function NoteList(routeProps) {
return (
    <div className='noteList'>
      <ul>
        {routeProps.notes.map(note =>
          <li key={note.id}>
            <Note 
              id={note.id}
              name={note.name}
              modified={note.modified} />
          </li>
        )}
      </ul>
        <button>Add note</button>
    </div>
  );
}

NoteList.defaultProps = {
  notes: []
}

export default NoteList;