import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { SideBar } from '../components';
import { NavBar } from '../components/NavBar';

const drawerWidth=240;
export const JournalLayout = ({children}) => {
    return (
        <Box
        display="flex" className='animate__animated animate__fadeIn animate__faster'>
            <NavBar drawerWidth={drawerWidth}/>

            <SideBar drawerWidth={drawerWidth}/>

            <Box component="main"
            flexGrow={1}
            p={3}>
                <Toolbar/>
                {children}

            </Box>
        </Box>
    )
}
