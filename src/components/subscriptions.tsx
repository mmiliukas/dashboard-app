import { Button, Card, FormField, Input } from '@wix/design-system';
import { useCallback, useEffect, useState } from 'react';
import { useFetch, usePost } from '../hooks/useFetch';

export function Subscriptions() {
    const fetch = useFetch();
    const post = usePost();

    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        fetch('/subscriptions').then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }, [fetch]);

    const subscribe = useCallback(() => {
        post('/subscriptions', { email }).then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }, [fetch, email]);

    return (
        <Card>
            <Card.Header title="Subscriptions" />
            <Card.Divider />
            <Card.Content>
                <FormField label="Email">
                    <Input value={email} onChange={e => setEmail(e.target.value)} />
                </FormField>"
                <Button size="small" priority="secondary" onClick={subscribe}>Subscribe</Button>
            </Card.Content>
        </Card>
    );
}
// return (
//     <Table skin="standard" data={[]} columns={[
//         {
//             title: 'Image',
//             render: (row) => (
//                 row.firstImageUrl && <Image width="64px" src={row.firstImageUrl} />
//             ),
//         },
//         {
//             title: 'Title',
//             render: (row) => <TextButton size="small" onClick={() => openCampaign(row.campaignId!)}>{row.title}</TextButton>,
//         },
//         {
//             title: 'Status',
//             render: (row) => <Badge size="small">{row.status}</Badge>
//         },
//         {
//             title: 'Created At',
//             render: (row) => row.dateCreated?.toLocaleString(),
//         },
//     ]} />
// );
// }
