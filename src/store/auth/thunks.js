import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNoteLogout } from "../journal/journalSlice"
import { checkingCredencials, login, logout } from "./authSlice"

export const chekingAuthentication = (email,password)=>{
    return async(dispatch)=>{
        dispatch(checkingCredencials())
    }
}


export const startGoogleSignIn=()=>{
    return async(dispatch)=>{
        dispatch(checkingCredencials())
        const result =await signInWithGoogle()
        if(!result.ok) return dispatch(logout(result.errorMessage))
        delete result.ok
        dispatch(login(result))

    }
}


export const startCreatingUserWithEmailPassword = ({email, password, displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredencials())
        const {ok,uid,photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})
        if(!ok) return dispatch(logout({errorMessage}))
        
        dispatch(login({uid, displayName, email, photoURL}))
    }
}


export const startLoginWithEmailPassword = ({email,password})=>{
    return async(dispatch)=>{
        dispatch(checkingCredencials())
        const resp = await loginWithEmailPassword({email,password})
        if(!resp.ok) return dispatch(logout(resp))

        dispatch(login(resp))
    }
}

export const startLogout=()=>{
    return async(dispatch)=>{
        await logoutFirebase();
        dispatch(clearNoteLogout())
        dispatch(logout({}))
    }
}