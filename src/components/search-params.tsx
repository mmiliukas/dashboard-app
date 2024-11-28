import { Card, Table } from '@wix/design-system';
import { useMemo } from 'react';

type KeyValuePair = { key: string; value: string };

const columns = [
    {
        title: 'Param',
        render: (row: KeyValuePair) => row.key,
    },
    {
        title: 'Value',
        render: (row: KeyValuePair) => <pre style={{ whiteSpace: 'wrap', wordBreak: 'break-all' }}>{row.value}</pre>,
    },
];

export function SearchParams() {
    const searchParams = useMemo<KeyValuePair[]>(() => {
        const params = new URLSearchParams(window.location.search);
        const result = [...params.entries()].map(([key, value]) => {
            return { key, value }
        });
        if (params.has('instance')) {
            const [, instance] = params.get('instance')!.split('.');
            result.push({ key: 'instance', value: atob(instance) });
        }
        if (params.has('authorizationCode')) {
            const [, details, code] = params.get('authorizationCode')!.split('.');
            result.push({ key: 'authorizationCode[1]', value: atob(details) });
            result.push({ key: 'authorizationCode[2]', value: atob(code) });
        }
        return result
    }, []);


    return (
        <Card>
            <Card.Header title="Search parameters" />
            <Card.Divider />
            <Card.Content>
                <Table skin="standard" data={searchParams} columns={columns} />
            </Card.Content>
        </Card>
    )
}
