import React from 'react'
import { Button, Platform, SafeAreaView, View } from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import colors from '../constants/colors'
import { logout } from '../redux/actions/authActions'
import SplashScreen from '../screens/SplashScreen'
import AuthScreen from '../screens/user/AuthScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>(
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions,
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>(
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions,
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =>(
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions,
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
}, {
    contentOptions: {
        activeTintColor: colors.primary,
    },
    contentComponent: props => {
        const dispatch = useDispatch()

        return (
            <View style={{flex: 1, paddingTop: 20, borderWidth: 1}}>
                <SafeAreaView 
                    forceInset={{top: 'always', horizontal: 'never'}} 
                    style={{flex: 1, justifyContent: 'space-between'}}
                >
                    <DrawerNavigatorItems {...props} />
                    <View style={{marginBottom: 20, marginHorizontal: 10}}>
                        <Button 
                            title='Logout' 
                            color={colors.primary} 
                            onPress={() => {
                                dispatch(logout())
                                props.navigation.navigate('Auth')
                            }} 
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen,
}, {
    defaultNavigationOptions: defaultNavOptions,
})

const MainNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)