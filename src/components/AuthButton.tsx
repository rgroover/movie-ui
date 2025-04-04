import { useAuth0 } from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const AuthButton = () => {
    const { isAuthenticated, logout, loginWithRedirect} = useAuth0();
    const location = useLocation();

    const handleLogin = async () => {
        localStorage.setItem("returnTo", window.location.pathname);
        await loginWithRedirect({
            appState: { returnTo: location.pathname }
        });
    };

    return (
        <>
            {!isAuthenticated && <Button onClick={handleLogin} sx={{
                pl: 2, // Padding on the left side of the button
                color: 'white',
                textTransform: 'none',
                width: 150,
                display: 'flex', // Make the button a flex container
                justifyContent: 'flex-start', // Align the content (icon + text) to the left
                textAlign: 'left', // Ensure text is aligned to the left
            }}>
                <LoginIcon sx={{ marginRight: '8px' }}/>
                <Typography>Log In</Typography>
            </Button> }
            {isAuthenticated && <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                sx={{
                    pl: 2, // Padding on the left side of the button
                    color: 'white',
                    textTransform: 'none',
                    width: 150,
                    display: 'flex', // Make the button a flex container
                    justifyContent: 'flex-start', // Align the content (icon + text) to the left
                    textAlign: 'left', // Ensure text is aligned to the left
                }}
            >
                <LogoutIcon sx={{ marginRight: '8px' }}/>
                <Typography>Log Out</Typography>
            </Button> }
        </>
    );
}

export default AuthButton
