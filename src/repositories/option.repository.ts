import { getRepository } from "typeorm";
import { Options } from "../entities";

export const getOptions = async (): Promise<Array<Options>> => {
  const optionRepository = getRepository(Options);
  return optionRepository.find();
};

export const getOption = async (id: string): Promise<Options | null> => {
  const optionRepository = getRepository(Options);
  const option = await optionRepository.findOne({ id: id });
  if (!option) return null;
  return option;
};
