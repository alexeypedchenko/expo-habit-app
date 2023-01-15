import { Provider } from 'react-redux'
import Navigation from './screens/Navigation'
import { store } from './store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
