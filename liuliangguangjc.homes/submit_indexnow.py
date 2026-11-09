#!/usr/bin/env python3
"""
IndexNow 一键批量提交脚本 - 流量光机场官网
可直接运行将网站主页及 12 篇教程页面实时推送到 IndexNow 搜索引擎网络 (Bing, Yandex, Naver 等)
使用方法: python submit_indexnow.py
"""

import json
import urllib.request
import urllib.error
import sys

def submit_indexnow():
    config_file = "indexnow.json"
    try:
        with open(config_file, "r", encoding="utf-8") as f:
            payload = json.load(f)
    except Exception as e:
        print(f"[-] 读取配置文件失败: {e}")
        return

    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    
    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow"
    ]
    
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "Mozilla/5.0 (compatible; IndexNowBot/1.0; +https://liuliangguangjc.homes)"
    }
    
    print(f"[*] 准备向 IndexNow 提交 {len(payload.get('urlList', []))} 个 URL...")
    
    for url in endpoints:
        print(f"[*] 正在推送至: {url}")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                code = resp.getcode()
                if code in (200, 202):
                    print(f"[+] 提交成功 (HTTP {code}) - 搜索引擎已接受您的 URL 列表！")
                else:
                    print(f"[!] 收到非预期状态码: {code}")
        except urllib.error.HTTPError as e:
            if e.code == 202:
                print(f"[+] 提交成功 (HTTP 202 Accepted) - 索引请求已排队处理！")
            elif e.code == 400:
                print(f"[-] 请求格式错误 (HTTP 400): 请检查 JSON 字段与格式")
            elif e.code == 403:
                print(f"[-] 密钥验证失败 (HTTP 403): 请确保密钥文件在网站根目录可公开访问")
            elif e.code == 422:
                print(f"[-] 提交失败 (HTTP 422): URL 不属于该域名或密钥位置不符")
            else:
                print(f"[-] 提交异常 (HTTP {e.code}): {e.read().decode('utf-8', errors='ignore')}")
        except Exception as e:
            print(f"[-] 连接失败: {e}")

if __name__ == "__main__":
    submit_indexnow()
