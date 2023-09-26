import { HttpStatus } from "@nestjs/common";
export declare class ApiResponseDTO {
    statusCode: HttpStatus;
    message: string | string[];
    error: boolean | string;
}
