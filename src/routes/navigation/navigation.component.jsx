import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/card-dropdown/card-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; 
import { CartContext } from '../../contexts/cart.context';


const Navigation = () => {
       const {currentUser} = useContext(UserContext);
       const {isCartOpen}  = useContext(CartContext);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <div><CrwnLogo/></div>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                         <Link className='nav-link' to='/auth' onClick={signOutUser}>
                            SIGN OUT
                        </Link>
                        ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                        )
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <div>
                <Outlet />
            </div>
        </Fragment>
    );
}

export default Navigation;