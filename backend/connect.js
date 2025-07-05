import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

const DB_PATH = process.env.DB_PATH || 'data.db';
const DB = new sql3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, connected)

function connected(err){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Created the DB or SQLite DB does already exist')
}

let sql = `CREATE TABLE IF NOT EXISTS orders(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product TEXT NOT NULL,
  qty INTEGER NOT NULL,
  price REAL NOT NULL
)`;

DB.run(sql, [], (err) => {
  //callback function
  if (err) {
    console.log('error creating orders table');
    return;
  }
  console.log('CREATED TABLE');

  DB.run(`DELETE FROM orders`, (err) => {
    if (err) return console.error(err.message);
    console.log('Old records deleted');

    const seedSql = `INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`;
  const seedData = [
    ['5600X', 7, 200],
    ['1TB NVme', 19, 99.99],
    ['5800X3D', 16, 200],
    ['2TB NVme', 15, 300],
    ['5600G', 10, 99.99],
    ['7800X3D', 12, 200],
    ['5700X3D', 10, 59.99],
    ['Adata 32GB RAM', 45, 79.99],
    ['RTX 4080', 10, 999.9]
  ];

  seedData.forEach(row => {
    DB.run(seedSql, row, (err) => {
      if (err) {
        console.log('error inserting seed data:', err.message);
      }
    });
  });
  });
});

export { DB };
