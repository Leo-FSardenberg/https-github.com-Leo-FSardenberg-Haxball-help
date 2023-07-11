import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from '../player.entity';
import { CreatePlayerDTO } from './createPlayer.dto';
import { createHash } from 'crypto';
import { ListaPlayerDTO } from './listaPlayer.dto';
import { LoginPlayerDTO } from './loginPlayer.dto';


async function criaHash(senha): Promise<string> {
    let senhaHasheada = await createHash('sha256').update(senha).digest('hex')
    return senhaHasheada
}


@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>
    ) { }

    async criaPlayer(dadosDoPlayer: CreatePlayerDTO) {
        const playerEntity = new PlayerEntity()

        const possivelPlayer = await this.playerRepository.findOneBy({
            name: dadosDoPlayer.name
        })

        if (possivelPlayer) {
            throw new BadRequestException('USUARIO JÁ EXISTENTE COM ESSE NOME')
        }


        const senhaHasheada = await criaHash(dadosDoPlayer.senha)

        playerEntity.name = dadosDoPlayer.name
        playerEntity.senha = senhaHasheada
        return this.playerRepository.save(playerEntity)
    }


    async logaPlayer(dadosDoPlayer: LoginPlayerDTO) {
        const player: ListaPlayerDTO | null = await this.playerRepository.findOneBy({ name: dadosDoPlayer.name });
        if (!player) {
            throw new BadRequestException('Requisição mal feita. Player não existe')
        }
        const possivelSenhaHasheada = await criaHash(dadosDoPlayer.senha); // Use a função hashPassword para gerar o hash
        //@ts-ignore
        if (player.senha === possivelSenhaHasheada) {
            return {
                message: 'Logado'
            }
        } else {
            throw new BadRequestException('Senha errada')
        }
    }


    async pegaPlayers() {
        const playerSalvos = await this.playerRepository.find()
        const playerLista = playerSalvos.map(
            (player) => new ListaPlayerDTO(player.id, player.name, player.senha),
        );
        return playerLista
    }

    async pegaPlayer(name: string) {
        const player = await this.playerRepository.findOneBy({
            name: name
        })
        return {
            player
        }
    }

    async apagaPlayer(name: string) {
        await this.playerRepository.delete({ name: name })
        return {
            message: 'apagado'
        }
    }
}


