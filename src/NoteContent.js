import React, {Component} from 'react';
import Note from './Note';
import NoteContext from './NoteContext';
import {findNote} from './helpful-constants';
import './NoteContent.css';

class NoteContent extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NoteContext;

  render() {
    const {notes} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId);
    const noteContent = () => (note !== undefined)
      ? (<div className='selected-note'>
          <Note 
            id={note.id}
            name={note.name}
            modified={note.modified}
          /> <br />
          <div className='selected-note-content'>
            <h2>{note.name}</h2>
            <p>{note.content}</p>
          </div>
        </div>)
      : this.props.history.push('/');

    return (
      <div className='note-list-itm'>
        {noteContent(note)}
      </div>
    );
  }
}

export default NoteContent;