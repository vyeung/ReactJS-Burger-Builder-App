import React, {Component} from "react";
import styles from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zip: ""
    },
    isLoading: false
  }

  orderHandler = (event) => {
    //prevent page from reloading
    event.preventDefault();

    this.setState({isLoading: true});

    const order = {
      ingredients: this.props.checkoutIngreds,
      price: this.props.checkoutPrice,
      customer: {
        name: "John Smith",
        address: {
          city: "testville",
          street: "Test Ave 11",
          zip: 54323,
          country: "USA"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    //adding .json on the end is required when using firebase
    axios.post("/orders.json", order)
      //show spinner for at least 2s even if post request is finished first 
      .then(response => {
        setTimeout(() => this.setState({isLoading: false}), 2000);
      })
      .catch(error => {
        setTimeout(() => this.setState({isLoading: false}), 2000);
      });
  }

  render() {
    let contactData;
    if(this.state.isLoading === true) {
      contactData = <Spinner />
    }
    else {
      contactData = (
        <form action="">
          <input className={styles.Input} type="text" name="name" placeholder="Your Name..." />
          <input className={styles.Input} type="email" name="email" placeholder="Your Email..." />
          <input className={styles.Input} type="text" name="street" placeholder="Street..." />
          <input className={styles.Input} type="text" name="zip" placeholder="Zip Code..." />
          <button
            className={[styles.Button, styles.Continue].join(" ")}
            onClick={this.orderHandler}
            >Confirm and Pay</button>
        </form>
      );
    }

    return (
      <div className={styles.ContactData}>
      <h4>Enter Your Contact Data</h4>
        {contactData}
      </div>
    );
  }
}

export default ContactData;