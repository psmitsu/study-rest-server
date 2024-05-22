let users = [];

function addUser(data) {
  const user = ({
    id: users.length+1,
    ...data,
  });

  users.push(user);

  return {
    ...user
  };
}

function deleteUser(id) {
  const oldLength = users.length;

  users = users.filter(user => user.id != id);

  return {
    deleted: oldLength-users.length,
  }
}

function updateUser(id, data) {
  let userIdx = users.findIndex(user => user.id == id);

  if (userIdx < 0) {
    return undefined;
  }

  users[userIdx] = {
    ...users[userIdx],
    ...data
  };

  return {...users[userIdx]};
}

function getUser(id) {
  const user = users.find(user => user.id == id)
  console.log('getUser', user);
  return user === undefined ? undefined : { ...user };
}

function getAllUsers() {
  return [...users];
}

export {
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
};
