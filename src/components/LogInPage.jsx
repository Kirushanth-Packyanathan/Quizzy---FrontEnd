import React from 'react'
import { Button, Container, Typography, Box } from "@mui/material"

const LogInPage = () => {
    const googleLogIn = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
        
    }

    const gitHubLogIn = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/github";
    }

    return (
        <Container maxWidth="xs" sx={{ mt: 8, textAlign: 'center', backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome Back!
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                Please log in using one of the following services:
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={googleLogIn} 
                    fullWidth 
                    sx={{ mb: 2, py: 1.5 }}
                >
                    Log In with Google
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={gitHubLogIn} 
                    fullWidth 
                    sx={{ py: 1.5 }}
                >
                    Log In with GitHub
                </Button>
            </Box>
        </Container>
    )
}

export default LogInPage
