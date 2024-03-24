import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity"

describe('Category | Unit Tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  })

  describe('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie'
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it('should create a category with all values', () => {
      const created_at = new Date();

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });
  });

  describe('create command', () => {
    it('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: "some description"
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe("some description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() }
    ];

    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);

      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    })
  });

  describe('changeName()', () => {
    it('should change name', () => {
      // const category = new Category({
      //   name: 'Movie',
      // });
      const category = Category.create({
        name: 'Movie',
      });

      category.changeName('other name');
      expect(category.name).toBe('other name');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('changeDescription()', () => {
    it('should change description', () => {
      // const category = new Category({
      //   name: 'Movie',
      // });
      const category = Category.create({
        name: 'Movie',
      });

      category.changeDescription('movie new description');
      expect(category.description).toBe('movie new description');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('activate()', () => {
    it('should change is_active to true', () => {
      const category = new Category({
        name: 'Movie',
        is_active: false,
      });

      category.activate();
      expect(category.is_active).toBeTruthy();
    });
  });

  describe('deactivate()', () => {
    it('should change is_active to false', () => {
      const category = new Category({
        name: 'Movie',
      });

      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
  });

  describe('toJSON()', () => {
    it('should convert to JSON object', () => {
      const created_at = new Date();

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      });

      expect(category).toMatchObject({
        name: 'Movie',
        description: 'Movie description',
        is_active: false,
        created_at
      })
    });
  });
});

describe('Category Validator | Unit Tests', () => {

  // TODO: for this to work, need to fix on 'jest.config.ts'(at the project root)
  describe('create command', () => {
    // it('should throw error when name is empty string', () => {

    //   // setupFilesAfterEnv: ["./shared/infra/testing/expect-helpers.ts"],

    //   // expect(() => Category.create({ name: null }))
    //   //   .containsErrorMessages({
    //   //     name: [
    //   //       "name should not be empty",
    //   //       "name must be a string",
    //   //       "name must be shorter than or equal to 255 characters"
    //   //     ],
    //   //   })

    //   // expect(() => Category.create({ name: '' })).containsErrorMessages({
    //   //   name: ['name should not be empty'],
    //   // })

    //   // expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
    //   //   name: [
    //   //     'name must be a string',
    //   //     'name must be shorter or equal to 255 characters',
    //   //   ],
    //   // });

    //   // expect(() =>
    //   //   Category.create({ name: 't'.repeat(256) }),
    //   // ).containsErrorMessages({
    //   //   name: ['name must be shorter than or equal to 255 characters'],
    //   // });

    //   // expect(() => {
    //   //   Category.create({
    //   //     name: "",
    //   //   });
    //   // }).toThrow(
    //   //   new EntityValidationError({
    //   //     name: ["name is required"],
    //   //   })
    //   // );

    //   // try {
    //   //   Category.create({
    //   //     name: null
    //   //   });
    //   // } catch (err) {
    //   //   console.error(err);
    //   // }
    // })

    // it('should a invalid category using description property', () => {
    //   expect(() =>
    //     Category.create({ description: 5 } as any)
    //   ).containsErrorMessages({
    //     description: ['description must be a string'],
    //   });
    // });

    // it('should a invalid category using is_active property', () => {
    //   expect(() =>
    //     Category.create({ is_active: 5 } as any)
    //   ).containsErrorMessages({
    //     description: ['is_active must be a boolean value'],
    //   });
    // });
  });

  // describe('changeName method', () => {
  //   it('should a invalid category using name property', () => {
  //     const category = Category.create({ name: 'Movie' });

  //     expect(() => category.changeName(null)).containsErrorMessages({
  //       name: [
  //         'name should not be empty',
  //         'name must be a string',
  //         'name must be shorter than or equal to 255 characters'
  //       ]
  //     });

  //     expect(() => category.changeName('')).containsErrorMessages({
  //       name: ['name should not be empty']
  //     });

  //     expect(() => category.changeName(5 as any)).containsErrorMessages({
  //       name: [
  //         'name must be a string',
  //         'name must be shorter than or equal to 255 characters'
  //       ]
  //     });

  //     expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
  //       name: ['name must be shorter than or equal to 255 characters']
  //     });
  //   });
  // });

  // describe('changeDescription method', () => {
  //   it('should a invalid category using description property', () => {
  //     const category = Category.create({ name: "Movie" });

  //     expect(() => category.changeDescription(5 as any)).containsErrorMessages({
  //       description: ['description must be a string']
  //     });
  //   });
  // });
  // endof TODO: for this to work, need to fix on 'jest.config.ts'(at the project root)
});