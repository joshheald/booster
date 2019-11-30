import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Provider as AuthProvider } from './src/context/AuthContext'

import { setNavigator } from './src/navigationRef'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignUpScreen'
import WorkoutScreen from './src/screens/WorkoutScreen'
import WorkoutListScreen from './src/screens/WorkoutListScreen'
import AccountScreen from './src/screens/AccountScreen'
import TestScreen from './src/screens/TestScreen'

const workoutsListFlow = createStackNavigator({
  WorkoutList: WorkoutListScreen,
  Test: TestScreen
})

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    Workout: WorkoutScreen,
    Results: workoutsListFlow,
    Account: AccountScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  )
}