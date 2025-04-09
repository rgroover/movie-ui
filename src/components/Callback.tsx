import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const { isAuthenticated, user, handleRedirectCallback } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const login = async () => {
            try {
                // Handle the redirect callback to finish the login process
                await handleRedirectCallback();

                // Redirect the user to their original destination after login
                const returnTo = localStorage.getItem("returnTo") || "/";
                localStorage.removeItem("returnTo");
                navigate(returnTo);
            } catch (error) {
                console.error("Error handling callback:", error);
            }
        };

        login();
    }, [handleRedirectCallback, isAuthenticated, user, navigate]);

    return <div>Loading...</div>;
};

export default Callback;