import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions'
import { ADD_ORDER } from '../actions/ordersActions'
import { DELETE_PRODUCT } from '../actions/productsActions'
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
                    price
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
    
        case REMOVE_FROM_CART:
            const {productId} = action
            const selectedCartItem = state.items[productId]
            const updatedItems = {...state.items}

            if (selectedCartItem.quantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.price,
                    selectedCartItem.title,
                    selectedCartItem.sum - selectedCartItem.price,
                )
                updatedItems[productId] = updatedCartItem
            } else {
                delete updatedItems[productId]
            }

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - selectedCartItem.price,
            }

        case ADD_ORDER:
            return {
                ...initialState,
            }

        case DELETE_PRODUCT:
            const cartItems = {...state.items}
            
            if (!cartItems[action.productId]) {
                return {
                    ...state
                }
            }

            const deletedItem = state.items[action.productId]
            const updatedAmount = state.totalAmount - deletedItem.sum
            delete cartItems[action.productId]

            return {
                ...state,
                items: cartItems,
                totalAmount: updatedAmount,
            }

        default:
            return state
    }
}