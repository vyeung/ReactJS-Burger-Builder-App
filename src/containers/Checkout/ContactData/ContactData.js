import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import errorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import * as contactDataActions from "../../../store/actions/contactData-A";

class ContactData extends Component {
  state = {
    orderForm: {
      name: "",
      email: "",
      fullAddress: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      creditCardNum: "",
      deliveryMethod: "fastest"
    },
  }

  orderHandler = (event) => {
    event.preventDefault();  //prevent page from reloading

    //just need fullAddress in database, so will prevent following from being sent
    delete this.state.orderForm.street;
    delete this.state.orderForm.city;
    delete this.state.orderForm.state;
    delete this.state.orderForm.zip;

    const order = {
      ingredients: this.props.globalIngreds,
      price: this.props.globalTotalPrice,
      orderData: this.state.orderForm
    };

    this.props.onOrder(order);
  }

  inputEnteredHandler = (event) => {
    //console.log(event.target.value);
    //console.log(event.target.name);
    console.log(event.target.validity);

    if(event.target.name === "name") {
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
        event.target.setCustomValidity("Enter 16 digits without spaces or hyphens");
      }
      else {
        event.target.setCustomValidity("");
      }
    }

    if(event.target.name === "zip") {
      event.target.value = event.target.value.replace(/[^0-9.]/g, "");
      if(event.target.validity.patternMismatch === true) {
        event.target.setCustomValidity("Enter a 5 digit number");
      }
      else {
        event.target.setCustomValidity("");
      }
    }

    const updatedForm = {...this.state.orderForm};       //make copy
    updatedForm[event.target.name] = event.target.value; //do update
    this.setState({orderForm: updatedForm}, () => {
      //update fullAddress in callback function so it isn't 1 char behind
      updatedForm.fullAddress = 
        this.state.orderForm.street + "," +
        this.state.orderForm.city   + "," +
        this.state.orderForm.state  + "," +
        this.state.orderForm.zip;  
    }); 
  }

  render() {
    console.log(this.state.orderForm);
    
    let contactData;
    if(this.props.globalIsLoading === true) {
      contactData = <Spinner />
    }
    else {
      contactData = (
        <form onSubmit={this.orderHandler} >      
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
            style={{marginTop:"30px"}}
            type="text"
            name="street"
            placeholder="Street..."
            required
            onChange={this.inputEnteredHandler} />
          <input 
            className={[styles.Input, styles.City].join(" ")}
            type="text"
            name="city"
            placeholder="City..."
            required
            onChange={this.inputEnteredHandler} />
          <select 
            className={[styles.Input, styles.State].join(" ")} 
            name="state" required onChange={this.inputEnteredHandler}>
            <option value="">State...</option>
            <option value="AL">AL</option> <option value="AK">AK</option> <option value="AZ">AZ</option>
            <option value="AR">AR</option> <option value="CA">CA</option> <option value="CO">CO</option>
            <option value="CT">CT</option> <option value="DE">DE</option> <option value="FL">FL</option>
            <option value="GA">GA</option> <option value="HI">HI</option> <option value="ID">ID</option>
            <option value="IL">IL</option> <option value="IN">IN</option> <option value="IA">IA</option>
            <option value="KS">KS</option> <option value="KY">KY</option> <option value="LA">LA</option>
            <option value="ME">ME</option> <option value="MD">MD</option> <option value="MA">MA</option>
            <option value="MI">MI</option> <option value="MN">MN</option> <option value="MS">MS</option>
            <option value="MO">MO</option> <option value="MT">MT</option> <option value="NE">NE</option>
            <option value="NV">NV</option> <option value="NH">NH</option> <option value="NJ">NJ</option>
            <option value="NM">NM</option> <option value="NY">NY</option> <option value="NC">NC</option>
            <option value="ND">ND</option> <option value="OH">OH</option> <option value="OK">OK</option>
            <option value="OR">OR</option> <option value="PA">PA</option> <option value="RI">RI</option>
            <option value="SC">SC</option> <option value="SD">SD</option> <option value="TN">TN</option>
            <option value="TX">TX</option> <option value="UT">UT</option> <option value="VT">VT</option>
            <option value="VA">VA</option> <option value="WA">WA</option> <option value="WV">WV</option>
            <option value="WI">WI</option> <option value="WY">WY</option>
          </select>
          <input 
            className={[styles.Input, styles.Zip].join(" ")}
            text="text"
            name="zip"
            required
            placeholder="Zip..."
            pattern="\d{5}"
            maxLength={5}
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

const mapStateToProps = (state) => {
  return {
    globalIngreds: state.toBurgerBuilderReducer.ingredients,
    globalTotalPrice: state.toBurgerBuilderReducer.totalPrice,
    globalIsLoading: state.toContactDataReducer.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (orderData) => dispatch(contactDataActions.purchaseStart(orderData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));