
export const filterNotes = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
  )

export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findFolderByName = (folders=[], name) => folders.find(folder => folder.name === name);
  
export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)