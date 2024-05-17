import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from "../../assets/images";
import { APP_ROUTES } from '../../utilities/constants';

const Header = () => {
  return (
    <AppBar position="static"sx={{background:"#237542"}} >
    <Toolbar>
        <img src={logo} alt="Logo" style={{ height: '80px' }} /> 
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      </Typography>
      <Button color="inherit" component={Link} to={APP_ROUTES.USER_FEEDBACK_VIEW}>
        Home
      </Button>
      <Button color="inherit" component={Link} to={APP_ROUTES.USER_FEEDBACK_VIEW}>
        Feedback & FAQ
      </Button>
      <Button onClick={()=>{localStorage.clear()}}  color="inherit" component={Link} to={APP_ROUTES.ROOT}>
        Log Out
      </Button>
    </Toolbar>
  </AppBar>
  )
}

export default Header