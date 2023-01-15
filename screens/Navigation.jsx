import * as SplashScreen from 'expo-splash-screen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { signInEmailPassword } from '../firebaseConfig'

import Login from './Login'
import Home from './Home'
import Habit from './Habit'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [appIsReady, setAppIsReady] = useState(true)

  useEffect(() => {
    SplashScreen.hideAsync()
    // signInEmailPassword({
    //   email: 'admin@mail.com',
    //   password: '000000'
    // })
    //   .then((user) => {
    //     const { email, uid } = user
    //     console.log('email:', email)
    //     console.log('uid:', uid)
    //   })
    //   .finally(() => {})
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="login" component={Login} /> */}
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: 'Simple Habits',
            headerBackVisible: false
          }}
        />
        <Stack.Screen
          name="habit"
          component={Habit}
          options={{
            title: 'Habit form'
            // headerBackVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
