import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Link as RouterLink} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formValidations = {
  email: [(value)=>value.includes('@'),'El correo debe de tener una @'],
  password: [(value)=>value.length>=6,'El password debe de tener mas de 6 caracteres'],
  displayName: [(value)=>value.length>=1,'El nombre es requerido']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmited, setFormSubmited] = useState(false)

  const {status, errorMessage}=useSelector(state=>state.auth)
  const isCheckingAuthentication = useMemo(()=>status==='checking',[status])


  const {formState,displayName, email, password, onInputChange,isFormValid, displayNameValid, emailValid, passwordValid} = useForm({
    email:'marco@google.com',
    password:'123456',
    displayName: 'Marco Gallegos',
  },formValidations)

  

  const onSubmit = (event)=>{
    event.preventDefault()
    setFormSubmited(true)
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState))
  }


  return (
    <AuthLayout title={"Crear una cuenta"}>
      <h1>FormValid {isFormValid ? 'Válido':'incorrecto'}</h1>
      <form action="" onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} mt={2}>
            <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="Tu nombre"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}>
            </TextField>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}>
            </TextField>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}>
            </TextField>
          </Grid>
          <Grid container spacing={2} mb={2} mt={1}>
            <Grid item xs={12} display={!!errorMessage? '': 'none'}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type="submit" variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography mr={1}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
