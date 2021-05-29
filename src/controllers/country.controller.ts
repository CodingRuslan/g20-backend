import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Country } from "../entities";
import { getRepository } from "typeorm";

import {
  getCountries,
  createCountry,
  getCountry,
  ICountyPayload,
  IAddMoneyCountyPayload
} from "../repositories/country.repository";


@Route("countries")
@Tags("Country")
export default class CountryController {
  @Get("/")
  public async getCountries(): Promise<Array<Country>> {
    return getCountries();
  }

  @Post("/add-money")
  public async addMoney(@Body() {country, money}: IAddMoneyCountyPayload) {
    const countriesRepository = getRepository(Country);
    const selectCountry = await countriesRepository.findOne({id: country});
    return await countriesRepository.save({...selectCountry, money: Number(selectCountry?.money) + Number(money)})
  }
  //
  // @Post("/")
  // public async createCountry(@Body() body: ICountyPayload): Promise<Country> {
  //   return createCountry(body);
  // }
  //
  @Get("/:id")
  public async getCountry(@Path() id: string): Promise<Country | null> {
    return getCountry(String(id));
  }
}
