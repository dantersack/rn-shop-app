import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as cartActions from '../../redux/actions/cartActions'
import * as productsActions from '../../redux/actions/productsActions'
import colors from '../../constants/colors'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function ProductsOverviewScreen(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const fetchProducts = useCallback(async () => {
        setError(null)
        setLoading(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }, [dispatch, setLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', fetchProducts)
        
        return () => willFocusSub.remove()
    }, [fetchProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {productId: id, productTitle: title})
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.text}>An error occurred</Text>
                <Button
                    title='Try again'
                    onPress={fetchProducts}
                    color={colors.primary}
                />
            </View>
        )
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
    }

    if (!loading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={products}
            renderItem={({item}) => (
                <ProductItem 
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => selectItemHandler(item.id, item.title)}
                >
                    <Button 
                        title='View Details' 
                        onPress={() => selectItemHandler(item.id, item.title)} 
                        color={colors.primary} 
                    />
                    <Button 
                        title='To Cart' 
                        onPress={() => dispatch(cartActions.addToCart(item))} 
                        color={colors.primary} 
                    />
                </ProductItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'All Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navigation.navigate('Cart')}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 10,
    },
})