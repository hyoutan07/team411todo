# Todo

## 概要
- Team411によるタスク進捗管理アプリである。
## アーキテクチャ仕様
### ミドルウェア
- フロントエンドとバックエンドを分離して開発
    - フロントエンド: Next.js(Web)
    - バックエンド: Django(AP, DB)
## バックエンド仕様
- Django REST FrameworkでREST API を構築
- api/register/
    - Userの登録に利用
- api/
    - 種々の機能を提供
- api/auth/
    - JWTの取得、更新に利用
## フロントエンド仕様
- Next.js
- デザインフレームワーク: mui使用
- index.tsx
    - ダッシュボードのページ
- /posts/login.tsx
    - ログインページ
- /posts/registar.tsx
    - アカウント登録画面
- /posts/create.tsx
    - タスク作成ページ
- /posts/detail/id.tsx
    - タスクの詳細ページ
- 今後開発予定
    - /posts/report.tsx
    - /posts/calender.tsx
    - /posts/paid.tsx
    - /posts/settings.tsx
    - /posts/timeline.tsx
    - /posts/profile.tsx

## 環境構築
```
pip install requirements.txt
```
## 起動
```
$ docker-compose build
$ docker-compose up -d
```
## 停止
```
$ docker-compose down
```