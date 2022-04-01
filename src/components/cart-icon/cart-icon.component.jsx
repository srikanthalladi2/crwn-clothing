import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () =>{

      const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
      const ToggleIsCartOpen = () => {setIsCartOpen(!isCartOpen)}
    return(
        <div className='cart-icon-container' onClick={ToggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;