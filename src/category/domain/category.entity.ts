import { Uuid } from "../../shared/domain/value-objects/uuid.vo";

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
}

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class Category {
  // category_id: string; // here was a type error, for toJSON method
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    // to initialize uuid in case of not been received
    // instead 'new Uuid()', we can implement an static method like 'create' inside Uuid
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  // factory method
  static create(props: CategoryConstructorProps): Category {
    return new Category(props);
  }

  // update(props: Partial<CategoryConstructorProps>): Category {
  //   return new Category({ ...this, ...props});
  // }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    }
  }
}
// banco de dados - tabela categorias


// Category.create({})

// new Category()