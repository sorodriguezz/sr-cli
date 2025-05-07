import {Request, Response} from 'express';
import {AuthRepository, CustomError, LoginUserDto, RegisterUser, RegisterUserDto} from "../../domain";
import {UserModel} from "../../data";
import {LoginUser} from "../../domain/use-cases/auth/login-user.use-case";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(error); // logger winston
        return res.status(500).json({error: 'Internal Server Error'});
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) res.status(400).json({error});

        new RegisterUser(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.status(200).json({data}))
            .catch(err => this.handleError(err, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) res.status(400).json({error});

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.status(200).json(data))
            .catch(err => this.handleError(err, res));
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(() => res.json({
                user: req.body.user,
            }))
            .catch(() => res.status(500).json({error: 'Internal Server Error'}));
    }
}