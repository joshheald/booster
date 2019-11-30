import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import Link from '../components/Link'

const SignupScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm 
                headerText="Sign Up for Booster"
                errorMessage={state.errorMessage}
                submitText="Sign up"
                onSubmit={({ email, password }) => signup({ email, password })}
            />
            <Link 
                linkText="Don't have an account? Sign in instead."
                targetScreen='Signin'
            />
        </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
        header: null,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
    }
})

export default SignupScreen