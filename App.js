import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import productsReducer from './redux/reducers/productsReducer'

const rootReducer = combineReducers({
    products: productsReducer,
})

const store = createStore(rootReducer)

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.screen}>
                <Text>hello world</Text>
            </View>
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