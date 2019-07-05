import React, {Component} from 'react';
import Note from './Note';

class NoteContent extends Component {
  render() {
    console.log(this.props.note);
    return (
      <div className='selected-note-content'>
        <Note 
          id={this.props.note.id}
          name={this.props.note.name}
          modified={this.props.note.modified}
        />
          <h1>{this.props.note.name}</h1>
          <p>{this.props.note.content}</p>
      </div>
    );
  }
}

export default NoteContent;