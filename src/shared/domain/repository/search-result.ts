import { Entity } from "../entity";
import { ValueObject } from "../value-object";

// type SearchResultProps<A extends AggregateRoot> = {
type SearchResultConstructorProps<E extends Entity> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
}

// export class SearchResult<A extends AggregateRoot = AggregateRoot> {
export class SearchResult<A extends Entity = Entity> extends ValueObject {
  readonly items: A[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;

  constructor(props: SearchResultConstructorProps<A>) {
    super();
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
  }

  // toJSON(forceAggregate = false) {
  toJSON(forceEntity = false) {
    return {
      // items: forceAggregate
      items: forceEntity
        ? this.items.map((item) => item.toJSON())
        : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page
    }
  }
}