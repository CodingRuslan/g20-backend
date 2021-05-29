import { getRepository } from "typeorm";
import { Build } from "../entities";

export interface IBuildPayload {
  name: string;
  icon: string;
  moneyCost: number;
}

export const getBuilds = async (): Promise<Array<Build>> => {
  const buildRepository = getRepository(Build);
  return buildRepository.find();
};

export const createBuild = async (payload: IBuildPayload): Promise<Build> => {
  const buildRepository = getRepository(Build);
  const build = new Build();
  return buildRepository.save({
    ...build,
    ...payload,
  });
};

export const getBuild = async (id: string): Promise<Build | null> => {
  const buildRepository = getRepository(Build);
  const build = await buildRepository.findOne({ id: id });
  if (!build) return null;
  return build;
};
