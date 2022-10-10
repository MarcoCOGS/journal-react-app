import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote} from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'
import { useRef } from 'react'


export const NoteView = () => {

    const dispatch = useDispatch()
    const {active:note, messageSaved, isSaving, }= useSelector(state=>state.journal)
    const {body, title, onInputChange, formState, date} = useForm(note)
    const dateString = useMemo(()=>{
        const newDate = new Date(date).toUTCString()
        return newDate
    },[date])

    const fileInputRef = useRef()

    useEffect(()=>{
        dispatch(setActiveNote(formState))
    },[formState])

    useEffect(()=>{
        if(messageSaved.length>0) {
            Swal.fire('Nota actualizada',messageSaved,'success')
        }
    },[messageSaved])


    const onSaveNote=()=>{
        dispatch(startSaveNote())
    }
    const onFileInputChange = (event)=>{
        if(event.target.files===0) return
        dispatch(startUploadingFiles(event.target.files))
    }
    
    const onDelete = ()=>{
        dispatch(startDeletingNote())
    }

    return (
        <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container 
        direction="row"
        justifyContent="space-between"
        mb={1}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>

                <input 
                    ref={fileInputRef}
                    type="file" 
                    multiple
                    onChange={onFileInputChange}
                    style={{display:'none'}}/>
                <IconButton 
                    color="primary" 
                    disabled={isSaving}
                    onClick={()=>fileInputRef.current.click()}>
                    <UploadOutlined/>
                </IconButton>
                <Button color="primary" sx={{padding:2}} onClick={onSaveNote} disabled={isSaving}>
                    <SaveOutlined xs={{fontSize:30,mr:1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label="Título"
                    sx={{border: 'none', mb:1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder='¿Que sucedio en el día de hoy?'
                    minRows={5}
                    sx={{border: 'none', mb:1}}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error">
                    <DeleteOutline/>
                </Button>
            </Grid>
            {/*Galeria de imagenes */}
            <ImageGallery images={note.imageUrls}/>
        </Grid>
    )
}
