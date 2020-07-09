import { Query, Mutation } from 'react-apollo';
import store from 'store-js';
import gql from 'graphql-tag';
import Rating from '@material-ui/lab/Rating';
import {
  AiFillEye, 
  AiFillEyeInvisible
} from 'react-icons/ai';
import {
  Heading,
  TextStyle,
  Card
} from '@shopify/polaris';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';


const GET_REVIEWS = gql`
  query Product($id: ID!){ 
    product(id: $id) {
      metafields(first: 30, namespace: "MenkReview") {
        edges {
          node {
            id
            key
            value
            valueType
            description
            legacyResourceId
          }
        }
      }
    }
  }
`;

const UPDATE_METAFIELD = gql`
  mutation($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        metafields(first: 100) {
          edges {
            node {
              id
              namespace
              key
              value
              description
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;


class EditProduct extends React.Component {
  state = {
    item: '',
    title: '',
    variantId: ''
  }

  componentDidMount() {
    this.setItem()
  }

  render() {
    const { title, variantId } = this.state;
    return(
      <Query query={GET_REVIEWS} variables={{id: variantId}}>
        {({data, loading, error}) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          return (
            <div style={{margin: "0 auto", width: "80%"}}>
              <div style={{margin: "20px"}}>
                <Heading>{title}</Heading>
              </div>
              <Card>
                <List>
                  {data.product.metafields.edges.map((value) => {
                    const json = JSON.parse(value.node.value)
                    return(
                      <ReviewTile 
                        json={json} 
                        key={value.node.key}
                        customerId={value.node.key} 
                        variantId={variantId} 
                      />
                    )
                  })}
                </List>
              </Card>
            </div>
          )
        }}
      </Query>
    );
  }
  setItem = () => {
    const item = store.get('item');
    const title = item.node.title;
    const variantId = item.node.id;
    this.setState({item, title, variantId});
  }
}

class ReviewTile extends React.Component {
  render() {
    return(
      <ListItem>
        <div className="main">
          <div style={{display: "flex"}}>
            <Rating name="half-rating" defaultValue={parseInt(this.props.json['evaluation'])} precision={1} />
            <p style={{marginLeft: "20px"}}>{this.props.json['name']}</p>
          </div>
          <h2>
            <TextStyle variation="strong">{this.props.json['title']}</TextStyle>
          </h2>
          <div>{this.props.json['content']}</div>
        </div>
        <ListItemSecondaryAction>
          <VisibilityButton 
            visibility={this.props.json['visibility']} 
            customerId={this.props.customerId}
            variantId={this.props.variantId}
            json={this.props.json}
          />
        </ListItemSecondaryAction>
      </ListItem>  
    )
  }
}

class VisibilityButton extends React.Component {
  
  setVariables = () => {
    let json = this.props.json
    if (this.props.visibility == "true") {
      json['visibility'] = "false"
    } else {
      json['visibility'] = "true"
    }
    console.log(json)
    let variables = {
      input : {
        id: this.props.variantId,
        metafields: [
          {
            namespace: "MenkReview",
            key: this.props.customerId,
            value: JSON.stringify(json),
            valueType: "JSON_STRING"
          }
        ]
      }
    }
    return variables
  }

  render() {
    return(
      <Mutation mutation={UPDATE_METAFIELD}>
        {(handleSubmit, {loading, error, data}) => {
          if (loading) {console.log(loading)}
          if (data) {console.log(data)}
          if (error) {console.log(error)}
          let icon
          if (this.props.visibility == "true") {
            icon = <AiFillEye size={32} />
          } else {
            icon = <AiFillEyeInvisible size={32} />
          }
          return (
            <IconButton 
              onClick={() => {
                let variables = this.setVariables()
                handleSubmit({
                  variables: variables
                })
              }}
            >
              {icon}
            </IconButton>
          )
        }}
      </Mutation>
    )
  }
}

export default EditProduct;