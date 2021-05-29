import { Get, Route, Tags } from "tsoa";
import {Link} from "../entities";
import {
  getLinks,
} from "../repositories/link.repository";

@Route("links")
@Tags("Link")
export default class LinkController {
  @Get("/")
  public async getLinks(): Promise<Array<Link>> {
    return getLinks();
  }

}
