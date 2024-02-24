const fs = require('fs');
const app = require('express')();

isDev = true;
if (!isDev) {
    var server = require('https').createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/realtime.buslab.com.br/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/realtime.buslab.com.br/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/realtime.buslab.com.br/chain.pem', 'utf8')
    }, app);
} else {
    var server = require('http').Server(app);
}

// var io = require('socket.io')(server, { origins: '*:*'});
var io = require('socket.io')(server, {
    origins: '*:*',
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

server.listen(process.env.PORT || 3001);
const busses = {};

// Conexão com Servidor Redis
const Redis = require('ioredis');
const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
    db: 0,
    tls: {
        host: process.env.REDIS_HOST,
    }, 
});

redis.subscribe('position', 'event', 'obd', 'placar', (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Ouvindo canais Redis`);
});

io.on('connection', function (socket) {
    console.log('Connected', socket.id);

    redis.on('message', (channel, message) => {
        console.log(`Mensagens recebidas`);   

        if(channel === 'position') {
            let data = JSON.parse(message);

            busses[data.identifier] = data;
                    
            io.emit('notify-position', JSON.stringify(data));
            io.emit('notify-position-' + data.company, JSON.stringify(data));
            io.emit('notify-status', JSON.stringify(busses));
            io.emit('notify-status-' + data.company, JSON.stringify(busses));
        } else if(channel === 'event') {
            let data = JSON.parse(message);

            io.emit('notify-event', message);
            io.emit('notify-event-' + data.company, message);
        } else if(channel === 'obd') {
            let data = JSON.parse(message);

            io.emit('notify-obd', message);
            io.emit('notify-obd-' + data.serial, message);
        } else if(channel === 'placar') {
            let data = JSON.parse(message);

            if (data.hasData) {

                io.emit('notify-placar', data.all);
                Object.keys(data.companies).forEach((index) => {
                    var item = data.companies[index];
                    io.emit('notify-placar-' + index, item);
                })
            }
        }     
    });

    socket.on('disconnect', function () {
        console.log('Disconnected', socket.id);
    });
});
