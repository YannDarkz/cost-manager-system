import jsonServer from 'json-server'
import cors from 'cors'


const server = jsonServer.create();
const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/*": "/$1",
    })
);
server.use(router);
server.listen(5000, () => {
    console.log("JSON server online");
});

export default server

