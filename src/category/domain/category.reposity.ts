import { countBy, find } from "lodash";
import { IRepository } from "../../shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";


export interface ICategoryRepository extends IRepository<Category, Uuid> {

  // insert(valueObject) { // example
  insert(entity: Category) {
  // find() : Category[] {

  // }

  // count(): number // example
}

}




// **NOTATIONS:
// Repositories do NOT applies business logic
// "changeName" like method do NOT belong to a repository
// this should be a abstract contract

// This repository can be implemented in two ways here:
// - in memory
// - through sequelize