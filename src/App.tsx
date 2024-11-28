import { dashboard, useDashboard, withDashboard } from '@wix/dashboard-react';
import { Button, Card, Cell, Layout, Page, Table } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { campaigns } from '@wix/email-marketing';
import * as sdk from '@wix/sdk-react';
import { useCallback, useEffect, useMemo } from 'react';
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
  }, []);

  const fetchCampaigns = useCallback(() => {
    campaigns.listCampaigns({
      campaignType: campaigns.CampaignTypeEnum.EMAIL_MARKETING,
    }).then((result) => {
      console.log(result);
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
            <Card>
              <Card.Header title="Dashboard API" />
              <Card.Divider />
              <Card.Content>
                <Button onClick={() => openModal('be156542-c7c4-4ce6-b5a9-c1470570f5c6')}>Open Modal</Button>
                <Button onClick={() => openMediaManager()}>Open Media Manager</Button>
                <Button onClick={() => showToast({ message: 'You clicked me. Great success!' })}>Show Toast</Button>
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
