import React from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import colors from '../../constants/colors'
import * as cartActions from '../../redux/actions/cartActions'

export default function ProductDetailScreen(props) {
    const productId = props.navigation.getParam('productId')
    
    const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}} />
            <View style={styles.button}>
                <Button 
                    title='Add to Cart'
                    onPress={() => dispatch(cartActions.addToCart(product))} 
                    color={colors.primary} 
                />
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    button: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})