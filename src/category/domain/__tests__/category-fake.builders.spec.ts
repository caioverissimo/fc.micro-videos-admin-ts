
import { Chance } from 'chance';
import { CategoryFakeBuilder } from '../category-fake.builder';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';


describe('CategoryFakerBu8lder | Unit Tests', () => {
  describe('category_id prop', () => {
    const faker = CategoryFakeBuilder.aCategory();

    it('should throw erro when any with methods has called', () => {
      expect(() => faker.category_id).toThrow(
        new Error(
          "Property category_id not have a factory, use 'with' methods",
        ),
      );
    });

    // it('should be undefined', () => {
    //   expect(faker['_category_id']).toBeUndefined();
    // });
  });
});