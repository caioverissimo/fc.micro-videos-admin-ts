import { CategoryFakeBuilder } from "../../domain/category-fake.builder";
import { Category } from "../../domain/category.entity";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe('CategoryInMemoryRepository', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  const faker = Category.fake();

  it('should no filter items when filter object is null', async () => {
    // const items = [Category.create({ name: "test" })];
    // const items = [faker.aCategory().withName("test").build()];
    const items = [faker.aCategory().build()];
    const filterSpy = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it('should filter items using filter parameter', async () => {
    // const items = [
    //   new Category({ name: "test" }),
    //   new Category({ name: "TEST" }),
    //   new Category({ name: "fake" }),
    // ];
    const fakerOnce = faker.aCategory();
    const items = [
      fakerOnce.withName("test").build(),
      fakerOnce.withName("TEST").build(),
      fakerOnce.withName("fake").build()
    ];

    const filterSpy = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('should sort by "created_at" when sort param is null', async () => {
    const created_at = new Date();

    // const items = [
    //   new Category({
    //     name: "test",
    //     created_at
    //   }),
    //   new Category({
    //     name: "TEST",
    //     created_at: new Date(created_at.getTime() + 100)
    //   }),
    //   new Category({
    //     name: "fake",
    //     created_at: new Date(created_at.getTime() + 200)
    //   }),
    // ];
    const fakerOnce = faker.aCategory();
    const items = [
      fakerOnce
        .withName('test')
        .withCreatedAt(created_at)
        .build(),
      fakerOnce
        .withName('TEST')
        .withCreatedAt(new Date(created_at.getTime() + 100))
        .build(),
      fakerOnce
        .withName('fake')
        .withCreatedAt(new Date(created_at.getTime() + 200))
        .build(),
    ];

    const itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort by name', async () => {
    // const items = [
    //   Category.create({ name: "c" }),
    //   Category.create({ name: "b" }),
    //   Category.create({ name: "a" }),
    // ];
    const fakerOnce = faker.aCategory();
    const items = [
      fakerOnce.withName("c").build(),
      fakerOnce.withName("b").build(),
      fakerOnce.withName("a").build(),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});