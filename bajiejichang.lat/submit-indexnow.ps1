# submit-indexnow.ps1
# 该脚本用于将 bajiejichang.lat 全站 URL 批量推送到 IndexNow 搜索引擎（支持 Bing、Yandex 等）

$HostName = "bajiejichang.lat"
$Key = "8f2c7a916e3b4d5a9c0d1e2f3a4b5c6d"
$KeyLocation = "https://bajiejichang.lat/8f2c7a916e3b4d5a9c0d1e2f3a4b5c6d.txt"

$UrlList = @(
    "https://bajiejichang.lat/",
    "https://bajiejichang.lat/posts/ladder-recommendation.html",
    "https://bajiejichang.lat/posts/beginner-scientific-internet-guide.html",
    "https://bajiejichang.lat/posts/vpn-proxy-airport-science.html",
    "https://bajiejichang.lat/posts/ai-tools-access-guide.html",
    "https://bajiejichang.lat/posts/iplc-iepl-dedicated-line-guide.html",
    "https://bajiejichang.lat/posts/streaming-unlock-netflix-disney.html",
    "https://bajiejichang.lat/posts/gaming-proxy-low-latency-guide.html",
    "https://bajiejichang.lat/posts/privacy-security-dns-leak.html",
    "https://bajiejichang.lat/posts/mobile-setup-ios-shadowrocket-android.html",
    "https://bajiejichang.lat/posts/pc-setup-windows-v2rayn-mac-clash.html",
    "https://bajiejichang.lat/posts/troubleshooting-proxy-connection-issues.html",
    "https://bajiejichang.lat/posts/proxy-protocols-comparison.html"
)

$Payload = @{
    host = $HostName
    key = $Key
    keyLocation = $KeyLocation
    urlList = $UrlList
} | ConvertTo-Json -Depth 5

Write-Host "[IndexNow] 正在向 https://api.indexnow.org/IndexNow 提交 URL 列表..." -ForegroundColor Cyan

try {
    $Response = Invoke-RestMethod -Uri "https://api.indexnow.org/IndexNow" -Method Post -Body $Payload -ContentType "application/json; charset=utf-8"
    Write-Host "[IndexNow] 提交成功！搜索引擎将在最短时间内对提交的页面进行收录抓取。" -ForegroundColor Green
} catch {
    Write-Host "[IndexNow] 提交响应: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "提示: 当域名尚未解析或处于本地环境时，IndexNow 可能会等待域名公网生效并校验 key 文件后生效。" -ForegroundColor Gray
}

