import { View, Text, Button } from 'react-native'

const Login = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>

      <Button title="Go to home" onPress={() => navigation.navigate('home')} />
    </View>
  )
}

export default Login
