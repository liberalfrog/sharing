import sqlite3 from "sqlite3"

// ファイルに対応した、ただ１つのインスタンス
let database

export class DBCommon {
  static init() {
    database = new sqlite3.Database("user.sqlite3")
  }
  static get() {
    return database
  }
}


export class User {
  constructor(account, name) {
    this.account = account
    this.name = name
  }
}


const userTableName = "user"

export default class UserTable {
  static async createTableIfNotExists() {
    const db = DBCommon.get()
    return new Promise((resolve, reject) => {
      try {
        db.serialize(() => {
          db.run(`create table if not exists ${userTableName} (
            account text primary key,
            name text
          )`)
        })
        return resolve()
      } catch (err) {
        return reject(err)
      }
    })
  }

  static async save(user) {
    const db = DBCommon.get()
    return new Promise((resolve, reject) => {
      try {
        db.run(`insert or replace into ${userTableName}
        (account, name, email)
        values ($account, $name, $email)`,
          user.account, user.name, user.email
        )
        return resolve()
      } catch (err) {
        return reject(err)
      }
    })
  }

  static async count() {
    const db = DBCommon.get()
    return new Promise((resolve, reject) => {
      db.get(`select count(*) from ${userTableName}`, (err, row) => {
        if (err) return reject(err)
        return resolve(row["count(*)"])
      })
    })
  }

  static async list(offset, limit) {
    const db = DBCommon.get()
    const result = []
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all(`select account, name, email from ${userTableName}
        order by account limit ${limit} offset ${offset}`,
          (err, rows) => {
            if (err) return reject(err)
            rows.forEach(row => {
              result.push(new User(row["account"], row["name"], row["email"]))
            })
            return resolve(result)
          })
      })
    })
  }


  static async delete(user) {
    const db = DBCommon.get()
    return new Promise((resolve, reject) => {
      try {
        db.run(`delete from ${userTableName} where account = $account`, user.account)
        return resolve()
      } catch (err) {
        return reject(err)
      }
    })
  }
}
