import { dashboard } from '@wix/dashboard';
import { campaigns } from '@wix/email-marketing';
import * as sdk from '@wix/sdk';
import { useMemo } from 'react';

export function useClient() {
    return useMemo(() => {
        return sdk.createClient({
            host: dashboard.host(),
            auth: dashboard.auth(),
            modules: {
                campaigns,
            },
        });
    }, []);
}
