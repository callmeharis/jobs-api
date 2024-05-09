const { BadRequestError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { name, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // for validation || testing
    // if (!name || !email || !password) {
    //     throw new BadRequestError("Please provide name, email, and password")
    // }
    const tempUser = { name, email, password: hashedPassword }

    const user = await User.create({ ...tempUser })

    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send("login user")
}

module.exports = {
    register,
    login
}