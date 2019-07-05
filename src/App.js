import React, { Component } from 'react';
import Nav from './Nav';
import NoteList from './NoteList';
import NoteContent from './NoteContent';
import NoteNav from './NoteNav';
import { Route, Link } from 'react-router-dom';
import STORE from './store';

import './App.css';

class App extends Component {
  state = STORE;
  
  render() {
    const filterNotes = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
      )

    return (
      <div className="App">
        <header>
          <Link className='home-link' to={`/`}>
            <h1>Noteful</h1>
          </Link>
        </header>

        <Route 
          exact path='/' 
          render={routeProps => {
            const {folderId} = routeProps.match.params;
            const notesForFolder = filterNotes(
                this.state.notes,
                folderId
            );
            return (
              <>
                <Nav
                  {...routeProps}
                  folders={this.state.folders}
                />
                <NoteList
                  {...routeProps}
                  notes={notesForFolder}
                />
              </>
            )}} 
          />

        <Route 
          exact path='/note/:noteId' 
          render={(routeProps) => {
            return (
              <NoteNav {...routeProps}
              folder={this.state.folders.find(folder => folder.id === (this.state.notes.find(note => note.id === routeProps.match.params.noteId).folderId))}
              />)}}
          />

        <Route 
          path='/folder/:folderId'
          render={routeProps => {
            const {folderId} = routeProps.match.params;
            const notesForFolder = filterNotes(
                this.state.notes,
                folderId
            );
            return (
              <>
                <Nav 
                  {...routeProps}
                  folders={this.state.folders}/>
                <NoteList
                    {...routeProps}
                    notes={notesForFolder}
                />
              </>
            );
        }}
         />

        <Route 
          exact path='/note/:noteId' 
          render={(routeProps) => {
            return (
              <NoteContent {...routeProps}
              note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)} />)}} 
          />
      </div>
    );
  }
}

export default App;
