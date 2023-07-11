import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDTO } from './createPlayer.dto';
import { LoginPlayerDTO } from './loginPlayer.dto';

@Controller('/players')
export class PlayerController {
    constructor(private playerService: PlayerService) { }

    @Post()
    async criaPlayer(@Body() dadosDoPlayer: CreatePlayerDTO) {

        const mensagem = await this.playerService.criaPlayer(dadosDoPlayer)
        return {
            message: mensagem
        }
    }
    @Post('/login')
    async logaPlayer(@Body() dadosDoPlayer: LoginPlayerDTO) {
        const resultado = await this.playerService.logaPlayer(dadosDoPlayer)
        return {
            message: resultado
        }
    }

    @Get()
    async pegaPlayers() {
        const playersSalvos = await this.playerService.pegaPlayers()
        return {
            playersSalvos
        }
    }

    @Get('/:name')
    async pegaUmPlayer(@Param('name') name: string) {
        const player = await this.playerService.pegaPlayer(name)
        return {
            player
        }
    }

    @Delete('/:name')
    async apagaPlayer(@Param('name') name: string) {
        await this.playerService.apagaPlayer(name)
        return {
            message: `apagado player de nome ${name}`
        }
    }
}