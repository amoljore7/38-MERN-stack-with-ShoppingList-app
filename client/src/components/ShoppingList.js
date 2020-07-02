import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemAction';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getItems();
  }
 
  onDeleteClick = (id) => {
    console.log(">>>>>>>>>>>>>>>>",id);
    this.props.deleteItem(id);
  }
  render() {
    // Destructuring
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="small"
                    onClick={ ()=> this.onDeleteClick(_id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes ={
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
  item: state.item
})


export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
