import React, {Component} from "react";
import RealOrder from "../../components/RealOrder/RealOrder";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";

class MyOrders extends Component {
  state = {
    orders: [],
    isLoading: true
  }

  componentDidMount() {
    axios.get("./orders.json")
      .then(response => {
        const fetchedOrders = [];
        for(var key in response.data) {
          //push an object with all the original data and a new id field we made
          fetchedOrders.push({...response.data[key], id:key});
        }
        console.log(fetchedOrders);
        this.setState({isLoading: false, orders: fetchedOrders});
      })
      .catch(error => {
        this.setState({isLoading: false});
      });
  }
  
  render() {
    return (
      <div>
        {this.state.orders.map(ord => (
          <RealOrder
            key={ord.id}
            ingreds={ord.ingredients}
            price={ord.price}
          />
        ))}
      </div>
    );
  }
}

export default errorHandler(MyOrders, axios);