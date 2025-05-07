import jwt from 'jsonwebtoken';
import type {StringValue} from "ms";
import {envs} from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    static async generateToken(payload: Object, duration: StringValue = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }

    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}