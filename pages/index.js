import { Layout, Page, TextStyle, SettingToggle, Button } from '@shopify/polaris';
import { addFormFields } from '../lib/metafields';

export default function Home() {
  return (
    <Page>
      <Layout>
        <Button onClick={addFormFields}>
          Enable
        </Button>
      </Layout>
    </Page>
  )
}
