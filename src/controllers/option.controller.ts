import {Get, Route, Tags, Path, Post} from "tsoa";
import {Options} from "../entities";
import {
  getOptions,
  getOption,
} from "../repositories/option.repository";
import {getRepository} from "typeorm";

@Route("options")
@Tags("Options")
export default class OptionController {
  @Get("/")
  public async getOptions(): Promise<Array<Options>> {
    return getOptions();
  }

  @Get("/:id")
  public async getOption(@Path() id: string): Promise<Options | null> {
    return getOption(String(id));
  }

  @Get("/is-game-going")
  public async isGameGoing() {
    const optionsRepository = getRepository(Options);
    let status = await optionsRepository.findOne({ name: 'isGameGoing'});
    if(!status) {
      status = await optionsRepository.save({name: 'isGameGoing', value: true});
    }
    return status;
  }

  @Post("/set-game-status")
  async changeStatusOfGame() {
    const optionsRepository = getRepository(Options);
    const status = await optionsRepository.findOne({ name: 'isGameGoing'});
    return await optionsRepository.update(status as any, { value: !status?.value})
  }
}
