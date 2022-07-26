import { Box, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'

export const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      navigate("/")
    }).catch((e) => {
      alert(e)
    })
    
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && navigate("/")
    })
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={ email }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={ password }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={ login }
          >ログイン</Button>
        </Box>
      </Box>
    </Container>
  )
}
