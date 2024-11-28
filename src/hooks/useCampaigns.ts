import { campaigns } from '@wix/email-marketing';
import { useEffect, useState } from 'react';
import { useClient } from './useClient';

type Campaign = campaigns.Campaign;

const CampaignTypeEnum = campaigns.CampaignTypeEnum

export function useCampaigns(): Campaign[] {
    const client = useClient();

    const [list, setList] = useState<Campaign[]>([]);

    useEffect(() => {
        client
            .campaigns
            .listCampaigns({
                campaignType: CampaignTypeEnum.EMAIL_MARKETING,
            })
            .then((result) => {
                setList(result.campaigns || []);
            })
    }, []);

    return list;
}