import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Removing strict mode in order to prevent the following error:
 * 1. api getting called twice
 * 2. ,,,
 * 3. ,,,
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
