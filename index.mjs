import http from "node:http";

import { handleRequest } from "./controller/handle-request.mjs";

const PORT=3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => { console.log(`Server listening on ${PORT}`); })
