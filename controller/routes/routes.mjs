import { usersRoute } from "./users.mjs";

const routesMap = new Map();

// тут могли бы быть addRoutes('goods', goodsRoute), и тд
addRoute('users', usersRoute);

function getRoute(pathname) {
  const [ basePath, id ] = splitPathname(pathname);

  const route = routesMap.get(basePath);

  if (!route) {
    return undefined;
  }

  if (id) {
    return route.dynamicToBound(id);
  }

  return route;
}

function addRoute(pathname, route) {
  routesMap.set(pathname, route);
}

// only works with '/users/' or '/users/1' type urls
function splitPathname(pathname) {
  const [ _, path, id ] = pathname.split('/');
  return [ path, id ];
}

export { getRoute }
