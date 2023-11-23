import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createGame from './public/game.js'

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static('public'))

const game = createGame()
game.createGame()

game.subscribe(command => {
    sockets.emit(command.type, command)
})

sockets.on('connect', socket => {
    console.log(`$Client >> ${socket.id} connected`)
    game.addPlayer({ playerId: socket.id })
    socket.on('disconnect', () => {
        console.log(`Client >> ${socket.id} disconnected`)
    })
    socket.emit('setup', game.state)
    socket.on('start-game', () => {
        if (!game.state.running) game.start()
        game.state.running = true
    })
    socket.on('check-result', command => {
        game.checkResult(command.result)
    })
})

server.listen(3000, () => console.log('Server running on port 3000'))