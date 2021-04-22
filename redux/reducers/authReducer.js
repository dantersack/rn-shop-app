import { LOGIN, SIGNUP } from '../actions/authActions'

const initialState = {
    token: null,
    userId: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
            }
    
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId,
            }

        default:
            return state
    }
}