import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LibService {
    constructor() { }

    public hashPassword({
        password
    }: {
        password: string
    }): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public comparePassword({
        hashedPassword,
        password
    }: {
        password: string,
        hashedPassword: string
    }): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

}
