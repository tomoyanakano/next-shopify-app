import { 
  Layout, 
  Page, 
  Button ,
  Frame,
  Loading
} from '@shopify/polaris';
import { addFormFields } from '../lib/metafields'

export default function Setting() {
  return(
    <Frame>
      <Page
        title="Setting"
      >
        <Layout>
          <Button onClick={addFormFields}>
            Enable
          </Button>
        </Layout>
      </Page>
    </Frame>
  )
}
