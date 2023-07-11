import { MinLength, IsNotEmpty, MaxLength } from 'class-validator';


export class LoginPlayerDTO {
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    name: string;

    @MinLength(6, {message: 'A  senha não pode ser vazia'})
    @MaxLength(255, {message: 'A senha não pode ter mais de 255 caracteres'})
    senha: string;
}