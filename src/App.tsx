import * as dashboard from '@wix/dashboard';
import { Card, Page, Text } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as sdk from '@wix/sdk';
import { useEffect } from 'react';
import './App.css';

function App() {

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
            <Text><pre>{window.location.search}</pre></Text>
          </Card.Content>
        </Card>
      </Page.Content>
    </Page>
  )
}

export default App
