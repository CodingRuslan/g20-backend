import {Body, Get, Post, Route, Tags} from "tsoa";
import {Trade, TradeStatus, Options} from "../entities";
import {
  getTrades, IDeleteTradePayload,
} from "../repositories/trade.repository";
import {getRepository} from "typeorm";
import moment from "moment";

@Route("trades")
@Tags("Trades")
export default class TradeController {
  @Get("/")
  public async getTrades(): Promise<Array<Trade>> {
    return getTrades();
  }

  @Get("/ads")
  public async getAllAds() {
    const tradesRepository = getRepository(Trade);
    return await tradesRepository.find({ relations: ['owner', 'buyer', 'resource', 'seller'], where: [
        {seller: null}, {buyer: null}
      ] });
  }

  @Get("/closed-trades")
  async getAllClosedTrades() {
    const tradesRepository = getRepository(Trade);
    return await tradesRepository.find({ relations: ['owner', 'buyer', 'resource', 'seller'], where: {
        status: TradeStatus.Closed
      } });
  }

  @Post("/delete")
  async deleteTrade(@Body() body: IDeleteTradePayload) {
    const {id, uniqTradeKey} = body
    const tradesRepository = getRepository(Trade);
    const optionsRepository = getRepository(Options);

    const isGameGoing = await optionsRepository.findOne({name: 'isGameGoing'});
    if(!isGameGoing?.value) {
      throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Действие недоступно: игра остановлена.`);
    }

    const trade = await tradesRepository.findOne({relations: ['owner'], where: { id }});
    if(trade?.owner.uniqTradeKey === uniqTradeKey) {
      return await tradesRepository.delete(id);
    } else {
      throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Неверный уникальный ключ`);
    }
  }

}
