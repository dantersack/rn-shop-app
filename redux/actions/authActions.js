export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsfvAlZjqk-Sb8snW2RxuONBEU0TVUR7g',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            const {error: {message}} = errorData
            switch (message) {
                case 'EMAIL_EXISTS':
                    throw new Error('User already exists')
                
                default:
                    throw new Error('An error occurred')
            }
        }

        const data = await response.json()

        console.log(data)

        dispatch({
            type: SIGNUP,
            //email: email,
            //password: password,
        })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsfvAlZjqk-Sb8snW2RxuONBEU0TVUR7g',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            const {error: {message}} = errorData
            switch (message) {
                case 'EMAIL_NOT_FOUND':
                    throw new Error('User does not exist')
                
                case 'INVALID_PASSWORD':
                    throw new Error('Wrong password')
                
                default:
                    throw new Error('An error occurred')
            }
        }

        const data = await response.json()

        console.log(data)

        dispatch({
            type: LOGIN,
            //email: email,
            //password: password,
        })
    }
}