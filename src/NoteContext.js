import React from 'react';

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {}
})

export default NoteContext;