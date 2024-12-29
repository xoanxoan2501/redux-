import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { persistor, store } from './redux/store.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <App />
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
