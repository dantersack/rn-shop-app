import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../constants/colors'
import { authenticate } from '../redux/actions/authActions'

export default function SplashScreen(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        const checkAuthData = async () => {
            const authData = await AsyncStorage.getItem('authData')

            if (!authData) {
                props.navigation.navigate('Auth')
                return
            }

            const parsedAuthData = JSON.parse(authData)
            const {token, userId, expirationDate} = parsedAuthData

            if (!token || !userId || new Date(expirationDate) <= new Date()) {
                await AsyncStorage.removeItem('authData')
                props.navigation.navigate('Auth')
                return
            }

            dispatch(authenticate(token, userId))
            props.navigation.navigate('Shop')
        }

        checkAuthData()
    }, [])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})