import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationContextProvider } from './components/contexts/notification-context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <Router>
      <App />
    </Router>
    ,
  </NotificationContextProvider>
)
