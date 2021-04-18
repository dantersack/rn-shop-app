export const SIGNUP = 'SIGNUP'

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
            throw new Error('An error occurred')
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