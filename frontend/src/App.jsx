import React from 'react'
import Router from './router'
import { AuthProvider } from './context/AuthContext'
import { BudgetProvider } from './context/BudgetContext'
import { NotificationProvider } from './context/NotificationContext'
import { SavingsProvider } from './context/SavingsContext'
import { SocketProvider } from './context/SocketContext'
import { ChamaProvider } from './context/ChamaContext'
import { DonationProvider } from './context/DonationContext'

function App() {
  return (
    <AuthProvider>
      <BudgetProvider>
        <SavingsProvider>
          <DonationProvider>
            <SocketProvider>
              <ChamaProvider>
                <NotificationProvider>
                  <Router />
                </NotificationProvider>
              </ChamaProvider>
            </SocketProvider>
          </DonationProvider>
        </SavingsProvider>
      </BudgetProvider>
    </AuthProvider>
  )
}

export default App;
