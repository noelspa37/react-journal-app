import { db } from "../firebase/firestore-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${uid}/journal/notes`).add( newNote);

        dispatch( activeNote(docRef.id, newNote) )
    }
};

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
};

export const startLoadingNotes = ( uid ) => {
    return async (dispatch) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
}

export const setNotes = ( notes ) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
};

export const startSaveNote = ( note ) => {
    return async (dispatch, getState) => {
        
        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );

        dispatch( refreshNote(note.id, noteToFirestore) );
        Swal.fire('Saved', note.title, 'succcess');
    }
};

export const refreshNote = ( id, note ) => {
    return {
        type: types.notesUpdated,
        payload: {
            id, 
            note: {
                id,
                ...note
            }
        }
    }
};

export const startUpLoading = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        const fileUrl = await fileUpload( file );

        console.log(fileUrl);
    }
}