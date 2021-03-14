import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'

export default function ProductItem({imageUrl, title, price, onSelect, ...props}) {
    let TouchableComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    } 

    return (
        <View style={styles.product}>
            <TouchableComponent onPress={onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: imageUrl}} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>${price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
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
        height: 300,
        margin: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    },
})