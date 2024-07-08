
import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategoryModelMapper } from "../category-model-mapper";
import { EntityValidationError } from "../../../../../shared/domain/validators/validation.error";
import { Category } from "../../../../domain/category.entity";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe('CategorModelMapper | Integration Test', () => {
  // let sequelize;

  // beforeEach(async () => {
  //   sequelize = new Sequelize({
  //     dialect: "sqlite",
  //     storage: ":memory:",
  //     models: [CategoryModel],
  //     logging: false // set 'true' to enable sequelize execution logs
  //   });

  //   await sequelize.sync({ force: true });
  // });
  setupSequelize({ models: [CategoryModel] });

  it('should throw error when category is invalid', () => {
    // expect.assertions(2); // not need necessarily
    const model = CategoryModel.build({
      category_id: "d7290e67-3b70-4b2e-85dc-8f1222b6e756",
    });

    try {
      CategoryModelMapper.toEntity(model);
      fail(
        "The category is valid, but it needs throw a EntityValidationError"
      );
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ]
      });
    }
  });

  it('should convert a category model to a category aggregate', () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      category_id: "d7290e67-3b70-4b2e-85dc-8f1222b6e756",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });

    const aggregate = CategoryModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      new Category({
        category_id: new Uuid("d7290e67-3b70-4b2e-85dc-8f1222b6e756"),
        name: "some value",
        description: "some description",
        is_active: true,
        created_at,
      }).toJSON(),
    );
  });

  it('should convert a category aggregate to a category model', () => {
    const created_at = new Date();
    const aggregate = new Category({
      category_id: new Uuid("d7290e67-3b70-4b2e-85dc-8f1222b6e756"),
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });

    const model = CategoryModelMapper.toModel(aggregate);
    expect(model.toJSON()).toStrictEqual({
      category_id: "d7290e67-3b70-4b2e-85dc-8f1222b6e756",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
  });
});