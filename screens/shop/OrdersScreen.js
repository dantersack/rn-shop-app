import React from 'react'
import { FlatList, Platform, Text } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function OrdersScreen() {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList
            data={orders}
            renderItem={({item}) => <Text>{item.totalAmount}</Text>}
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