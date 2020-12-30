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
import {setCurrentUser}from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector';

class App extends React.Component{

  unsuscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if a user is signed in
      if (userAuth){
        // we get back userRef to use it to check if our db has updated 
        const userRef = await createUserProfileDocument(userAuth)

        // we get back a snapshot
        userRef.onSnapshot(snapShot => {
          // data method gets us the properties of the object
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
            // becuse setState is async if we want to log we need to pass 
            // a second function as a param
          // }, ()=>{console.log(this.state)})
        })
        
      }else{
        // if the user is loged out setState to null
        setCurrentUser(userAuth)
      }

    })
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mstp, mdtp)(App);
