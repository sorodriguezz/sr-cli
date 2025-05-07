import {NextFunction, Request, Response} from "express";
import {JwtAdapter} from "../../config";
import {UserModel} from "../../data";

export class AuthMiddleware {
    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('authorization') || '';

        if (!authorization) res.status(401).send({error: 'Not authorized'});
        if (!authorization.startsWith('Bearer ')) res.status(401).send({error: 'Invalid token'});

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) res.status(401).send({error: 'Invalid token'});

            const user = await UserModel.findById(payload!.id);
            if (!user) res.status(401).send({error: 'Invalid token'});

            req.body = req.body || {user};

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({error: 'Internal Server Error'});
        }
    }
}