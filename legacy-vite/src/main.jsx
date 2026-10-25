import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("React Error Caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'var(--text-primary, white)', backgroundColor: 'var(--bg-primary, black)', padding: '4rem 2rem', height: '100vh', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-color, cyan)', marginBottom: '1rem' }}>Application Error</h1>
          <p style={{ color: 'var(--text-secondary, gray)' }}>We encountered an unexpected error while rendering this page.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid var(--accent-color)', color: 'white', cursor: 'pointer', borderRadius: '8px' }}>
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
