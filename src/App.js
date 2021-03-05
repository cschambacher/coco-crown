import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'

import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import { selectCurrentUser } from './redux/user/user.selector';
import {checkUserSession} from './redux/user/user.actions'

class App extends React.Component{

  unsuscribeFromAuth = null

  componentDidMount(){
    const { checkUserSession } = this.props;

    checkUserSession();

    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render (){
    // console.log(this.state)
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={()=> 
            this.props.currentUser ? (
            <Redirect to='/'/>
            ) : (
            <SignInAndSignUp/>
          )}/>
        </Switch>
      </div>
    );
    
  }
}
const mstp = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mdtp = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mstp, mdtp)(App);
