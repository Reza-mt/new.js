const noteList = document.querySelector('#note-list')

//event listener
eventlistener()
//from submit
function eventlistener() {
    document.querySelector('form').addEventListener('submit', newNote);
    // remove note
    document.querySelector('#note-list').addEventListener('click', removeNote)
    //get data from local storage on load
    document.addEventListener('DOMContentLoaded',localStorageOnLoad);
}

//function
function newNote(e) {
    e.preventDefault();
    //access to value
    const note = document.querySelector('#note').value
    //create removeBtn
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'X'
    removeBtn.classList = 'remove-note'
    //create <li> tag
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    // adding remove btn to the li
    li.appendChild(removeBtn)
    // adding li to the note-list
    noteList.appendChild(li)

    addNoteToLocalStorage(note)

    alert("یادداشت با موفقیت ذخیر شد")
}

function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }
    //also remove note from local storage
    removeNoteLocalStorage(e.target.parentElement.textContent)
}

//adding note to local storage    
function addNoteToLocalStorage(note) {

    //get note from local storage
    const notes = getNoteFromLocalStorage()
    
    //adding new note to the notes array
    notes.push(note)
    
    //add new note array
    localStorage.setItem('notes',JSON.stringify(notes))
    
}

//get note from local storage
function getNoteFromLocalStorage() {
    let notes;
    let getFromLs = localStorage.getItem('notes')
    if (getFromLs === null) {
        notes = []
    } else {
        notes = JSON.parse(getFromLs)
    }
    return notes
}

//get data from local storage On Load
function localStorageOnLoad(){
    const notes = getNoteFromLocalStorage()
    notes.forEach(function (note) {

        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
        removeBtn.classList = 'remove-note'
        //creat <li> tag
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))
    
        // adding remove btn to the li
        li.appendChild(removeBtn)
        // adding li to the note-list
        noteList.appendChild(li)
    });
}

// 
function removeNoteLocalStorage(noteContent) {
    //delete X from the content
    const noteDelete = noteContent.substring(0 , noteContent.length - 1);

    // get notes from local storage
    const notesFromLS = getNotesFromLocalStorage()

    notesFromLS.forEach(function (note, index) {
        if (note === noteDelete) {
            notesFromLS.splice(index, 1)
        }
    });

    // set new array of notes to the local storage
    localStorage.setItem('notes', JSON.stringify(notesFromLS))
}