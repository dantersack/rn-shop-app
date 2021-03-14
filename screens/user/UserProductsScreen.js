import React from 'react'
import { Button, FlatList, Platform } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as productActions from '../../redux/actions/productsActions'
import colors from '../../constants/colors'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function UserProductsScreen() {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={userProducts}
            renderItem={({item}) => (
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => {}}
                >
                    <Button 
                        title='Edit' 
                        onPress={() => {}} 
                        color={colors.primary} 
                    />
                    <Button 
                        title='Delete' 
                        onPress={() => dispatch(productActions.deleteProduct(item.id))} 
                        color={colors.primary} 
                    />
                </ProductItem>
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