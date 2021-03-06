import { ADD_ORDER, SET_ORDERS } from '../actions/ordersActions'
import Order from '../../models/order'

const initialState = {
    orders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const {payload: {id, items, amount, date}} = action
            
            const newOrder = new Order(
                id,
                items,
                amount,
                date
            )

            return {
                ...state,
                orders: [...state.orders, newOrder]
            }
    
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            }

        default:
            return state
    }
}