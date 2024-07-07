import { countBy, find } from "lodash";
import { IRepository, ISearchableRepository } from "../../shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { SearchParams } from "../../shared/domain/repository/search-params";
import { SearchResult } from "../../shared/domain/repository/search-result";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {

}

export class CategorySearchResult extends SearchResult<Category> {

}


// export interface ICategoryRepository extends IRepository<Category, Uuid> { }
export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    Uuid,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {
}




// **NOTATIONS:
// Repositories do NOT applies business logic
// "changeName" like method do NOT belong to a repository
// this should be a abstract contract

// This repository can be implemented in two ways here:
// - in memory
// - through sequelize