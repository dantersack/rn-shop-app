import React, { useState } from 'react'
import { LogBox, StyleSheet } from 'react-native'

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import productsReducer from './redux/reducers/productsReducer'
import cartReducer from './redux/reducers/cartReducer'
import ordersReducer from './redux/reducers/ordersReducer'
import ShopNavigator from './navigation/ShopNavigator'

LogBox.ignoreLogs([/Your project is accessing the following APIs from a deprecated global/])

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts} 
                onFinish={() => setFontLoaded(true)} 
                onError={err => console.log(err)} 
            />
        )
    }

    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})