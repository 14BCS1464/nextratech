import ReduxProvider from './lib/store/ReduxProvider'
import './globals.css'

export const metadata = {
  title: 'Nexttratech',
  description: 'Logic solution Private Limited',
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