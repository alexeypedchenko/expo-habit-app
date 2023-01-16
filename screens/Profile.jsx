import { Text, View, Button } from 'react-native'
import { logout } from '../firebaseConfig'

const Profile = () => {
  return (
    <View className="flex-1 px-4">
      <Text className="text-center">Profile</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  )
}

export default Profile
