import React from 'react'
import { FlatList, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import * as cartActions from '../../redux/actions/cartActions'
import ProductItem from '../../components/shop/ProductItem'

export default function ProductsOverviewScreen(props) {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={products}
            renderItem={({item}) => (
                <ProductItem 
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onViewDetail={() => props.navigation.navigate('ProductDetail', {productId: item.id, productTitle: item.title})}
                    onAddToCart={() => dispatch(cartActions.addToCart(item))}
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}