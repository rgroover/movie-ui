import { useAuth0 } from "@auth0/auth0-react";

export const useApiToken = () => {
    const { getAccessTokenSilently, isAuthenticated, loginWithPopup } = useAuth0();

    const getToken = async () => {
        if (!isAuthenticated) {
            await loginWithPopup()
            //console.warn("🚨 User is not authenticated, redirecting to login.");
            //loginWithRedirect(); // Optionally redirect the user to log in
            return null;
        }

        try {
            return await getAccessTokenSilently();
        } catch (error) {
            return null;
        }
    };
    return { getToken} ;
};
