import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

import { useSelector } from 'react-redux'

import colors from '../../constants/colors'

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
    
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryTotal}>${totalAmount.toFixed(2)}</Text></Text>
                <Button 
                    title='Order Now' 
                    onPress={() => {}}
                    color={colors.primary}
                    disabled={cartItems.length === 0}
                />
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    )
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 18,
    },
    summaryTotal: {
        fontFamily: 'open-sans-bold',
    },
})