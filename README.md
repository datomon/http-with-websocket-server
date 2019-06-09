### 關於 ###
    (1)用 Node.js 的 express、ws 架的簡易型 HTTP + Webscoket 範例
    (2)目標用途：client 端使用特定的 HTTP POST 請求發送參數，請求內容用 Websocket 廣播給所有已連接者
    (3)不使用 Express 的版本為：https://github.com/datomon/http-with-websocket-server2

### 測試環境 ###
    Node.js：v10.15.1
    npm：6.4.1

### 使用方式 ###
    (1)安裝套件：npm install
    (2)啟動 Server：npm run start 或 node server

### 測試 ###
    (1)先用 Webscoket 連線工具連線「127.0.0.1:3000」
       例如：chrome 瀏覽器可以用「Simple WebSocket Client」擴充功能
    (2)用 Postman 發送 HTTP POST 請求，路由為「/getUser」
       請求參數為 name、account，可使用 JSON 格式
       若要修改路由請至 server.js 修改

### 參考文件 ###
    (1)https://www.npmjs.com/package/ws
    (2)https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-listening
    (3)https://flaviocopes.com/node-websockets/
    (4)https://expressjs.com/zh-tw/4x/api.html