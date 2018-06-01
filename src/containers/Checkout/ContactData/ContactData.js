import React, {Component} from "react";
import styles from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    orderForm: {
      name: "",
      email: "",
      street: "",
      zip: "",
      deliveryMethod: ""
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
        setTimeout(() => {
          this.setState({isLoading: false});
          this.props.history.push("/");  //go to homepage when done
        }, 2000);
      })
      .catch(error => {
        setTimeout(() => this.setState({isLoading: false}), 2000);
      });
  }

  inputEnteredHandler = (event) => {
    //console.log(event.target.value);
    //console.log(event.target.name);
    //console.log(event.target.placeholder);

    const updatedForm = {
      ...this.state.orderForm  //make copy
    };
    updatedForm[event.target.name] = event.target.value;  //do update
    this.setState({orderForm: updatedForm});  //setState
  }

  render() {
    console.log(this.state.orderForm);
    
    let contactData;
    if(this.state.isLoading === true) {
      contactData = <Spinner />
    }
    else {
      contactData = (
        <form action="">
          <input 
            className={styles.Input}
            type="text"
            name="name"
            placeholder="Your Name..." 
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="email"
            name="email"
            placeholder="Your Email..." 
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="text"
            name="street"
            placeholder="Street..."
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="text"
            name="zip"
            placeholder="Zip Code..."
            onChange={this.inputEnteredHandler} />
            
          <select className={styles.Input} name="delivery" defaultValue={-1} onChange={this.inputEnteredHandler}>
            <option value="-1" disabled>Select a Delivery Method...</option>
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
          </select>
          
          <button
            className={[styles.Button, styles.Continue].join(" ")}
            onClick={this.orderHandler}
            >Confirm and Pay</button>
        </form>
      );
    }

    return (
      <div className={styles.ContactData}>
        <h3 className={styles.Header}>Enter Your Contact Data</h3>
        {contactData}
      </div>
    );
  }
}

export default ContactData;