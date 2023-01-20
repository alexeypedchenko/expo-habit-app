import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './Home'
import Profile from './Profile'
import Settings from './Settings'

const Tab = createBottomTabNavigator()
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarIcon: () => null,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '700',
          marginBottom: 5
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings'
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation
