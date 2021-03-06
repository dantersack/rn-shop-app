//import PRODUCTS from '../../data/dummy-data'
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/productsActions'
import Product from '../../models/product'

const initialState = {
    availableProducts: [],
    userProducts: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const {
                id: npId,
                ownerId: npOwnerId,
                title: npTitle, 
                imageUrl: npImageUrl, 
                description: npDescription, 
                price: npPrice
            } = action.payload
            
            const newProduct = new Product(
                npId,
                npOwnerId,
                npTitle,
                npImageUrl,
                npDescription,
                npPrice
            )

            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct],
            }

        case UPDATE_PRODUCT:
            const {
                productId: epProductId,
                title: epTitle, 
                imageUrl: epImageUrl, 
                description: epDescription, 
            } = action.payload

            const productIndex = state.userProducts.findIndex(product => product.id === epProductId)

            const updatedProduct = new Product(
                epProductId,
                state.userProducts[productIndex].ownerId,
                epTitle,
                epImageUrl,
                epDescription,
                state.userProducts[productIndex].price,
            )

            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct

            const availableProductIndex = state.availableProducts.findIndex(product => product.id === epProductId)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }
        
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
            }

        case SET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts,
            }
    
        default:
            return state
    }
}