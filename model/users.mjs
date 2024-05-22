import { db } from "./database.mjs";
import { NotFoundError } from "./error.mjs";

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
);`);

async function addUser(data) {
  const { name, age } = data;
  const lastId = await new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (name, age) VALUES(?, ?)`, [name, age], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    })
  });

  return {
    ...data,
    id: lastId
  };
};

async function deleteUser(id) {
  const changes = await new Promise((resolve, reject) => {
    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });

  if (changes === 0) {
    throw new NotFoundError();
  }

  return {
    deleted: changes,
  }
}

async function updateUser(id, data) {
  const { name, age } = data;

  const changes = await new Promise((resolve, reject) => {
    db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [name, age, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });

  if (changes === 0) {
    throw new NotFoundError();
  }

  return {
    id,
    ...data
  };
}

async function getUser(id) {
  const user = await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

  if (user === undefined) {
    throw new NotFoundError();
  }

  return user;
}

async function getAllUsers() {
  const users = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  return users;
}

export {
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
};
