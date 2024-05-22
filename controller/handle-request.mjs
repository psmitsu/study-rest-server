import { getRoute } from "./routes/routes.mjs";
import { NotFoundError } from "../model/error.mjs";

async function handleRequest(req, res) {
  const { pathname } = new URL(getFullUrlString(req));
  const { method } = req;

  res.setHeader('Content-Type', 'application/json');

  // routing
  const route = getRoute(pathname);
  if (route === undefined) {
    return responseWithError(res, 404, `No such route ${pathname}`);
  }

  const action = route.getAction(method);
  if (action === undefined) {
    return responseWithError(res, 405, `No action ${method} for ${pathname}`);
  }

  // logic and resonse forming
  let responseObject;

  try {
    if (action.needsData) {
      const data = await getRequestDataObject(req);
      responseObject = await action.process(data);
    } else {
      responseObject = await action.process();
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      return responseWithError(res, 404, "Related data not found");
    }
    return responseWithError(res, 400, "Could not process the request");
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    data: responseObject
  }));
}

function getFullUrlString(req) {
  const proto = req.connection.encrypted ? 'https' : 'http';
  const { headers: { host }, url } = req;

  return `${proto}://${host}${url}`;
}

function getRequestDataObject(req) {
  return new Promise((resolve, reject) => {
    let rawData = '';

    req.on('data', chunk => {
      rawData += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(rawData);
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function responseWithError(res, code, message) {
  res.writeHead(code);
  res.end(JSON.stringify({
    error: message,
  }));
}

export { handleRequest };
