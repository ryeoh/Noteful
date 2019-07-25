import React, { Component } from 'react';
import Nav from './Nav';
import NoteList from './NoteList';
import NoteContent from './NoteContent';
import NoteNav from './NoteNav';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import { Route, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

import './App.css';
import NoteContext from './NoteContext';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  deleteNote = noteId => {
    const newNotesList = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
     notes: newNotesList
    })
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    })
  }
  
  componentDidMount() {
    // this.setState({loading: true});
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes')
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok) 
          return foldersRes.json().then(e => Promise.reject(e));
        if(!notesRes.ok) 
          return notesRes.json().then(e => Promise.reject(e));
        
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {this.setState({folders, notes});
      })
      .catch(error => {this.setState({error});
      });
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
      <div role="application" className="App">
        <header>
          <Link className='home-link' to={`/`}>
            <h1>Noteful</h1>
          </Link>
        </header>
        
        <NoteContext.Provider value={contextValue}>
          
          <ErrorBoundary>
            <Route 
              exact path='/' 
              component={Nav}
            />
            <Route 
              exact path='/' 
              component={NoteList}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <Route 
              path='/folder/:folderId'
              component={Nav}
            />
            <Route 
              path='/folder/:folderId'
              component={NoteList}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <Route 
              path='/note/:noteId' 
              component={NoteNav}
            />
            <Route 
              path='/note/:noteId' 
              component={NoteContent}
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <Route  
              path='/add-folder'
              component={AddFolder} 
            />
            <Route 
              path='/add-note'
              component={AddNote}
            />
          </ErrorBoundary>

        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
