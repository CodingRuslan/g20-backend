import { getRepository } from "typeorm";
import { Country } from "../entities";

export interface ICountyPayload {
  name: string;
  uniqTradeKey: string;
  img?: string;
  money: number;
}

export interface IAddMoneyCountyPayload {
  country: string,
  money: number;
}

export const getCountries = async (): Promise<Array<Country>> => {
  const countryRepository = getRepository(Country);
  return countryRepository.find();
};

export const createCountry = async (payload: ICountyPayload): Promise<Country> => {
  const countryRepository = getRepository(Country);
  const country = new Country();
  return countryRepository.save({
    ...country,
    ...payload,
  });
};

export const getCountry = async (id: string): Promise<Country | null> => {
  const countryRepository = getRepository(Country);
  const country = await countryRepository.findOne({ id: id });
  if (!country) return null;
  return country;
};
