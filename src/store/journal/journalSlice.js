import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState:{
        isSaving:false,
        messageSaved:'',
        notes:[],
        active:null,
        /*active:{
          id:'ABC',
          title:'',
          body:'',
          date:123456,
          imageUrls:
        }*/
    },
  reducers: {
    savingNewNote: (state)=>{
      state.isSaving=true
    },
    addNewEmptyNote: (state,action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote:(state,action)=>{
      state.active=action.payload
    },
    setNotes: (state,notes)=>{
      state.notes=notes.payload
    },
    setSaving: (state)=>{
      state.isSaving=true
      state.messageSaved=''
    },
    updateNote: (state,action)=>{
      state.isSaving=false
      state.notes=state.notes.map((nota)=>{

        if(nota.id===action.payload.id) {
          return action.payload
        }

        return nota
      })

      state.messageSaved=`${action.payload.title}, actualizada correctamente`
    },
    setPhotosToActiveNote: (state, action)=>{
      state.active.imageUrls=[...state.active.imageUrls,...action.payload]
      state.isSaving=false
    },
    clearNoteLogout:(state)=>{
      state.isSaving=false
      state.messageSaved=''
      state.notes=[]
      state.active=null
    },
    deleteNoteById: (state,action)=>{
      state.active=null
      state.notes=state.notes.filter((note)=>note.id!==action.payload)
    },


  },
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote,
                setActiveNote,
                setNotes,
                setSaving,
                deleteNoteById,
                savingNewNote,
                updateNote,
                setPhotosToActiveNote,
                clearNoteLogout
            } = journalSlice.actions