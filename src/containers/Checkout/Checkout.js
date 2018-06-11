import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import CheckoutSummary from "../../components/RealOrder/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component 
{
  componentDidMount() {
    //redirect to "/" if on checkout page and have no ingredients.
    //also takes care of case when user types /checkout into url.
    if(this.props.location.state === undefined) {
      this.props.history.push("/");
    }
    // else {
    //   this.setState({checkoutIngreds: this.props.location.state.ingredients});
    //   this.setState({checkoutPrice: this.props.location.state.totalPrice});
    // }
  }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <CheckoutSummary 
          checkoutIngreds={this.props.globalIngreds}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />

        <Route 
          path={this.props.match.url + "/contact-data"} 
          component={ContactData}
          //for reference: pass the match,history,location object to ContactData as well
          //render={(props) => <ContactData checkoutIngreds={this.state.checkoutIngreds} checkoutPrice={this.state.checkoutPrice} {...props}/>}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalIngreds: state.toBurgerBuilderReducer.ingredients
  };
}

//Note: don't need mapDispatchToProps since this component doesn't need to dispatch anything

export default connect(mapStateToProps)(Checkout);