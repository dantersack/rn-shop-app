import React from 'react'
import { StyleSheet } from 'react-native'

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import productsReducer from './redux/reducers/productsReducer'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
    products: productsReducer,
})

const store = createStore(rootReducer)

export default function App() {
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