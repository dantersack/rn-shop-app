import Product from '../../models/product'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const createProduct = (title, imageUrl, price = 0, description) => {
    return async dispatch => {
        const response = await fetch('https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
                title,
                imageUrl,
                price,
                description
            },
        })
    }
}

export const updateProduct = (productId, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        payload: {
            productId,
            title,
            imageUrl,
            description
        },
    }
}

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId: productId,
    }
}

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-a47f3-default-rtdb.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('An error occurred')
            }
    
            const data = await response.json()
    
            const fetchedProducts = []
    
            for (const key in data) {
                const {title, imageUrl, description, price} = data[key]
                fetchedProducts.push(new Product(key, 'u1', title, imageUrl, description, price))
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: fetchedProducts,
            })
        } catch (error) {
            throw error
        }
    }
}