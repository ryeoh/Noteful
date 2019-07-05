import React, {Component} from 'react';
import Note from './Note';
import './NoteContent.css';

class NoteContent extends Component {
  render() {
    console.log(this.props.note);
    return (
      <div className='note-list-itm'>
        <Note 
          id={this.props.note.id}
          name={this.props.note.name}
          modified={this.props.note.modified}
        /> <br />
        <div className='selected-note-content'>
          <h2>{this.props.note.name}</h2>
          <p>{this.props.note.content}</p>
        </div>
      </div>
    );
  }
}

export default NoteContent;