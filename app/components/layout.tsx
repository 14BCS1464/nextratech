import ReduxProvider from './store/providers/ReduxProvider'
import './globals.css'

export const metadata = {
  title: 'Nexttratech',
  description: 'Handcrafted Indian-inspired chocolates',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}