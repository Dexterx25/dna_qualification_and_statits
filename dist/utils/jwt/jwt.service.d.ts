import { IAccess, IRefresh } from "./interfaces/";
import { ConfigService } from "@nestjs/config";
export declare class JWTService {
    private readonly config;
    constructor(config: ConfigService);
    decodeToken: (token: string) => string | import("jsonwebtoken").JwtPayload | null;
    verifyAccess: (token: string) => string | import("jsonwebtoken").JwtPayload;
    verifyRefresh: (token: string) => string | import("jsonwebtoken").JwtPayload;
    createAccess: (payload: IAccess) => Promise<string>;
    createRefresh: (payload: IRefresh) => Promise<string>;
    signToken: (payload: any) => Promise<{
        token: string;
        refreshToken: string;
    }>;
}
