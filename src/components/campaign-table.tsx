import { useDashboard } from '@wix/dashboard-react';
import { Badge, Image, Table, TextButton } from '@wix/design-system';
import { useCallback } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';

export function CampaignTable() {
    const data = useCampaigns();
    const { navigate } = useDashboard();

    const openCampaign = useCallback((campaignId: string) => {
        navigate({ pageId: '2abbf001-de3d-4b60-a186-28afd3f4c7ac', relativeUrl: `?dl=/message&messageId=${campaignId}` });
    }, []);

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
                render: (row) => <TextButton size="small" onClick={() => openCampaign(row.campaignId!)}>{row.title}</TextButton>,
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
