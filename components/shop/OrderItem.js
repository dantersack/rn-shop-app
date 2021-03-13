import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import colors from '../../constants/colors'

export default function OrderItem({amount, date, lastChild}) {
    return (
        <View style={[styles.orderItem, {marginBottom: lastChild ? 20 : 0}]}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button 
                title='Show Details' 
                onPress={() => {}}
                color={colors.primary}
            />
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
})