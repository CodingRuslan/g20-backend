import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Country } from "../entities";
import {
  getCountries,
  createCountry,
  getCountry,
  ICountyPayload,
} from "../repositories/country";

@Route("countries")
@Tags("Country")
export default class CountryController {
  @Get("/")
  public async getCountries(): Promise<Array<Country>> {
    return getCountries();
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
