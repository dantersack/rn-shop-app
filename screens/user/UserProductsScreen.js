import React from 'react'
import { FlatList, Platform } from 'react-native'

import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function UserProductsScreen() {
    const userProducts = useSelector(state => state.products.userProducts)

    return (
        <FlatList
            data={userProducts}
            renderItem={({item}) => (
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                />
            )}
        />
    )
}

UserProductsScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Your Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Your Products'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
})