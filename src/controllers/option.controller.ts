import { Get, Route, Tags,  Path } from "tsoa";
import {Options} from "../entities";
import {
  getOptions,
  getOption,
} from "../repositories/option.repository";

@Route("options")
@Tags("Options")
export default class OptionController {
  @Get("/")
  public async getBuilds(): Promise<Array<Options>> {
    return getOptions();
  }

  @Get("/:id")
  public async getCountry(@Path() id: string): Promise<Options | null> {
    return getOption(String(id));
  }
}
