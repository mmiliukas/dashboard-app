import * as dashboard from '@wix/dashboard';
import { Card, Page, Table } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as sdk from '@wix/sdk';
import { useEffect, useMemo } from 'react';
import './App.css';

type KeyValuePair = { key: string; value: string };

const columns = [
  {
    title: 'Param',
    render: (row: KeyValuePair) => row.key,
  },
  {
    title: 'Value',
    render: (row: KeyValuePair) => row.value,
  },
];

function App() {
  const searchParams = useMemo<KeyValuePair[]>(() => {
    const params = new URLSearchParams(window.location.search);
    return [...params.entries()].map(([key, value]) => {
      return { key, value }
    });
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.app_sdk = sdk;
    // @ts-ignore
    window.app_dashboard = dashboard;
  }, []);

  return (
    <Page height="100vh">
      <Page.Header title="Dashboard App" />
      <Page.Content>
        <Card>
          <Card.Header title="Search parameters" />
          <Card.Divider />
          <Card.Content>
            <Table skin="standard" data={searchParams} columns={columns} />
          </Card.Content>
        </Card>
      </Page.Content>
    </Page>
  )
}

export default App
