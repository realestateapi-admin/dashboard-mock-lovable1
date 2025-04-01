
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AccountExecutiveProvider } from './contexts/AccountExecutiveContext.tsx'

createRoot(document.getElementById("root")!).render(
  <AccountExecutiveProvider>
    <App />
  </AccountExecutiveProvider>
);
