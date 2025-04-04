import { useAuth0 } from "@auth0/auth0-react";

export const useApiToken = () => {
    const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();

    const getToken = async () => {
        if (!isAuthenticated) {
            console.warn("🚨 User is not authenticated, redirecting to login.");
            loginWithRedirect(); // Optionally redirect the user to log in
            return null;
        }

        try {
            const token = await getAccessTokenSilently();
            return token;
        } catch (error) {
            return null;
        }
    };
    return { getToken} ;
};
