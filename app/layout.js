import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'MANDRILL SPICE COMPASS',
  description: '食材からMANDRILLスパイスを発見する',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
