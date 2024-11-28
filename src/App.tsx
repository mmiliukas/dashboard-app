import { withDashboard } from '@wix/dashboard-react';
import { Cell, Layout, Page } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import './App.css';
import { CampaignTable } from './components/campaign-table';
import { DashboardActions } from './components/dashboard-actions';
import { ParseInstance } from './components/parse-instance';
import { PingPong } from './components/ping-pong';
import { SearchParams } from './components/search-params';

function App() {
  return (
    <Page height="100vh">
      <Page.Header title="Dashboard App" />
      <Page.Content>
        <Layout cols={1}>
          <Cell span={1}>
            <ParseInstance />
          </Cell>
          <Cell span={1}>
            <PingPong />
          </Cell>
          <Cell span={1}>
            <DashboardActions />
          </Cell>
          <Cell span={1}>
            <CampaignTable />
          </Cell>
          <Cell span={1}>
            <SearchParams />
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  )
}

export default withDashboard(App);
