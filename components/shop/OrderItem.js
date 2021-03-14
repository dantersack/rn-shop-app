import React from 'react'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import colors from '../../constants/colors'
import CartItem from './CartItem'

export default function OrderItem({amount, date, lastChild, items}) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={[styles.orderItem, {marginBottom: lastChild ? 20 : 0}]}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button 
                title={showDetails ? 'Hide Details' : 'Show Details'} 
                onPress={() => setShowDetails(prevState => !prevState)}
                color={colors.primary}
            />
            {showDetails && (
                <View style={styles.detailsWrapper}>
                    {items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            title={cartItem.title}
                            amount={cartItem.price}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
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
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailsWrapper: {
        width: '100%',
    },
})