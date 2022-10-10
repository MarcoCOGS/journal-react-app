import { Grid, Typography } from '@mui/material'

export const AuthLayout = ({children,title=''}) => {
    return (
        <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{backgroundColor:"primary.main"}}
            minHeight="100vh"
            p={4}
        >
            <Grid item
                className='box-shadow'
                xs={3}
                sx={{backgroundColor:"white"}}
                p={3}
                borderRadius={2}
                width={{sm:450}}
                >
                <Typography variant='h5' mb={1}>{title}</Typography>
                {children }
            </Grid>
        </Grid>
    )
}
