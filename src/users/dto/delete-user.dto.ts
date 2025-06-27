import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto{
    @ApiProperty({example : 1, type : "number", description : "Id удаления пользователя"})
    userId : number
}