import React, {Component} from 'react';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends Component {
  static contextType = NoteContext;

  state = {
      error: null,
      folderName: {
          value: '',
          touched: false
        }
  }

  updateFolderName(folderName) {
      this.setState({
        folderName: {
            value: folderName,
            touched: true
        }
    })
  }

  validateFolderName() {
    const folderName = this.state.folderName.value.trim();
    const foldersList = this.context.folders.map(folder => folder.name);
    if (folderName.length === 0) {
      return 'Name is required';
    }  else if (foldersList.includes(folderName)) {
      return 'That folder name already exists. Please choose another.';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { folderName } = e.target;

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    const randId = getRandomInt(100, 999);
    let folderId = `b0716${randId}-ffaf-11e8-8eb2-f2801f1b9fd1`;
    const folder = {
        id: folderId,
        name: folderName.value
    };

    this.setState({
        error: null
    });

    fetch('http://localhost:9090/folders', {
        method: 'POST',
        body: JSON.stringify(folder),
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
        folderId = ''
        folder.name = ''
        this.context.addFolder(data)
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
    const folderNameError = this.validateFolderName();
    let folderErrorExists = false;
    if (folderNameError) {
        folderErrorExists = true;
    }

    return (
      <section className='AddFolder'>
        <h2>New Folder</h2>
        <form
          className='addFolder__form'
          onSubmit={this.handleSubmit}>
            <div 
              className='AddFolder__error' 
              role='alert'>
              {error && <p>{error.message}</p>}
              {this.state.folderName.touched && folderNameError}
            </div>

            <label htmlFor='folderName'>Folder name: </label>
            <input 
                type='text' 
                id='folderName' 
                name='folderName' 
                onChange={e => this.updateFolderName(e.target.value)}
                required>
            </input>

            <div className='AddFolder__buttons'>
                <button type='button' onClick={this.handleClickCancel}>
                    Cancel
                </button>
                <button type='submit' disabled={folderErrorExists}>
                    Save
                </button>
            </div>
        </form>
      </section>
    )
  }
}

export default AddFolder;

AddFolder.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
}