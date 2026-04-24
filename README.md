# MANDRILL SPICE COMPASS

食材からMANDRILLスパイスの組み合わせを提案するアプリです。

## 公開手順

### 1. GitHubにアップする
1. [github.com](https://github.com) でアカウント作成
2. 「New repository」でリポジトリ作成（名前: mandrill-spice）
3. このフォルダのファイルを全部アップロード

### 2. Vercelにデプロイする
1. [vercel.com](https://vercel.com) でGitHubアカウントでログイン
2. 「Add New Project」→ GitHubのmandrill-spiceを選択
3. 「Environment Variables」に以下を追加：
   - Key: `ANTHROPIC_API_KEY`
   - Value: あなたのAnthropicのAPIキー
4. 「Deploy」を押す → URLが発行される！

## APIキーの取得
[console.anthropic.com](https://console.anthropic.com) でAPIキーを取得してください。
