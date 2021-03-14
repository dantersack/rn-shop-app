import React from 'react'
import { Button, FlatList, Platform, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as cartActions from '../../redux/actions/cartActions'
import colors from '../../constants/colors'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function ProductsOverviewScreen(props) {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {productId: id, productTitle: title})
    }

    return (
        <FlatList
            data={products}
            renderItem={({item}) => (
                <ProductItem 
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => selectItemHandler(item.id, item.title)}
                >
                    <Button 
                        title='View Details' 
                        onPress={() => selectItemHandler(item.id, item.title)} 
                        color={colors.primary} 
                    />
                    <Button 
                        title='To Cart' 
                        onPress={() => dispatch(cartActions.addToCart(item))} 
                        color={colors.primary} 
                    />
                </ProductItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'All Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navigation.navigate('Cart')}
            />
        </HeaderButtons>
    )
})