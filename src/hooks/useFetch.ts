import { useCallback, useMemo } from "react";

export function useFetchInstance() {
    return useMemo(() => {
        return new URLSearchParams(window.location.search).get('instance')!;
    }, []);
}

export function usePost() {
    const instance = useFetchInstance();

    return useCallback((pathname: string, params: Record<string, string> = {}) => {
        const fullUrl = new URL("https://dashboard-app-server-isy0.onrender.com");
        fullUrl.pathname = pathname;

        const search = new URLSearchParams();
        search.set('instance', instance);

        fullUrl.search = search.toString();

        return fetch(fullUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then(result => result.json());
    }, [instance]);
}

export function useFetch() {
    const instance = useFetchInstance();

    return useCallback((pathname: string, params: Record<string, string> = {}) => {
        const fullUrl = new URL("https://dashboard-app-server-isy0.onrender.com");
        fullUrl.pathname = pathname;

        const search = new URLSearchParams(params);
        search.set('instance', instance);

        fullUrl.search = search.toString();

        return fetch(fullUrl.toString(), { method: 'GET' }).then(result => result.json());
    }, [instance]);
}
