import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { useSelector } from 'react-redux'

export default function ProductDetailScreen(props) {
    const productId = props.navigation.getParam('productId')

    const product = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <ScrollView>
            <Text>{product.title}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    }
}

const styles = StyleSheet.create({

})