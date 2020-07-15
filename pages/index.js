import { 
  Page, 
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react'

class Home extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToSetting = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/setting',
      );
    };


    return (
      <Page>
        <TitleBar 
          primaryAction={{
            content: 'Setting',
            onAction: () => {
              redirectToSetting()
            }
          }}
        />
      </Page>
    )
  }
}

export default Home