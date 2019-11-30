import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import Link from '../components/Link'

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm 
                headerText="Sign In to Booster"
                errorMessage={state.errorMessage}
                submitText="Sign in"
                onSubmit={({ email, password }) => signin({ email, password })}
            />
            <Link 
                linkText="Don't have an account? Sign up instead."
                targetScreen='Signup'
            />
        </View>
    )
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen