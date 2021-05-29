import { Get, Route, Tags,  Path } from "tsoa";
import {Trade} from "../entities";
import {
  getTrades,
  getTrade,
} from "../repositories/trade.repository";

@Route("trades")
@Tags("Trades")
export default class TradeController {
  @Get("/")
  public async getTrades(): Promise<Array<Trade>> {
    return getTrades();
  }

  @Get("/:id")
  public async getTrade(@Path() id: string): Promise<Trade | null> {
    return getTrade(String(id));
  }
}
