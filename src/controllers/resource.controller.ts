import { Get, Route, Tags,  Path } from "tsoa";
import {Resource} from "../entities";
import {
  getResources,
  getResource,
} from "../repositories/resourse.repository";

@Route("resource")
@Tags("Resource")
export default class ResourceController {
  @Get("/")
  public async getResources(): Promise<Array<Resource>> {
    return getResources();
  }

  @Get("/:id")
  public async getResource(@Path() id: string): Promise<Resource | null> {
    return getResource(String(id));
  }
}
