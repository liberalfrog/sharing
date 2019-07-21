import UserTable, { DBCommon, User } from "./usertable"

const main = async () => {
  DBCommon.init()
  await UserTable.createTableIfNotExists()

  for(let i=0; i<10; i++){
    const user = new User(`ken${i}`, `name${i}`)
    await UserTable.save(user)
  }

  console.log(await UserTable.count())


  for(let i=3; i<6; i++){
    const user = new User(`ken${i}`, `name${i}`)
    await UserTable.save(user)
  }

  let start = 0
  const limit = 3
  let users = []
  while (true) {
    users = users.concat(await UserTable.list(start, limit))
    start = start + limit
    if (start >= count) break
  }
  console.log(users)


  console.log("--- delete 10 users ---")
  users.forEach(user => { UserTable.delete(user) })

  console.log("--- count after deleting ---")
  count = await UserTable.count()
  console.log(count)
}

main();
