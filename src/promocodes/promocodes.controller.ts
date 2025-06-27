import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { Promocode } from './model/promocode.model';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('promocodes')
export class PromocodesController {
    constructor(private readonly promocodeService : PromocodesService) {}

    @UseGuards(AuthGuard)
    @Get('/findByUserId')
    @ApiOperation({ summary: 'Найти по userId все промокоды с node' })
    @ApiResponse({ status: 200, description: 'Список промокодов с node', schema: { example: [{ promocode: {}, node: 1 }] } })
    async findAllPromocodes(@Req() req: any) {
        const user = req.user;
        return await this.promocodeService.findAllByUserWithNode(user.id);
    }

    @UseGuards(ApiKeyGuard)
    @Post('/implemetSales')
    @ApiOperation({ summary: 'Увеличиваем sales у промокода' })
    @ApiQuery({example : {promocodeId : 1}})
    @ApiResponse({ status: 200, description: 'Увеличиваем sales у промокода', type : Promocode})
    async implementSales(@Query("promocodeId") promocodeId:number) {
        return await this.promocodeService.incrementSales(promocodeId);
    }

    @UseGuards(ApiKeyGuard)
    @Get('/findAll')
    @ApiOperation({summary : "Нахождение всем промокодов"})
    @ApiResponse({status : 200, example : [Promocode]})
    async finAllPromocodes(){
        return await this.promocodeService.findAllPromocodes();
    }

    @UseGuards(ApiKeyGuard)
    @Get('/findByCode')
    @ApiOperation({summary : "Нахождение по коду"})
    @ApiResponse({status : 200, example : Promocode})
    async findPromocodeByCode(@Query('code') code : string){
        return await this.promocodeService.findByCode(code);
    }

    @UseGuards(ApiKeyGuard)
    @Post("/create")
    @ApiOperation({ summary: 'Создать промокод' })
    @ApiResponse({ status: 200, description: "Промокод создан" })
    async createPromocode(@Body() dto : CreatePromocodeDto){
        return await this.promocodeService.createPromocode(dto);

    }
}
