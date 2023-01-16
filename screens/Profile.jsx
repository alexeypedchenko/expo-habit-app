import { Text, View, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { logout } from '../firebaseConfig'
import { selectUser } from '../store/reducer'

const Profile = () => {
  const { uid, email } = useSelector(selectUser)

  return (
    <View className="flex-1 px-4">
      <View className="my-10">
        <View className="mb-4 flex flex-row items-center">
          <Text className="text-xl font-bold mr-4">E-mail:</Text>
          <Text className="text-xl">{email}</Text>
        </View>
        <View className="mb-4 flex flex-row items-center">
          <Text className="text-xl font-bold mr-4">ID:</Text>
          <Text className="text-sm whitespace-pre">{uid}</Text>
        </View>
      </View>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  )
}

export default Profile
