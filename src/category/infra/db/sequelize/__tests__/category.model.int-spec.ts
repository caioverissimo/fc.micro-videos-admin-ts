import { DataType, Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { Category } from "../../../../domain/category.entity";
import { Config } from "../../../../../shared/infra/config";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe('CategoryModel | Integration Tests', () => {
  let sequelize;

  // beforeEach(async () => {
  //   // console.log('Config.db(): ', Config.db());
  //   // sequelize = new Sequelize({
  //   //   dialect: "sqlite",
  //   //   storage: ":memory:",
  //   //   models: [CategoryModel],
  //   //   logging: false // set 'true' to enable sequelize execution logs
  //   // });

  //   // await sequelize.sync({ force: true });
  // });
  setupSequelize({ models: [CategoryModel] });

  it('should create a category', async () => {
    const category = Category.fake().aCategory().build();

    await CategoryModel.create({
      category_id: category.category_id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    });
  });

  it('mapping props', () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(CategoryModel.getAttributes());

    // console.log('attributes: ', attributes);
    // console.log('attributesMap: ', attributesMap)

    expect(attributes).toStrictEqual([
      "category_id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    const categoryIdAttr = attributesMap.category_id;
    expect(categoryIdAttr).toMatchObject({
      field: "category_id",
      fieldName: "category_id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  it('create', async () => {
    // arrange
    const arrange = {
      category_id: "67a2e04f-34ac-4f77-9925-7ab4d72bcf21",
      name: "test",
      is_active: true,
      created_at: new Date(),
    };

    // act
    const category = await CategoryModel.create(arrange);

    // assert
    expect(category.toJSON()).toStrictEqual(arrange);
  });

});