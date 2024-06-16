import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { IRepository, ISearchableRepository } from "../../../domain/repository/repository-interface";
import { SearchParams, SortDirection } from "../../../domain/repository/search-params";
import { SearchResult } from "../../../domain/repository/search-result";
import { ValueObject } from "../../../domain/value-object";

// "abstract" cause is not be necessary used; do not requires implementation
export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    // throw new Error("Method not implemented");
    const indexFound = this.items.findIndex((item) => item.entity_id.equals(entity.entity_id));

    if (indexFound === -1) {
      // throw new Error("Entity not found");
      throw new NotFoundError(entity.entity_id, this.getEntity());
    }

    this.items[indexFound] = entity;
  };

  async delete(entity_id: EntityId): Promise<void> {
    // throw new Error("Method not implemented");

    const indexFound = this.items.findIndex((item) => item.entity_id.equals(entity_id));

    if (indexFound === -1) {
      // throw new Error("Entity not found");
      throw new NotFoundError(entity_id, this.getEntity());
    }

    this.items.splice(indexFound, 1);
  };

  async findById(entity_id: EntityId): Promise<E> {
    // throw new Error("Method not implemented");
    // return this._get(entity_id);

    const item = this.items.find((item) => item.entity_id.equals(entity_id));
    return typeof item === "undefined" ? null : item;
  };

  async findAll(): Promise<E[]> {
    // throw new Error("Method not implemented");
    return this.items;
  };

  // protected _get(entity_id: EntityId) {
  //   const item = this.items.find((item) => item.entity_id.equals(entity_id));
  //   return typeof item === "undefined" ? null : item;
  // }

  // "abstract" cause is not be necessary used; do not requires implementation
  abstract getEntity(): new (...args: any[]) => E;
}

export abstract class InMemorySearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  Filter = string
> extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter> {

  sortableFields: string[] = [];

  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    // throw new Error("Method not implemented");

    // filter, pagination and sort
    const itemsFiltered = await this.applyFilter(
      this.items,
      props.filter
    );

    const itemsSorted = this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );

    const itemsPaginated = this.applyPagination(
      itemsSorted,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }

  protected abstract applyFilter(items: E[], filter: Filter | null): Promise<E[]>;

  protected applyPagination(items: E[], page: SearchParams["page"], per_page: SearchParams["per_page"]) {
    const start = (page - 1) * per_page; // 1 * 5 = 15
    const limit = start + per_page; // 15 + 15 = 30
    return this.items.slice(start, limit);
  }

  protected applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
    custom_getter?: (sort: string, item: E) => any
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      // TODO: fix this ts warnings
      //@ts-ignore
      const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
      //@ts-ignore
      const bValue = custom_getter ? custom_getter(sort, b) : b[sort];

      if (aValue < bValue) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort_dir === 'asc' ? 1 : 1;
      }

      return 0;
    });
  }
}