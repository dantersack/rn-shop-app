import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch('https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString(),
            })
        })

        if (!response.ok) {
            throw new Error('An error occurred')
        }

        const data = await response.json()

        dispatch({
            type: ADD_ORDER,
            payload: {
                id: data.name,
                items: cartItems,
                amount: totalAmount,
                date: date.toISOString(),
            }
        })
    }
}

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/orders/u1.json')

            if (!response.ok) {
                throw new Error('An error occurred')
            }
    
            const data = await response.json()
    
            const fetchedOrders = []
    
            for (const key in data) {
                const {cartItems, totalAmount, date} = data[key]
                fetchedOrders.push(new Order(key, cartItems, totalAmount, new Date(date)))
            }
    
            dispatch({
                type: SET_ORDERS,
                orders: fetchedOrders,
            })
        } catch (error) {
            throw error
        }
    }
}