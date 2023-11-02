const bcrypt = require('bcrypt')

async function hashed(pass) {
    try {
        const hashedPass = await bcrypt.hash(pass, 12);
        return hashedPass;
    } catch (error) {
        console.error(`Error hashing password. ${error}`);
    }
}

module.exports = hashed;