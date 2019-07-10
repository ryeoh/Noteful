import React, { Component } from 'react';
import Note from './Note';
import NoteContext from './NoteContext';
import './NoteList.css';

class NoteList extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NoteContext;

  render() {
    const { notes=[], folders=[] } = this.context;

    const { folderId } = this.props.match.params;

    const filterNotes = (notes=[], folderId)    => ((!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
      )
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