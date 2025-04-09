import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Auth0Provider} from "@auth0/auth0-react";
import {Auth0Settings} from "./util/constants.ts";
import {SearchProvider} from "./providers/SearchProvider.tsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Auth0Provider
            domain={Auth0Settings.domain}
            clientId={Auth0Settings.clientId}
            authorizationParams={{
                redirect_uri: window.location.origin + "/callback",
                audience: Auth0Settings.audience,
                scope: "openid profile email"
            }}
            onRedirectCallback={(appState) => {
                const returnTo = appState?.returnTo || localStorage.getItem("returnTo") || "/";
                localStorage.removeItem("returnTo");
                window.location.replace(returnTo);
            }}
            cacheLocation="localstorage"
        >
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchProvider>
                        <App />
                    </SearchProvider>
                </Suspense>
            </QueryClientProvider>
        </Auth0Provider>
    </StrictMode>
);
