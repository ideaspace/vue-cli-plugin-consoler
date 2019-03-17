const omit = require('lodash/omit')

module.exports = {
  all: [
    {
      userId: 1,
      username: 'admin',
      password: '123456',
      userAccount: 'admin',
    },
    {
      userId: 2,
      username: 'guest',
      password: '123456',
      userAccount: 'guest',
    },
  ],
  authenticate({ userAccount, password }) {
    return new Promise((resolve, reject) => {
      const matchedUser = this.all.find(
        (user) => user.userAccount === userAccount && user.password === password
      )
      if (matchedUser) {
        resolve(this.json(matchedUser))
      } else {
        reject(new Error('Invalid user credentials.'))
      }
    })
  },
  findBy(propName, value) {
    const matchedUser = this.all.find(user => user[propName] === value)
    return this.json(matchedUser)
  },
  json(user) {
    return user && omit(user, ['password'])
  }
};
