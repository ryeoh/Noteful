import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
    const { notes=[] } = this.context;

    const { folderId } = this.props.match.params;

    const filterNotes = (notes=[], folderId)    => ((!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
      )
    const notesForFolder = filterNotes(
      notes,
      folderId
    );

    const renderNotesList = () => (!notesForFolder)
      ? <p>There are no notes for this folder!</p>
      : (<ul>
        {notesForFolder.map(note =>
          <li className='noteList-itm' key={note.id}>
            <Note 
              id={note.id}
              name={note.name}
              modified={note.modified} />
          </li>
        )}
      </ul>);

    return (
      <div className='noteList'>
        {renderNotesList()}
        <div className='add-btn-section'>
          <NavLink 
            className='addNote-btn'
            to= '/add-note'>
            Add note
          </NavLink>
        </div>
      </div>
    );
  }
}

export default NoteList;