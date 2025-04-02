
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render the App component without React.StrictMode (it's now in App.tsx)
createRoot(document.getElementById("root")!).render(<App />);
