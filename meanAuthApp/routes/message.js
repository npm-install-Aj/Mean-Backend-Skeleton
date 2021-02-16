const express = require('express');
const router = express.Router();
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
const config = require('../config/database')
const User = require('../models/user')

server.listen(3001);

CLIENTS = [];
// router.use("message",(e)=>{
    const wsServer = new WebSocketServer({httpServer: server});
    CLIENTS=[];
    wsServer.on('request', function(request) {
       
        const connection = request.accept(null, request.origin);
        // console.log(request);
        connection.on('connection',function(ws){
            console.log(ws);
            CLIENTS.push(ws);
        })
        connection.on('connection',function connection(ws,req){
            console.log(ws,req);
        })
        connection.on('message', function(message) {
            // console.log(message);
        //   console.log('Received Message:',message.utf8Data);
          connection.sendUTF('Hi this is WebSocket server!');
        });
        connection.on('close', function(reasonCode, description) {
            console.log('Client has disconnected.');
        });
    });

    // wsServer.on('connection', function(ws) {
    //     CLIENTS.push(ws);
    //     console.log(ws);
    //     // ws.on('message', function(message) {
    //     //     console.log('received: %s', message);
    //     //     sendAll(message);
    //     // });
    //     ws.send("NEW USER JOINED");
    // });
// })
module.exports = router;