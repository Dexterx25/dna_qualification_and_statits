import { HttpStatus } from "@nestjs/common";
import { ApiResponseDTO } from "src/common/DTOCommon/output";
export declare class RecluterResponseDTO implements ApiResponseDTO {
    statusCode: HttpStatus;
    message: string | string[];
    error: boolean | string;
}
