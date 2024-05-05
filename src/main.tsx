import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './app/store/store'
import { RouterApp } from './app/router/Router'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterApp />
    </Provider>
)
