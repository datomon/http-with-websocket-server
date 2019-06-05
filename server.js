//實例化 Experss，並用它建立 http Server
//再把 http Server 給 ws 模組建立 websocket Server (websocket 協定需 http 做交握)
let express = require('express');  //要做額外的中介軟體設定，所以不直接接 ()
let app  = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

const ListenPort = 3000;  //Server listen Port

//express 的中介軟體
app.use(express.json()); // 解晰 application/json 的請求
app.use(express.urlencoded({ extended: true }));  //允許使用 querystring library 延伸套件


// ------ Websocket Server -------
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.send('ws connect success');  //連線一建立就發送給 client 的訊息

  // Server 有接收到訊息時
  ws.on('message', function incoming(message) {
    console.log('[' + new Date().toLocaleString() + '] Broadcast：' + message);
    
    //廣播(Broadcast)給每個連接者 (注意這裡是 wss 不是 ws)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// HTTP Router
app.post('/getUser',function(req, res){
  //request body
  let name = req.body.name;
  let account = req.body.account;

  //向本機的 Websocket Server 建立連線
  let conn = new WebSocket('ws://127.0.0.1:' + ListenPort);
  conn.onopen = function() {
    conn.send(name + ',' + account);  //發送訊息
    conn.close();  //關閉連線
  }
  
  res.json({ "status": 0, "message": "請求ok"});  //回傳 JSON
});

//Server listen Port
server.listen(ListenPort, function () {
  console.log('Server listening on port ' + ListenPort);
});
