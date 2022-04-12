import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { userModel } from "../config/userModel";
import { User } from "../models/User";
import { JWT_KEY } from "../../environment/environment";
import { verifyToken } from "../controllers/verifyToken";

const router = express.Router();

router.post('/signup', async ({ body: { name, email, password, createdAt } }: Request<{}, {}, Omit<User, 'id'>, {}>, res) => {
    try {
        const checkEmailExists = await userModel.find({ 'email': email });
        if (checkEmailExists.length) return res.status(409).json({ message: 'E-mail already registered' });

            const hashedPwd = await bcrypt.hash(password, 8)
            const newUser = new userModel({
                'name': name,
                'email': email,
                'password': hashedPwd,
                'createdAt': createdAt
            });
            await newUser.save();
            res.status(200).json({ message: 'ok' });
        }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error server' });

    }
});

router.post('/signin', async ({ body: { email, password } }: Request<{}, {}, Omit<User, 'id'>, {}>, res) => {
    if (!email || !password) return res.status(400).json({ message: 'parameters undefined' });
    const userFound = await userModel.findOne({ 'email': email });
    if (!userFound) return res.status(404).json({ message: 'Email doesn\'t exist' });
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return res.status(401).json({ message: 'password doesn\'t match' });

    const token = jwt.sign({ id: userFound._id, name: userFound.name },
        JWT_KEY,
        { expiresIn: '24h' }
    );

    res.status(200).json({
        message: 'ok',
        tokenJwt: token,
        user: {
            email: userFound.email,
            name: userFound.name,
            createdAt: userFound.createdAt
        }
    });



});

router.get('/me', verifyToken, async (_, res: Response) => {
    const { id } = res.locals.payload as { id: string, name: string }
    try {
        const userFound = await userModel.findById(id)
        res.status(200).json({
            message: 'ok', payload: {
                name: userFound.name,
                createdAt: userFound.createdAt,
                email: userFound.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error server' })
    }
});

export default router;