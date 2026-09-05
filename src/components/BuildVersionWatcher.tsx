import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const INDEX_CHECK_INTERVAL_MS = 60_000;
const buildCheckSearchParams = new URLSearchParams(window.location.search);
const enableBuildCheckDebug = buildCheckSearchParams.get('buildCheckDebug') === '1';
const RELOAD_TOAST_DURATION_MS = 1200;

const getCurrentModuleBundlePath = (): string | null => {
    const scriptTag = document.querySelector<HTMLScriptElement>('script[type="module"][src]');

    if (!scriptTag?.src) {
        return null;
    }

    return new URL(scriptTag.src, window.location.origin).pathname;
};

const getLatestModuleBundlePath = async (): Promise<string | null> => {
    const response = await fetch(`/index.html?buildCheck=${Date.now()}`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        return null;
    }

    const html = await response.text();
    const typeFirstMatch = html.match(/<script\b[^>]*\btype=["']module["'][^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
    const srcFirstMatch = html.match(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*\btype=["']module["'][^>]*>/i);
    const moduleScriptPath = typeFirstMatch?.[1] ?? srcFirstMatch?.[1] ?? null;

    if (!moduleScriptPath) {
        return null;
    }

    return new URL(moduleScriptPath, window.location.origin).pathname;
};

const BuildVersionWatcher = ({ children }: { children: ReactNode }) => {
    const [showReloadToast, setShowReloadToast] = useState(false);
    const checkingRef = useRef(false);
    const reloadTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!import.meta.env.PROD && !enableBuildCheckDebug) {
            return;
        }

        const runCheck = async (): Promise<void> => {
            if (checkingRef.current || document.visibilityState === 'hidden') {
                return;
            }

            const currentBundlePath = getCurrentModuleBundlePath();
            if (!currentBundlePath) {
                return;
            }

            checkingRef.current = true;

            try {
                const latestBundlePath = await getLatestModuleBundlePath();

                if (enableBuildCheckDebug) {
                    console.info('[build-check]', {
                        currentBundlePath,
                        latestBundlePath
                    });
                }

                if (latestBundlePath && latestBundlePath !== currentBundlePath && reloadTimeoutRef.current === null) {
                    if (enableBuildCheckDebug) {
                        console.info('[build-check] New build detected. Reloading...');
                    }

                    setShowReloadToast(true);
                    reloadTimeoutRef.current = window.setTimeout(() => {
                        window.location.reload();
                    }, RELOAD_TOAST_DURATION_MS);
                }
            } catch {
                // Ignore transient network errors and keep the app running.
            } finally {
                checkingRef.current = false;
            }
        };

        const intervalId = window.setInterval(() => {
            void runCheck();
        }, INDEX_CHECK_INTERVAL_MS);

        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                void runCheck();
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.clearInterval(intervalId);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            if (reloadTimeoutRef.current !== null) {
                window.clearTimeout(reloadTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            {children}
            <Snackbar open={showReloadToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
                    A new version is available. Refreshing...
                </Alert>
            </Snackbar>
        </>
    );
};

export default BuildVersionWatcher;
