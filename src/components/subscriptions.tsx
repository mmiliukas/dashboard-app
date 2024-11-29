import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

export function Subscriptions() {
    const fetch = useFetch();

    useEffect(() => {
        fetch('/subscriptions').then(result => {
            console.log(result);
        }).catch(error => {
            console.error(error);
        });
    }, [fetch]);

    return <div>Subscriptions</div>
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
}
