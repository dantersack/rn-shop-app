import { ADD_TO_CART } from '../actions/cartActions'
import CartItem from '../../models/cartItem'

const initialState = {
    items: {},
    totalAmount: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const {id, price, title} = action.product
            
            let cartItem
            
            if (state.items[id]) {
                cartItem = new CartItem(
                    state.items[id].quantity + 1, 
                    price, 
                    title, 
                    state.items[id].sum + price
                )
            } else {
                cartItem = new CartItem(
                    1, 
                    price, 
                    title, 
                    1
                )
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: cartItem,
                },
                totalAmount: state.totalAmount + price,
            }
    
        default:
            return state
    }
}