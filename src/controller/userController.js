const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const services = require('../repository/baseRepository');
const { Ok, badRequest, Created, InternalServerError } = require('../utils/httpStatus');
const { userTable } = require('../utils/prismaSchema');
const { jwtExpiryTime, jwtSecret } = require('../config/constantConfig');

const register = async(req, res) => {
    try {
        let body = req.body;
        let userParams = {
            email: body.email
        }
        const checkEmail = await services.findUnique(userTable, userParams);
        if(checkEmail != null) return res.jsond(badRequest, badRequest, "bad request", "email already exist");
        const hashPassword = await bcrypt.hash(body.password, 10);
        body.password = hashPassword
        await services.insertOne(userTable, body);
        return res.jsond(Created, Created, "success", "register success");
    } catch (error) {
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const login = async(req, res) => {
    try {
        let body = req.body;
        let userParams = {
            email: body.email
        }
        const checkEmail = await services.findUnique(userTable, userParams);
        if(checkEmail == null) return res.jsond(badRequest, badRequest, "bad request", "email not found");
        let match = await bcrypt.compare(body.password, checkEmail.password);
        if(!match) return res.jsond(badRequest, badRequest, "bad request", "wrong email / password");
        let userData = {
            id: checkEmail.id,
            email: checkEmail.email
        }
        const signToken = jwt.sign(userData, jwtSecret, { expiresIn: jwtExpiryTime });
        userData.token = signToken;
        return res.jsond(Ok, Ok, "success", "login success", userData);
    } catch (error) {
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const userInfo = async(req, res) => {
    try {
        var authorization = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(authorization, jwtSecret);
        let userParams = {
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        }
        const profile = await services.findUnique(userTable, userParams)
        return res.jsond(Ok, Ok, "success", "login success", profile);
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

module.exports = {
    register,
    login,
    userInfo
}