import React from 'react'
import ToDoList from './pages/ToDoList'
import { Layout } from 'antd'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()

const { Content } = Layout

export const App = () => (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0' }}>
        <div>
          <ToDoList />
        </div>
      </Content>
    </Layout>
    </PersistGate>
  </Provider>
)

export default App
