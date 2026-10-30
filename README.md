# NRIO Lab 實驗室網站

以 [Astro](https://astro.build) 產生靜態網頁（對 SEO 友善），部署在 GitHub Pages，
內容透過 [Sveltia CMS](https://github.com/sveltia/sveltia-cms) 後台編輯，不需要資料庫或主機。

- 前台：`https://adakuo616.github.io/NRIOLab/`（英文版在 `/en/`）
- 後台：`https://adakuo616.github.io/NRIOLab/admin/`

## 第一次設定（只需做一次）

1. 把這個分支合併到 `main`。
2. GitHub 專案 → **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
3. 等 Actions 跑完（約 1–2 分鐘），網站就上線了。
4. 登入後台：
   - 到 GitHub → Settings → Developer settings → **Fine-grained personal access tokens** 建立一組 token，
     Repository access 只選 `NRIOLab`，Permissions → **Contents: Read and write**。
   - 開啟 `/admin/`，選「Sign In with Token」，貼上 token。
   - 其他要幫忙更新的成員，請把他們加為 repo collaborator，各自建立自己的 token。

## 日常更新

| 要改什麼 | 後台位置 | 檔案位置 |
|---|---|---|
| 新增／修改消息 | 最新消息 → New | `src/content/news/*.md` |
| 指導教授 | 頁面內容 → 指導教授 | `src/data/professor.json` |
| 研究團隊 | 頁面內容 → 研究團隊 | `src/data/members.json` |
| 生活點滴（相簿） | 頁面內容 → 生活點滴 | `src/data/life.json` |
| 過往成果 | 頁面內容 → 過往成果 | `src/data/publications.json` |
| 研究方向（顯示在實驗室介紹頁） | 頁面內容 → 研究方向 | `src/data/research.json` |
| 名稱、實驗室介紹、LOGO、橫幅、聯絡資訊、SEO 簡介 | 網站設定 | `src/data/site.json` |
| 色系 | （改程式） | `src/styles.css` 最上方 `:root` |

消息分類選「研討會」會顯示橘色【研討會】，選「賀！」會顯示紅色【賀！】，與原網站相同。

按「儲存」後會自動 commit，GitHub Actions 會重建網站，約 1–2 分鐘後生效。
英文欄位可以留空，英文版會自動顯示中文內容。

## SEO

依 [claude-seo](https://github.com/AgriciDaniel/claude-seo) 的技術 SEO 檢查項目實作：

- 所有內容在建置時就產生成 HTML（不靠 JavaScript 渲染）
- 每頁有獨立 title / meta description / canonical
- 中英文各有獨立網址，並有 `hreflang`（zh-Hant / en / x-default）
- Open Graph 分享預覽
- JSON-LD 結構化資料：WebSite、ResearchOrganization、NewsArticle、BreadcrumbList、ContactPage
- 自動產生 `sitemap.xml`（含多語系對應與消息日期）與 `robots.txt`
- 手機／桌機響應式版面

上線後建議：
1. 在後台「網站設定」填好**網站簡介**（會出現在 Google 搜尋結果）。
2. 到 [Google Search Console](https://search.google.com/search-console) 新增網站，
   把驗證碼填在後台「Google Search Console 驗證碼」，再提交 `sitemap.xml`。
3. 若之後使用自訂網域（例如 `nriolab.xxx.edu.tw`），在 Settings → Pages 設定即可，
   網址會自動更新，`robots.txt` 也才會在網域根目錄生效。

## 本機開發

```bash
npm install
npm run dev
```
