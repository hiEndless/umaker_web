# 2026-11-17 候选池价格与成交额

## 决策
BFF增加一次UMaker quotes只读请求，不增加交易所请求，报价与排名隔离失败。workspace新增optional quotes，BFF通过include_quotes=1显式开启，旧标签页默认仍收到原字段集合，输出schema反查、生成物及兼容窗口同步。价格与USDT成交额不乘100；保留每币原生时间，旧快照标注，缺失显示—，0成交额正常显示。

## 原因
原采集已含lastPrice和quoteVolume，但榜单接口与页面未传递这些字段。

## 验证
生产函数输出反查schema；真实HTTP鉴权、Redis发布与有界读取、过期/坏数据、0成交额与旧后端兼容；前端类型/守卫/Workers构建与浏览器交互。

## 兼容
先部署UMaker采集和API，再部署前端。至少market-v1窗口内quotes为optional，旧后端无接口不影响排名；回滚前端和生成物即可恢复旧展示，无数据库迁移。
