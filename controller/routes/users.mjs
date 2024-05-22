import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../../model/users.mjs";
import { Route } from "./lib/route.mjs";

// /users
const usersRoute = new Route();

usersRoute.addAction('GET', async function() {
  return getAllUsers();
});

usersRoute.addAction('POST', async function({data}) {
  return addUser(data);
});

usersRoute.addDynamicAction('GET', async function({id}) {
  console.log('getUser route', id);
  return getUser(id);
});

usersRoute.addDynamicAction('PUT', async function({id, data}) {
  return updateUser(id, data);
});

usersRoute.addDynamicAction('DELETE', async function({id}) {
  return deleteUser(id);
});

export { usersRoute };
