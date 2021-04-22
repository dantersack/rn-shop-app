import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import * as ordersActions from '../../redux/actions/ordersActions'
import colors from '../../constants/colors'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

export default function OrdersScreen() {
    const [loading, setLoading] = useState(false)

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        dispatch(ordersActions.fetchOrders()).finally(() => setLoading(false))
    }, [dispatch])

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    }

    if (orders.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No orders found</Text>
            </View>
        )
    }

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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})