import { dashboard } from '@wix/dashboard';
import { useDashboard, withDashboard } from '@wix/dashboard-react';
import { Box, Button, Card, Cell, Image, Layout, Page, Table } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { campaigns } from '@wix/email-marketing';
import * as sdk from '@wix/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

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

function App() {
  const { showToast, openMediaManager, openModal } = useDashboard();
  const [list, setList] = useState<campaigns.Campaign[]>([]);

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

  useEffect(() => {
    // @ts-ignore
    window.app_sdk = sdk;
    // @ts-ignore
    window.app_dashboard = dashboard;
    // @ts-ignore
    window.app_campaigns = campaigns;
  }, []);

  const fetchCampaigns = useCallback(() => {
    const client = sdk.createClient({
      host: dashboard.host(),
      auth: dashboard.auth(),
      modules: {
        campaigns,
      },
    });

    return client.campaigns.listCampaigns({
      campaignType: campaigns.CampaignTypeEnum.EMAIL_MARKETING,
    }).then((result) => {
      setList(result.campaigns || []);
      return result;
    })
  }, []);

  return (
    <Page height="100vh">
      <Page.Header title="Dashboard App" />
      <Page.Content>
        <Layout cols={1}>
          <Cell span={1}>
            <Button onClick={fetchCampaigns}>Fetch campaigns</Button>
          </Cell>
          <Cell span={1}>
            <Table skin="standard" data={list} columns={[
              {
                title: 'Title',
                render: (row: campaigns.Campaign) => row.title,
              },
              {
                title: 'Status',
                render: (row: campaigns.Campaign) => row.status,
              },
              {
                title: 'Created At',
                render: (row: campaigns.Campaign) => row.dateCreated?.toLocaleString(),
              },
              {
                title: 'Image',
                render: (row: campaigns.Campaign) => (
                  row.firstImageUrl && <Image width="64px" src={row.firstImageUrl} />
                ),
              }
            ]} />
          </Cell>
          <Cell span={1}>
            <Card>
              <Card.Header title="Dashboard API" />
              <Card.Divider />
              <Card.Content>
                <Box gap="12px">
                  <Button size="small" onClick={() => openModal('be156542-c7c4-4ce6-b5a9-c1470570f5c6')}>Open Modal</Button>
                  <Button size="small" onClick={() => openMediaManager()}>Open Media Manager</Button>
                  <Button size="small" onClick={() => showToast({ message: 'You clicked me. Great success!' })}>Show Toast</Button>
                </Box>
              </Card.Content>
            </Card>
          </Cell>
          <Cell span={1}>
            <Card>
              <Card.Header title="Search parameters" />
              <Card.Divider />
              <Card.Content>
                <Table skin="standard" data={searchParams} columns={columns} />
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  )
}

export default withDashboard(App);
