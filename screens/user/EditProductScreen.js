import React, { useCallback, useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as productsActions from '../../redux/actions/productsActions'
import CustomHeaderButton from '../../components/UI/HeaderButton'

export default function EditProductScreen(props) {
    const productId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()
    
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState(editedProduct ? editedProduct.price.toFixed(2) : '')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, imageUrl, description))
        } else {
            dispatch(productsActions.createProduct(title, imageUrl, +price, description))
        }
        props.navigation.goBack()
    }, [dispatch, productId, title, imageUrl, price, description])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {!editedProduct && (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput 
                            style={styles.input} 
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, {marginBottom: 5}]} 
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = ({navigation}) => {
    const submitFunction = navigation.getParam('submit')
    return {
        headerTitle: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFunction}
                />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 4,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})