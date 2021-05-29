import {Get, Route, Tags, Path, Post} from "tsoa";
import { getRepository, IsNull, Not } from "typeorm";
import {IncreaseResources, Resource, ResourceOwner,
  BuildOwner} from "../entities";
import {
  getResources,
  getResource,
} from "../repositories/resourse.repository";

@Route("resources")
@Tags("Resources")
export default class ResourceController {
  @Get("/")
  public async getResources(): Promise<Array<Resource>> {
    return getResources();
  }

  @Get("/:id")
  public async getResource(@Path() id: string): Promise<Resource | null> {
    return getResource(String(id));
  }

  @Get("/add-resources")
  public async addResources() {
    const resourcesOwnerRepository = getRepository(ResourceOwner);
    const buildOwnerRepository = getRepository(BuildOwner);
    const increaseRepository = getRepository(IncreaseResources);
    const allBuildOwners = await buildOwnerRepository.find({
      relations: ['country', 'build', 'build.changes', 'build.changes.resource'],
      where: {
        build: Not(IsNull())
      }});

    for(const buildOwner of allBuildOwners) {
      for(const change of buildOwner.build.changes) {
        const foundResource = await resourcesOwnerRepository.findOne({
          country: {id: buildOwner.country.id}, resource: change.resource
        });
        if(foundResource){
          await resourcesOwnerRepository.update(foundResource,
            {
              count: +foundResource.count + +change.count
            })
        }
      }
    }

    const startResources = await increaseRepository.find({relations: ['resource', 'country'],
      where: {
        country: Not(IsNull()),
        resource:Not(IsNull())
      }});

    for(const startResource of startResources) {
      const foundResource = await resourcesOwnerRepository.findOne({
        country: {id: startResource.country.id}, resource: startResource.resource
      });
      if(foundResource){
        await resourcesOwnerRepository.update(foundResource,
          {
            count: +foundResource.count + +startResource.count
          })
      }
    }
  }

}
