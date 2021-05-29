import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import {Build} from "../entities";
import {
  getBuilds,
  getBuild,
} from "../repositories/build.repository";

@Route("builds")
@Tags("Build")
export default class BuildController {
  @Get("/")
  public async getBuilds(): Promise<Array<Build>> {
    return getBuilds();
  }

  @Get("/:id")
  public async getCountry(@Path() id: string): Promise<Build | null> {
    return getBuild(String(id));
  }
}
