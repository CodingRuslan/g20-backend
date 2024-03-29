import { getRepository } from "typeorm";
import { Resource } from "../entities";

export const getResources = async (): Promise<Array<Resource>> => {
  const resourceRepository = getRepository(Resource);
  return resourceRepository.find();
};

export const getResource = async (id: string): Promise<Resource | null> => {
  const resourceRepository = getRepository(Resource);
  const resource = await resourceRepository.findOne({ id: id });
  if (!resource) return null;
  return resource;
};
