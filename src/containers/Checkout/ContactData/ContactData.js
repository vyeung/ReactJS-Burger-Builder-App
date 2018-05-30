import React, {Component} from "react";
import styles from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zip: ""
    }
  }

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form action="">
          <input className={styles.Input} type="text" name="name" placeholder="Your Name..." />
          <input className={styles.Input} type="email" name="email" placeholder="Your Email..." />
          <input className={styles.Input} type="text" name="street" placeholder="Street..." />
          <input className={styles.Input} type="text" name="zip" placeholder="Zip Code..." />

          <button
            className={[styles.Button, styles.Continue].join(" ")}
            onClick={this.props.checkoutContinued}
            >Confirm and Pay</button>
        </form>
      </div>
    );
  }
}

export default ContactData;