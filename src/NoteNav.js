import React from 'react';


function NoteNav(routeProps) {
  console.log(routeProps);
  
  return (
    <nav>
        <h3 className='noteNav-folderName'>
            {routeProps.folder.name}
        </h3>
        <button 
            className='go-back-btn'
            onClick={() => routeProps.history.goBack()}>
            Go back
        </button>
    </nav>
  );
}

export default NoteNav;