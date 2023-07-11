import { MinLength, IsNotEmpty, MaxLength } from 'class-validator';


export class CreatePlayerDTO {
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    name: string;

    @MinLength(6, {message: 'A  senha não pode ser vazia'})
    @MaxLength(255, {message: 'A senha não pode ter mais de 255 caracteres'})
    senha: string;

    @MinLength(6, {message: 'tamanho minimo é de 6'})
    @IsNotEmpty()
    cargo: string
}