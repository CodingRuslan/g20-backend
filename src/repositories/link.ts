import { getRepository } from "typeorm";
import { Link } from "../entities";

export const getLinks = async (): Promise<Array<Link>> => {
  const linkRepository = getRepository(Link);
  return linkRepository.find();
};

