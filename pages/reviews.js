import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { 
  Card, 
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

export default function reviewsIndex() {
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
              console.log(item)
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