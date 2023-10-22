import { IAccess, IRefresh } from "./interfaces/";
import { decode, verify, sign } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { ForbiddenException, NotFoundException, Injectable } from "@nestjs/common";

@Injectable()
export class JWTService {
    constructor( private readonly config: ConfigService) {}

    decodeToken = (token: string) => {
        return decode(token);
    };

    verifyAccess = (token: string) => {
        const access: any = this.config.get<string>("JWT_ACCESS_KEY");
        try {
            return verify(token, access);
        } catch (error) {
            throw new ForbiddenException("Invalid access token");
        }
    };

    verifyRefresh = (token: string) => {
        const refresh: any = this.config.get<string>("JWT_REFRESH_KEY");
        try {
            return verify(token, refresh);
        } catch (error) {
            throw new ForbiddenException("Invalid refresh token");
        }
    };

    createAccess = async (payload: IAccess) => {
        const access: any = this.config.get<string>("JWT_ACCESS_KEY");
        const token = sign(payload, access, { expiresIn: "8h" });
        //await this.redis.setSessionValue("access", payload.id, token, 3600 * 8);
        return token;
    };

    createRefresh = async (payload: IRefresh) => {
        const access: any = this.config.get<string>("JWT_REFRESH_KEY");
        const token = sign(payload, access, { expiresIn: "14d" });
       // await this.redis.setSessionValue("refresh", payload.id, token, 3600 * 24 * 14);
        return token;
    };

    signToken = async (payload: any) => {
        const secret = this.config.get<string>("JWT_SIGN_KEY");
        if (!secret) throw new NotFoundException("Secret not Found");
        const token = await sign(payload, secret, { expiresIn: '14d' });
        const refreshToken = await sign(payload, secret, { expiresIn: '15d' });
        return {token, refreshToken};
    };
}
