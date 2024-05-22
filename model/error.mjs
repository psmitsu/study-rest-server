class NotFoundError extends Error {
  constructor() {
    super("Data not found");
    this.name = "NotFoundError";
  }
}

export { NotFoundError };
