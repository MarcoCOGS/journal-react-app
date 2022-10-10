import { useMemo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import { Grid, Typography,TextField,Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'

import React from 'react'

import { useForm } from '../../hooks/useForm'
import { AuthLayout } from '../layout/AuthLayout'
import { startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth/thunks.js'

const formData={
  email:'',
  password:''
}

export const LoginPage = () => {

  const {status,errorMessage}=useSelector(state=> state.auth)
  const dispatch = useDispatch()

  const {email, password, onInputChange} = useForm(formData)
  
  const isAuthenticated = useMemo(()=> status==='checking',[status])

  const onSubmit=(event)=>{
    event.preventDefault()
    dispatch(startLoginWithEmailPassword({email,password}))
  }

  const onGoogleSignIn = ()=>{
    //console.log('onGoogleSignIn')
    dispatch(startGoogleSignIn())
  }


  return (
    <AuthLayout title="Login">
      <form action="" onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} mt={2}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}>
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
              onChange={onInputChange}>
            </TextField>
          </Grid>
          <Grid container spacing={2} mb={2} mt={1}>
            <Grid item xs={12} display={!!errorMessage? '': 'none'}>
              <Alert severity='error' >
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} type="submit" variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google/>
                <Typography ml={1}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
