import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {NavigationContainer, LogoContainer, NavLinks, NavLink } from'./navigation.styles.js';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; 
import { CartContext } from '../../contexts/cart.context';


const Navigation = () => {
       const {currentUser} = useContext(UserContext);
       const {isCartOpen}  = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className='logo-container' to='/'>
                    <div><CrwnLogo/></div>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                         <NavLink  as='span' to='/auth' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                        ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <div>
                <Outlet />
            </div>
        </Fragment>
    );
}

export default Navigation;