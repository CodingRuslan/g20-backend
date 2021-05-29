import {Body, Get, Post, Route, Tags} from "tsoa";
import {Trade, TradeStatus, Options, Country, ResourceOwner, Resource} from "../entities";
import {
  getTrades, IDeleteTradePayload, ITradeCreatePayload,
} from "../repositories/trade.repository";
import {getRepository, Not} from "typeorm";
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

  @Post("/create-trade")
  async createTrade(@Body() data: ITradeCreatePayload) {
    const tradeRepository = getRepository(Trade);
    const countriesRepository = getRepository(Country);
    const resourcesRepository = getRepository(Resource);
    const resourceOwnersRepository = getRepository(ResourceOwner);
    const optionsRepository = getRepository(Options);

    const isGameGoing = await optionsRepository.findOne({name: 'isGameGoing'});
    if(!isGameGoing?.value) {
      throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Действие недоступно: игра остановлена.`);
    }

    let seller = null;
    let buyer = null;
    const resource = await resourcesRepository.findOne({ id: data.resource });
    const owner = await countriesRepository.findOne({ id: data.owner });
    if(data.owner === data.seller) {
      seller = owner;
      if(data.buyer) {
        buyer = await countriesRepository.findOne({ id: data.buyer });
      }
    } else if (data.owner === data.buyer) {
      buyer = owner;
      if(data.seller) {
        seller = await countriesRepository.findOne({ id: data.seller });
      }
    } else {
      throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Ошибка создания сделки`);
    }

    if(seller && buyer && seller.id === buyer.id || owner?.uniqTradeKey !== data.uniqTradeKey) {
      throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Ошибка создания сделки или неверный уникальный ключ`);
    }

    let similarTrade = null;

    if(buyer && seller) {
      similarTrade = await tradeRepository.findOne({
        where: {
          seller,
          buyer,
          resource,
          count: data.count,
          cost: data.cost,
          owner: {
            id: Not(owner?.id)
          },
          status: TradeStatus.Active
        },
        relations: ['seller', 'buyer', 'resource', 'owner']
      });
    }

    if(similarTrade) {
      const resourceOfCountry = await resourceOwnersRepository.findOne({
        relations: ['country', 'resource'], where: {
          country: similarTrade.seller,
          resource: similarTrade.resource
        } })

      if(buyer && buyer?.money >= similarTrade.sum &&
        resourceOfCountry &&
        resourceOfCountry?.count >= similarTrade.count &&
        seller) {
        console.log(await countriesRepository.findOne(buyer));
        buyer = await countriesRepository.save({...buyer, money: buyer.money - similarTrade.sum });
        console.log(await countriesRepository.findOne(buyer));
        await resourceOwnersRepository.update(resourceOfCountry, { count: resourceOfCountry.count - similarTrade.count })
        await countriesRepository.update(seller, { money: Number(seller.money) + Number(similarTrade.sum) });

        let isHasCountryResource;
        if(buyer) {
          isHasCountryResource = await resourceOwnersRepository.findOne({
            country: buyer, resource: similarTrade.resource
          });
        }

        if(isHasCountryResource) {
          await resourceOwnersRepository.update(isHasCountryResource,
            { count: Number(isHasCountryResource.count) + Number(similarTrade.count) })
        } else {
          await resourceOwnersRepository.save({
            country: buyer,
            resource: similarTrade.resource,
            count: similarTrade.count
          });
        }

        similarTrade = await tradeRepository.findOne({
          where: {
            seller,
            buyer,
            resource,
            count: data.count,
            cost: data.cost,
            owner: {
              id: Not(owner?.id)
            },
            status: TradeStatus.Active
          },
          relations: ['seller', 'buyer', 'resource', 'owner']
        });

        if(similarTrade) {
          await tradeRepository.delete(similarTrade);
        }

        return {
          ...await tradeRepository.save({ ...similarTrade, status: TradeStatus.Closed }),
          deletedTrade: similarTrade && similarTrade.id
        };
      } else {
        throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Недостаточно денег или ресурса`);
      }
    } else {
      if(seller && !buyer) {
        return await tradeRepository.save({
          time: moment.utc().add(3, 'hours').format(),
          count: data.count,
          cost: data.cost,
          sum: data.sum,
          owner,
          seller,
          resource
        });
      } else if(!seller && buyer) {
        return await tradeRepository.save({
          time: moment.utc().add(3, 'hours').format(),
          count: data.count,
          cost: data.cost,
          sum: data.sum,
          owner,
          buyer,
          resource
        });
      } else if(seller && buyer) {
        return await tradeRepository.save({
          time: moment.utc().add(3, 'hours').format(),
          count: data.count,
          cost: data.cost,
          sum: data.sum,
          owner,
          buyer,
          seller,
          resource
        });
      } else {
        throw new Error(`[${moment().utc().add(3, 'hours').format('HH:mm:ss')}] Для сделки нужен покупатель или продавец`);
      }
    }
  }

}
