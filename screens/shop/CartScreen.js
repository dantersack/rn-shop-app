import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import * as cartActions from '../../redux/actions/cartActions'
import * as ordersActions from '../../redux/actions/ordersActions'
import colors from '../../constants/colors'
import Card from '../../components/UI/Card'
import CartItem from '../../components/shop/CartItem'

export default function CartScreen() {
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const itemsArray = []
        for (const key in state.cart.items) {
            itemsArray.push({
                productId: key,
                ...state.cart.items[key],
            })
        }
        return itemsArray
    })
    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryTotal}>${+totalAmount.toFixed(2)}</Text></Text>
                <Button 
                    title='Order Now' 
                    onPress={() => dispatch(ordersActions.addOrder(cartItems, totalAmount))}
                    color={colors.primary}
                    disabled={cartItems.length === 0}
                />
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={({item}) => (
                    <CartItem
                        quantity={item.quantity}
                        title={item.title}
                        amount={item.sum.toFixed(2)}
                        onRemove={() => dispatch(cartActions.removeFromCart(item.productId))}
                    />
                )}
            />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 18,
    },
    summaryTotal: {
        fontFamily: 'open-sans-bold',
    },
})