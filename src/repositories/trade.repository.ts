import { getRepository } from "typeorm";
import { Trade } from "../entities";


export interface IDeleteTradePayload {
  id: string;
  uniqTradeKey: string;
}

export const getTrades = async (): Promise<Array<Trade>> => {
  const tradeRepository = getRepository(Trade);
  return tradeRepository.find();
};

export const getTrade = async (id: string): Promise<Trade | null> => {
  const tradeRepository = getRepository(Trade);
  const trade = await tradeRepository.findOne({ id: id });
  if (!trade) return null;
  return trade;
};
