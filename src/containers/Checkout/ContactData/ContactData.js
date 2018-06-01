import React, {Component} from "react";
import styles from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    orderForm: {
      name: "",
      email: "",
      address: "",
      creditCardNum: "",
      deliveryMethod: "fastest"
    },
    isLoading: false
  }

  orderHandler = (event) => {
    event.preventDefault();  //prevent page from reloading
    this.setState({isLoading: true});

    const order = {
      ingredients: this.props.checkoutIngreds,
      price: this.props.checkoutPrice,
      orderData: this.state.orderForm
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
    console.log(event.target.validity);

    if(event.target.name === "name"){
      //don't allow user to enter excess whitespace between strings
      event.target.value = event.target.value.replace(/\s{2,}/g, " ");

      //using a regex so single spaces don't count as a whole string
      let numStrings = event.target.value.trim().split(/\s+/).length;
      if(numStrings < 2) {
        //custom error message
        event.target.setCustomValidity("Enter your first and last name");
      }
      else {
        event.target.setCustomValidity("");  //must specify this else
      }
    }

    if(event.target.name === "creditCardNum") {
      //using regex to only allow numbers to be entered
      event.target.value = event.target.value.replace(/[^0-9.]/g, "");
      if(event.target.validity.patternMismatch === true) {
        event.target.setCustomValidity("Enter 16 numbers without spaces or hyphens");
      }
      else {
        event.target.setCustomValidity("");
      }
    }

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
        <form onSubmit={this.orderHandler}>
          <input 
            className={styles.Input}
            type="text"
            name="name"
            placeholder="Your First and Last Name..."
            required
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="email"
            name="email"
            placeholder="Your Email..."
            required
            onChange={this.inputEnteredHandler} />
          <input
            className={styles.Input}
            type="text"
            name="address"
            placeholder="Street, City, Zip Code..."
            required
            onChange={this.inputEnteredHandler} />
          <input 
            className={styles.Input}
            type="text"
            name="creditCardNum"
            placeholder="Credit Card Number..."
            required
            pattern="\d{16}"  //looking for 16 digit numbers
            maxLength={16}
            onChange={this.inputEnteredHandler} />
            
          <select className={styles.Input} name="deliveryMethod" defaultValue={-1} onChange={this.inputEnteredHandler}>
            <option value="-1" disabled>Select a Delivery Method...</option>
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
          </select>
          
          <button
            className={[styles.Button, styles.Continue].join(" ")}
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