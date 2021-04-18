import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native' 

import { useDispatch } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../constants/colors'
import * as authActions from '../../redux/actions/authActions'
import Card from '../../components/UI/Card'
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

export default function AuthScreen() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error)
        }
    }, [error])

    const dispatch = useDispatch()

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    })

    const inputChangeHandler = useCallback((inputId, inputValue, inputValidity) => {
        formDispatch({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            inputId: inputId,
        })
    }, [formDispatch])

    const authHandler = async () => {
        let action
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email, 
                formState.inputValues.password
            )
        } else {
            action = authActions.login(
                formState.inputValues.email, 
                formState.inputValues.password
            )
        }
        setError(null)
        setLoading(true)
        try {
            await dispatch(action)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)        
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMsg='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorMsg='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {loading ? (
                                <ActivityIndicator size='small' color={colors.primary} />
                            ) : (
                                <Button 
                                    title={isSignup ? 'Signup' : 'Login'} 
                                    color={colors.primary} 
                                    onPress={authHandler} 
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Signup'}`}
                                color={colors.secondary}
                                onPress={() => setIsSignup(prevState => !prevState)}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
})