import React, { useCallback, useEffect, useReducer } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as productsActions from '../../redux/actions/productsActions'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const udpatedValues = {
            ...state.inputValues,
            [action.inputId]: action.value,
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.isValid,
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            ...state,
            inputValues: udpatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid,
        }
    }
    return state
}

export default function EditProductScreen(props) {
    const productId = props.navigation.getParam('productId')

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    })
    
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input', 'Please check the errors in the form.')
            return
        }
        const {title, imageUrl, price, description} = formState.inputValues
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, imageUrl, description))
        } else {
            dispatch(productsActions.createProduct(title, imageUrl, +price, description))
        }
        props.navigation.goBack()
    }, [dispatch, productId, formState])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputId, inputValue, inputValidity) => {
        formDispatch({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            inputId: inputId,
        })
    }, [formDispatch])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label='Title'
                    id='title'
                    errorMsg='Please enter a valid title'
                    autoCorrect
                    returnKeyType='next'
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={editedProduct}
                    onInputChange={inputChangeHandler}
                    required
                />
                <Input
                    label='Image URL'
                    id='imageUrl'
                    errorMsg='Please enter a valid image URL'
                    returnKeyType='next'
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={editedProduct}
                    onInputChange={inputChangeHandler}
                    required
                />
                {!editedProduct && (
                    <Input
                        label='Price'
                        id='price'
                        errorMsg='Please enter a valid price'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        required
                        min={0.01}
                    />
                )}
                <Input
                    label='Description'
                    id='description'
                    errorMsg='Please enter a valid description'
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={editedProduct}
                    onInputChange={inputChangeHandler}
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    required
                    minLength={5}
                    lastChild
                />
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
})