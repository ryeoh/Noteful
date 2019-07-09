import React, { Component } from 'react';
import Note from './Note';
import NotefulContext from './NotefulContext';
import './NoteList.css';

class NoteList extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render() {
    const { notes=[], folders=[] } = this.context;

    const filterNotes = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
      )
    const { folderId } = folders.match.params;
    const notesForFolder = filterNotes(
      notes,
      folderId
    );

    return (
      <div className='noteList'>
        <ul>
          {notesForFolder.map(note =>
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
}

export default NoteList;