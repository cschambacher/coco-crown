import React from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'

import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  unsuscribeFromAuth = null

  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if a user is signed in
      if (userAuth){
        // we get back userRef to use it to check if our db has updated 
        const userRef = await createUserProfileDocument(userAuth)

        // we get back a snapshot
        userRef.onSnapshot(snapShot => {
          // data method gets us the properties of the object
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
            // becuse setState is async if we want to log we need to pass 
            // a second function as a param
          // }, ()=>{console.log(this.state)})
        })
        
      }else{
        // if the user is loged out setState to null
        this.setState({currentUser: userAuth})
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
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
    
  }
}

export default App;
