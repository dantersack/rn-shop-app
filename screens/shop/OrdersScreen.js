import React from 'react'
import { FlatList, Platform } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

export default function OrdersScreen() {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            renderItem={({item, index}) => (
                <OrderItem 
                    amount={item.totalAmount}
                    date={item.parsedDate}
                    lastChild={index + 1 === orders.length}
                    items={item.items}
                />
            )}
        />
    )
}

OrdersScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Your Orders',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
})