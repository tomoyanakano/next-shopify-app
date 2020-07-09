import { Query } from 'react-apollo';
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
                      <ReviewTile json={json} id={value.node.key} />
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
  
  constructor(props) {
    super(props);
    let visibility
    if (this.props.json['visibility'] == 'true') {
      visibility = true
    } else {
      visibility = false
    }
    this.state = {
      visibility: visibility
    }
  }

  changeVisibility = () => {
    console.log(this.state.visibility)
  }

  render() {
    let visibilityIcon 
    if (this.state.visibility) {
      visibilityIcon = <AiFillEye size={32} />
    } else {
      visibilityIcon = <AiFillEyeInvisible size={32} />
    }
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
          <IconButton edge="end" aria-label="changeVisibility">
            {visibilityIcon}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}


export default EditProduct;