import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/type/customType';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    private readonly users = [
        {
            userId: 1,
            username: 'ecushopadmin',
            password: 'Ecushop2017',
        },
        {
            userId: 2,
            username: 'admin',
            password: '1212312121',
        },
    ];

    async findOne(username: string): Promise<User | null> {
        const result = await this.users.find(user => user.username === username);
        if (!result) return null
        return result
    }

    async signIn(
        item: User,
        pass: string,
    ): Promise<{ access_token: string }> {
        if (item.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: item.userId, username: item.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
