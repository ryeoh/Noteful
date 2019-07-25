import React, {Component} from 'react';
import NoteContext from './NoteContext';
import { findFolderByName } from './helpful-constants';
import PropTypes from 'prop-types';
import './AddNote.css';

// const Required = () => (
//     <span className='AddBookmark__required'>*</span>
//   )

class AddNote extends Component {
  static contextType = NoteContext;
  
  state = {
        error: null,
        name: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false
        }
  }

  updateNoteName(name) {
    this.setState({
        name: {
            value: name,
            touched: true
        }
    })
  }

  updateNoteContent(content) {
    this.setState({
        content: {
            value: content,
            touched: true
        }
    })
  }

  validateName() {
    const name = this.state.name.value.trim();
    const notesList = this.context.notes.map(note => note.name);
    if (notesList.includes(name)) {
        return 'That note title already exists. Please choose another.';
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
        return 'Note cannot be empty.';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, content, folderName } = e.target;
    const {folders=[]} = this.context;
    const folder = findFolderByName(folders, folderName.value);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    const randId = getRandomInt(1000, 9999);
    let noteId = `d26e${randId}-ffaf-11e8-8eb2-f2801f1b9fd1`;
    let dateModified = new Date();

    const note = {
        id: noteId,
        name: name.value,
        modified: dateModified,
        folderId: folder.id,
        content: content.value
    };

    this.setState({error: null})

    fetch('http://localhost:9090/notes', {
        method: 'POST',
        body: JSON.stringify(note),
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
        noteId = ''
        note.name = ''
        note.modified = ''
        note.folderId = ''
        note.content = ''
        this.context.addNote(data)
        this.props.history.push('/')
    })
    .catch(error => {
        console.log(error)
        this.setState({ error })
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  render() {
    const { error } = this.state;
    const {folders=[]} = this.context;
    const noteContentError = this.validateContent();
    const noteNameError = this.validateName();

    let noteErrorExists = false;
    if (noteNameError) {
        noteErrorExists = true;
    } 
    let noteContentErrorExists = false;
    if (noteContentError) {
        noteContentErrorExists = true;
    }
     
    return (
        <section className='AddNote'>
            <h2>New Note</h2>
            <form
                className='addNote__form'
                onSubmit={this.handleSubmit}>
                <div className='AddNote__error' role='alert'>
                {error && <p>{error.message}</p>}
                {this.state.name.touched && noteNameError}
                </div>

                <div>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Title of note'
                        onChange={e => this.updateNoteName(e.target.value)}
                        aria-required='true' />
                </div>

                <div>
                    <textarea 
                        role='textbox'
                        name='content' 
                        id='content'
                        aria-multiline='true'
                        onChange={e => this.updateNoteContent(e.target.value)}
                        aria-label='content of note'
                        aria-required='true'
                        >
                    </textarea>
                </div>

                <div>
                    <label htmlFor='folderName'>
                        Folder
                    </label>
                    <select 
                        name='folderName'
                        id='folderName'
                        required>
                        {folders.map(folder =>
                        <option 
                            key={folder.id} 
                            value={folder.name}>
                            {folder.name}
                        </option>)}
                    </select>
                </div>

                {this.folderId}

                <div className='AddNote__buttons'>
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                    <button type='submit'  disabled={noteErrorExists || noteContentErrorExists}>
                        Save
                    </button>
                </div>
            </form>
        </section>
    )
  }
}

export default AddNote;

AddNote.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.instanceOf(Date),
    folderId: PropTypes.string,
    content: PropTypes.string
}