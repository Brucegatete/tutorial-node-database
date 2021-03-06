const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
    saltHashPassword,
    createUser({username, password}){
        console.log(`Add user ${username} with password ${password}`)
        const {salt, hash} = this.saltHashPassword(password)
        return knex('user').insert({
            salt,
            encrypted_password: hash,
            username
        })
    },
    authenticate ({username, password}){
        console.log(`Athenticating user ${username}`)
        return knex('user').where({username})
        .then(([user]) => {
            if (!user) return {success : false}
            const {hash} = saltHashPassword({
                password,
                salt:user.salt
            })
            return {sucess: hash == user.encrypted_password}
        })
    }
}

function saltHashPassword ({
    password,
    salt = randomString()
  }) {
    const hash = crypto
      .createHmac('sha512', salt)
      .update(password)
    return {
      salt,
      hash: hash.digest('hex')
    }
  }

function randomString(){
    return crypto.randomBytes(4).toString('hex')
}