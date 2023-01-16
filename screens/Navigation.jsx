import { useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

import Login from './Login'
import Home from './Home'
import Habit from './Habit'
import Profile from './Profile'

import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../store/reducers/main'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  console.log('user:', user)
  const [isAuth, setIsAuth] = useState(false)
  const [appIsReady, setAppIsReady] = useState(true)

  useEffect(() => {
    const authStateUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid, email } = user
        dispatch(setUser({ uid, email }))
      } else {
        dispatch(setUser(null))
      }
    })

    SplashScreen.hideAsync()

    return () => {
      authStateUnsubscribe()
    }
  }, [])

  return (
    <NavigationContainer>
      <>
        <Stack.Navigator initialRouteName="login">
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={Login} />
            </>
          )}
        </Stack.Navigator>
      </>
    </NavigationContainer>
  )
}

export default Navigation

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// const Tab = createBottomTabNavigator()
{
  /* <Tab.Navigator
  // initialRouteName="Feed"
  screenOptions={{
    tabBarActiveTintColor: '#e91e63'
  }}
>
  <Tab.Screen
    name="profile"
    component={Profile}
    options={{
      tabBarLabel: 'Profile'
    }}
  />
</Tab.Navigator> */
}
