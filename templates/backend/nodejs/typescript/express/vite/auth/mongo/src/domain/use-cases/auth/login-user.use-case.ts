
import {StringValue} from "ms";
import {AuthRepository} from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";
import {CustomError} from "../../errors/custom.error";
import { LoginUserDto } from "../..";

interface UserToken {
    token: string;
}

type SignToken = (payload: Object, duration?: StringValue,) => Promise<string | null>;

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({id: user.id}, '2h');
        if (!token) throw CustomError.internalServerError('Error generating token');

        return {
            token
        }
    }
}