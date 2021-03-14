import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export default function CartItem({quantity, title, amount, onRemove}) {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.secondaryText}>{quantity}</Text>
                <Text style={styles.primaryText}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.primaryText}>${amount}</Text>
                {onRemove && <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    primaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    secondaryText: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginRight: 5,
    },
    deleteButton: {
        marginLeft: 20,
    },
    onRemove: {},
})