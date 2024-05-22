import { Action } from "./action.mjs";

class Route {
  map;
  dynamicMap;


  constructor() {
    this.map = new Map();
    this.dynamicMap = new Map();
  }

  addAction(method, cb) {
    const needsData = method === 'POST' || method === 'PUT';
    this.map.set(method, new Action(cb, needsData));
  }

  getAction(method) {
    return this.map.get(method);
  }

  addDynamicAction(method, cb) {
    const needsData = method === 'POST' || method === 'PUT';
    this.dynamicMap.set(method, new Action(cb, needsData));
  }

  dynamicToBound(id) {
    // do i need that? or `this` gets into getAction's closure anyway?
    const self = this;

    return {
      getAction: (method) => {
        const action = self.dynamicMap.get(method);
        if (!action) {
          return undefined;
        }
        return action.toIdBound(id);
      }
    };
  }
}

export { Route };
