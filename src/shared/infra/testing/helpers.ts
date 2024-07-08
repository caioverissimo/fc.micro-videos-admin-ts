import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { CategoryModel } from "../../../category/infra/db/sequelize/category.model";
import sequelize from "sequelize";
import { Config } from "../config";

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(async () => {
    _sequelize = new Sequelize({
      // dialect: "sqlite",
      // storage: ":memory:",
      // models: [CategoryModel],
      // logging: false,
      ...Config.db(),
      ...options,
    });
  });

  beforeEach(async () => await _sequelize.sync({ force: true }));

  afterAll(async () => await _sequelize.close());

  return {
    get sequelize() {
      return _sequelize;
    }
  }
}



// const sequelizeInstance = setupSequelize();
// sequelizeInstance.sequelize;