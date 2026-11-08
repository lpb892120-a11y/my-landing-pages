# 八戒机场官网

静态 HTML 落地页与知识库，域名为 https://bajiejichang.homes/。页面不依赖构建框架或第三方运行时。

## 页面

- index.html：首页、服务说明、节点状态说明、套餐入口、已核验反馈、知识库预览与 FAQ
- knowledge-base.html：12 篇文章目录
- kb/*.html：12 篇独立、可被搜索引擎读取的 HTML 长文
- faq.html：常见问题
- tutorial-windows.html：旧 Windows 教程入口，重定向到新版客户端文章
- articles.html 和 articles/*.html：旧文章入口，重定向到知识库中的新版内容
- privacy.html、terms.html、disclaimer.html：政策与说明页面
- robots.txt、sitemap.xml：抓取规则和 XML 站点地图

## 更新知识库

文章源内容位于 kb/articles.mjs，修改后运行：

    node scripts/generate-kb.mjs

生成器会重建 12 个文章页面、knowledge-base.html 和 sitemap.xml。

## IndexNow

根目录的 4b3e2f9a71c64d81a5ef9206b7c3d4e8.txt 是站点验证文件。请先将站点文件发布到 bajiejichang.homes，并确认该验证文件可通过 HTTPS 访问，再在 Node.js 18 或更高版本环境运行：

    node scripts/submit-indexnow.mjs

默认提交 sitemap.xml 中的 URL。也可以只提交指定页面：

    node scripts/submit-indexnow.mjs https://bajiejichang.homes/ https://bajiejichang.homes/knowledge-base.html

脚本只允许提交本站 HTTPS URL，不会在静态站点发布前自动发送请求。IndexNow 是通知搜索引擎页面变更的机制，不保证收录或排名。

## 数据说明

首页不展示虚构的节点延迟、在线状态、价格、用户数量或评价。实时节点数据源未接入时显示“未知”；评价只在来源可核验且获得发布许可后展示。实际套餐、服务规则和服务状态请以官方用户中心为准。
