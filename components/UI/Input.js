import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        
        case INPUT_BLUR: {
            return {
                ...state,
                touched: true,
            }
        }
    
        default:
            return state
    }
}

export default function Input({
    label, 
    id, 
    initialValue, 
    initiallyValid, 
    onInputChange,
    errorMsg, 
    required,
    email,
    min,
    max,
    minLength,
    lastChild,
    ...props
}) {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue ? initialValue : '',
        isValid: initiallyValid,
        touched: false,
    })

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [id, inputState, onInputChange])

    const changeTextHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let isValid = true
        if (required && text.trim().length === 0) {
            isValid = false
        }
        if (email && !emailRegex.test(text.toLowerCase())) {
            isValid = false
        }
        if (min && +text < min) {
            isValid = false
        }
        if (max && +text > max) {
            isValid = false
        }
        if (minLength && text.length < minLength) {
            isValid = false
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    const lostFocusHandler = () => {
        dispatch({type: INPUT_BLUR})
    }

    return (
        <View style={{...styles.formControl, marginBottom: lastChild ? 5 : 20}}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={changeTextHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <Text style={styles.errorText}>{errorMsg}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'open-sans-bold',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorText: {
        fontFamily: 'open-sans',
        fontSize: 13,
        color: 'red',
    },
})