import { Layout, Page, TextStyle, SettingToggle } from '@shopify/polaris';
import { addFormFields } from '../lib/metafields';

export default function Home() {
  return (
    <Page>
      {addFormFields()}
    </Page>
  )
}
