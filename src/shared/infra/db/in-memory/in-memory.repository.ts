import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found.error";
import { IRepository } from "../../../domain/repository/repository-interface";
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