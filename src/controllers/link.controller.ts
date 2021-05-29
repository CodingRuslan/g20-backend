import { Get, Route, Tags } from "tsoa";
import {Link} from "../entities";
import {
  getLinks,
} from "../repositories/link.repository";

@Route("links")
@Tags("Links")
export default class LinkController {
  @Get("/header-links")
  public async getLinks(): Promise<Array<Link>> {
    return getLinks();
  }

}
