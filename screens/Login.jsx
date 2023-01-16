import { View, Text, Button } from 'react-native'
import { signInEmailPassword } from '../firebaseConfig'

const Login = ({ navigation }) => {
  const onLogin = () => {
    signInEmailPassword({
      email: 'admin@mail.com',
      password: '000000'
    })
      .then((user) => {
        const { email, uid } = user
        console.log('email:', email)
        console.log('uid:', uid)
      })
      .finally(() => {})
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>

      <Button title="Login" onPress={() => onLogin()} />
      <Button title="Go to home" onPress={() => navigation.navigate('home')} />
    </View>
  )
}

export default Login
