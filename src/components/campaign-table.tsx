import { Badge, Image, Table } from '@wix/design-system';
import { useCampaigns } from '../hooks/useCampaigns';

export function CampaignTable() {
    const data = useCampaigns();

    return (
        <Table skin="standard" data={data} columns={[
            {
                title: 'Image',
                render: (row) => (
                    row.firstImageUrl && <Image width="64px" src={row.firstImageUrl} />
                ),
            },
            {
                title: 'Title',
                render: (row) => row.title,
            },
            {
                title: 'Status',
                render: (row) => <Badge size="small">{row.status}</Badge>
            },
            {
                title: 'Created At',
                render: (row) => row.dateCreated?.toLocaleString(),
            },
        ]} />
    );
}
