import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import { 
  ResourceList, 
  ResourceItem,
  TextStyle,
  Thumbnail
} from '@shopify/polaris';

const GET_PRODUTS =  gql`
{
  products(first: 200) {
    edges {
      node {
        id
        title
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        } 
      }
    }
  }
}
`;

class ResourceListWithProducts extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-products',
      );
    };

    return (
      <Query query={GET_PRODUTS}>
        {({data, loading, error}) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          return (
            <ResourceList
              resourceName={{ singular: 'Product', plural: 'Products' }}
              items={data.products.edges}
              
              renderItem={(item) => {
                const media = (
                  <Thumbnail
                    source={
                      item.node.images.edges[0]
                        ? item.node.images.edges[0].node.originalSrc
                        : ''
                    }
                    alt={
                      item.node.images.edges[0]
                        ? item.node.images.edges[0].node.altText
                        : ''
                    }
                  />
                );
                return(
                  <ResourceItem
                    id={item.id}
                    accessibilityLabel={`View details for ${item.node.title}`}
                    media={media}
                    onClick={() => {
                      store.set('item', item);
                      console.log("clicked");
                      redirectToProduct();
                    }}
                  >
                    <h3>
                      <TextStyle variation="strong">{item.node.title}</TextStyle>
                    </h3>
                  </ResourceItem>
                )
              }}
            />
          );
        }}
      </Query>
    )
  }
}

export default ResourceListWithProducts;