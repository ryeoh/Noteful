import React, { Component } from 'react';
import Nav from './Nav';
import NoteList from './NoteList';
import NoteContent from './NoteContent';
import NoteNav from './NoteNav';
import { Route, Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

import './App.css';
import NoteContext from './NoteContext';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(foldersRes => {
      if (!foldersRes.ok) {
        throw new Error(foldersRes.status)
      }
      return foldersRes.json()
    })
    .then(([folders]) => {this.setState({ folders })})
    .catch(error => {this.setState({ error })});

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(notesRes => {
      if (!notesRes.ok) {
        throw new Error(notesRes.status)
      }
      return notesRes.json()
    })
    .then(([notes]) => {this.setState({ notes })})
    .catch(error => {this.setState({ error })});
  }

  deleteNote() {

  }
  
  componentDidMount() {
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
      deleteNote: this.deleteNote
    }

    return (
      <div className="App">
        <header>
          <Link className='home-link' to={`/`}>
            <h1>Noteful</h1>
          </Link>
        </header>

        <NotefulContext.Provider value={contextValue}>
          <Route 
            exact path='/' 
            component={Nav}
            // render={routeProps => {
            //   const {folderId} = routeProps.match.params;
            //   const notesForFolder = filterNotes(
            //       this.state.notes,
            //       folderId
            //   );
            //   return (
            //     <>
            //       <Nav
            //         {...routeProps}
            //         folders={this.state.folders}
            //       />
            //       <NoteList
            //         {...routeProps}
            //         notes={notesForFolder}
            //       />
            //     </>
            //   )}} 
            />
          <Route 
            exact path='/' 
            component={NoteList}
          />


          <Route 
            exact path='/note/:noteId' 
            render={(routeProps) => {
              return (
                <NoteNav {...routeProps}
                folder={this.state.folders.find(folder => 
                  folder.id === (this.state.notes.find(note => 
                    note.id === routeProps.match.params.noteId).folderId))}
                />)}}
            />

          <Route 
            path='/folder/:folderId'
            component={Nav}
            // render={routeProps => {
              
            //   return (
            //     <>
            //       <Nav 
            //         {...routeProps}
            //         folders={this.state.folders}/>
            //       <NoteList
            //           {...routeProps}
            //           notes={notesForFolder}
            //       />
            //     </>
              // );
          // }}
          />

          <Route 
            path='/folder/:folderId'
            component={NoteList}
          />

          <Route 
            exact path='/note/:noteId' 
            render={(routeProps) => {
              return (
                <NoteContent {...routeProps}
                note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)} />)}} 
          />
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
