import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const createProduct = (title, imageUrl, price = 0, description) => {
    return async (dispatch, getState) => {
        const {token, userId} = getState().auth

        const response = await fetch(`https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ownerId: userId,
                title,
                imageUrl,
                price,
                description,
            })
        })

        const data = await response.json()

        dispatch({
            type: CREATE_PRODUCT,
            payload: {
                id: data.name,
                ownerId: userId,
                title,
                imageUrl,
                price,
                description
            },
        })
    }
}

export const updateProduct = (productId, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token

        const response = await fetch(`https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
            })
        })

        if (!response.ok) {
            throw new Error('An error occurred')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            payload: {
                productId,
                title,
                imageUrl,
                description
            },
        })
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token

        const response = await fetch(`https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('An error occurred')
        }

        dispatch({
            type: DELETE_PRODUCT,
            productId: productId,
        })
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        try {
            const response = await fetch('https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('An error occurred')
            }
    
            const data = await response.json()
    
            const fetchedProducts = []
    
            for (const key in data) {
                const {title, imageUrl, description, price, ownerId = 'u1'} = data[key]
                fetchedProducts.push(new Product(key, ownerId, title, imageUrl, description, price))
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: fetchedProducts,
                userProducts: fetchedProducts.filter(product => product.ownerId === userId),
            })
        } catch (error) {
            throw error
        }
    }
}