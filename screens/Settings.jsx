import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Button, Text, View, Switch, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { selectSettings, updateSettings } from '../store/reducer'

const initSettingsData = {
  habitProgress: false,
  dayProgress: false,
  showInActive: false,
  showCalendar: false
}

const Settings = () => {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)
  console.log(settings)

  const [data, setData] = useState(initSettingsData)

  const noChanged = Object.is(JSON.stringify(settings), JSON.stringify(data))
  console.log('noChanged:', noChanged)

  useEffect(() => {
    if (settings) {
      setData((state) => ({
        ...state,
        ...settings
      }))
    }
  }, [settings])

  const onChange = (value, name) => {
    setData((state) => ({
      ...state,
      [name]: value
    }))
  }

  const onSave = () => {
    dispatch(
      updateSettings({
        path: ['users', '9MGXEubvzNfrgMx9cng4'],
        data
      })
    )
      .unwrap()
      .then(() => {
        console.log('updateSettings success')
      })
  }

  return (
    <View className="flex-1 p-4">
      <Text className="mb-10">Settings</Text>

      <View className="flex flex-row items-center justify-between mb-4">
        <Text>Day progress</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={data.dayProgress ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => onChange(value, 'dayProgress')}
          value={data.dayProgress}
        />
      </View>

      <View className="flex flex-row items-center justify-between mb-4">
        <Text>Habit progress</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={data.habitProgress ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => onChange(value, 'habitProgress')}
          value={data.habitProgress}
        />
      </View>

      <View className="flex flex-row items-center justify-between mb-4">
        <Text>Show calendar</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={data.showCalendar ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => onChange(value, 'showCalendar')}
          value={data.showCalendar}
        />
      </View>

      <View className="flex flex-row items-center justify-between mb-4">
        <Text>Show inactive</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={data.showInActive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => onChange(value, 'showInActive')}
          value={data.showInActive}
        />
      </View>

      <Pressable
        className={clsx(
          'p-4 border rounded-xl bg-white mt-10',
          noChanged && 'opacity-40'
        )}
        onPress={onSave}
      >
        <Text className="text-center">Save</Text>
      </Pressable>
    </View>
  )
}

export default Settings
