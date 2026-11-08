# start-preview.ps1
# 该脚本在本地通过 Node.js 启动静态 HTTP 服务器并自动打开八戒机场官网

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  八戒机场官网 (bajiejichang.lat) 本地预览启动中  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$Port = 8080
$Url = "http://localhost:$Port/index.html"

Start-Process $Url
node server.js
