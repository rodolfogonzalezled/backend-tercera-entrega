import passport from 'passport';
import local from 'passport-local';
import __dirname from '../../dirname.js';
import { carts } from '../DAOs/index.js';
import { userModel } from '../models/userSchema.js';
import { createHash, isValidPassword } from "../utils/utils.js";
// import { config } from './config.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { name, address, age, phone } = req.body;
            if (!name || !email || !password) return done(null, false);

            if(!req.file) return done(null, false)

            let existUser = await userModel.findOne({ email: email });
            if (existUser) return done(null, false);
            let idCart = await carts.add({productos:[]})
            let user = await userModel.create({
                name,
                email,
                password: createHash(password),
                address,
                age,
                phone,
                role: "user",
                cart: idCart,
                photo: req.file.location
            })
            return done(null, user);
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            if (!email || !password) return done(null, false);

            // if (email === config.superAdmin && password === config.superAdminPassword)
            //     return done(null, { role: "superadmin" });

            const user = await userModel.findOne({ email: email });
            if (!user) return done(null, false);
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userModel.findOne({ _id: id })
        return done(null, result);
    })
};

export default initializePassport;