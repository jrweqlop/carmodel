import { Injectable } from '@nestjs/common';
import { User } from 'src/type/customType';

@Injectable()
export class AuthService {

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

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
