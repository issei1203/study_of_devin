# セキュリティ訓練用システム

このシステムは社内セキュリティ勉強会用の攻撃練習環境です。

## 攻撃フロー

1. **ソースコードの確認**
   - `src/index.ts`の脆弱なエンドポイント`/vulnerable-login`を確認
   - SQLインジェクション脆弱性を特定

2. **パスワードハッシュリストの取得**
   ```bash
   npm run extract-passwords > password_list.csv
   ```

3. **SQLインジェクション攻撃の実行**
   - ブラウザで`http://localhost:8000/vulnerable-login`にアクセス
   - ユーザー名フィールドに以下を入力: `' OR '1'='1' --`
   - パスワードフィールドに任意の値を入力
   - ログインボタンをクリック

4. **ハッシュ値の逆引き**
   - 攻撃成功時に表示されるハッシュ値を`password_list.csv`で検索
   - 対応するパスワードを特定

5. **正規ログインの実行**
   - 特定したユーザー名とパスワードで再度ログイン
   - 攻撃成功

## 既知のテストアカウント

- user78 / Fnoa734r-wefd
- user1 / password123
- user5 / admin2024
- user10 / qwerty789
- その他多数（password_list.csvを参照）

## 脆弱性の詳細

`/vulnerable-login`エンドポイントでは以下の脆弱なSQLクエリが使用されています：

```sql
SELECT id, username, password_hash FROM users WHERE username = '${username}' AND password_hash = '${password}'
```

この実装では入力値のサニタイズが行われていないため、SQLインジェクション攻撃が可能です。

## 安全な実装との比較

`/login`エンドポイントでは以下の安全な実装が使用されています：

```sql
SELECT password_hash FROM users WHERE username = $1
```

パラメータ化クエリを使用することでSQLインジェクション攻撃を防いでいます。
