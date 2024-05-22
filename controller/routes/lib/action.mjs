class Action {
  needsData = false;
  cb;
  id;

  // cb = function (id, data)
  // needsData = boolean
  constructor(cb, needsData) {
    this.cb = cb;

    if (typeof needsData === 'boolean') {
      this.needsData = needsData;
    }
  }

  toIdBound(id) {
    const action = new Action(this.cb, this.needsData);
    action.id = id;
    return action;
  }

  process(data) {
    return this.cb({
      data: data,
      id: this.id,
    });
  }
}

export { Action };
