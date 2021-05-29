import { Get, Route, Tags } from "tsoa";
import {Trade, TradeStatus} from "../entities";
import {
  getTrades,
} from "../repositories/trade.repository";
import {getRepository} from "typeorm";

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

}
