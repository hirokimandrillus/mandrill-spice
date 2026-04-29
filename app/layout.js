import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'MANDRILLスパイスコンパス | 食材からスパイスを発見',
  description: '食材を入れるだけでMANDRILLのスパイスの組み合わせをAIが提案。カレー・和食・韓国風など料理ジャンル別に最適なスパイスがわかる無料ツール。',
  keywords: 'スパイス,カレー,マンドリル,MANDRILL,スパイス組み合わせ,カレー粉,ガラムマサラ,スパイスカレー',
  openGraph: {
    title: 'MANDRILLスパイスコンパス | 食材からスパイスを発見',
    description: '食材を入れるだけでMANDRILLのスパイスの組み合わせをAIが提案。無料で使えます。',
    url: 'https://mandrill-spice.vercel.app/',
    siteName: 'MANDRILL SPICE COMPASS',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'MANDRILLスパイスコンパス',
    description: '食材からMANDRILLスパイスをAIが提案。無料で使えます。',
  },
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
