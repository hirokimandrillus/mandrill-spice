export const metadata = {
  title: 'MANDRILL SPICE COMPASS',
  description: '食材からMANDRILLスパイスを発見する',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
