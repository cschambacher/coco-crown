import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {signOutStart} from '../../redux/user/user.actions'

import './header.styles.scss';

const Header = ({currentUser, hidden, signOutStart}) => (
    <div className='header'>
         <Link to='/'>
            CoCo <Logo className='logo'/>
         </Link>
         <div className='options'>
             <Link className='option' to='/shop'>
                 SHOP
             </Link>
             <Link className='option' to='/'>
                 CONTACT
             </Link>
             
            {
            currentUser ?(
                <div className='option' onClick={signOutStart}>
                    SIGN OUT
                </div>

            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
             <CartIcon />
         </div>
         {/* if only way we want to show dropdown is in header we can keep the functionality in header
         but here we potentially might want to do that from another component too so we need to move 
         functionality outside of header and inside of our global redux state  */}
         {
             hidden ? null :
            <CartDropdown/>
         }
    </div>
)
// state = rootReducer
const mstp = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
const mdtp = dispatch => ({
    signOutStart: ()=> dispatch(signOutStart()),
})
export default connect(mstp, mdtp)(Header);