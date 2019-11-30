import createDataContext from './createDataContext'
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
        case 'signup':
            return { token: action.payload, errorMessage: '' }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default: 
            return state
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('authtoken')
    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('WorkoutList')
    } else {
        navigate('loginFlow')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const signup = dispatch => async ({ email, password }) => {
    const tokenFromApi = 'madeuptoken'
    await AsyncStorage.setItem('authtoken', tokenFromApi)
    dispatch({ type: 'signup', payload: tokenFromApi })
    navigate('WorkoutList')
}

const signin = dispatch => async ({ email, password }) => {
    const tokenFromApi = 'madeuptoken'
    await AsyncStorage.setItem('authtoken', tokenFromApi)
    dispatch({ type: 'signin', payload: tokenFromApi })
    navigate('WorkoutList')
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('authtoken')
    dispatch({ type: 'signout' })
    navigate('loginFlow')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' } 
)