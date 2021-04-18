import React from 'react'
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native' 

import { LinearGradient } from 'expo-linear-gradient'

import colors from '../../constants/colors'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

export default function AuthScreen() {
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
                            onInputChange={() => {}}
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
                            onInputChange={() => {}}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Login' 
                                color={colors.primary} 
                                onPress={() => {}} 
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title='Switch to Sign Up'
                                color={colors.secondary}
                                onPress={() => {}}
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