import { Category } from "../domain/category.entity"

describe('Category | Unit Tests', () => {
  describe ('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie'
      });

      expect(category.category_id).toBeUndefined();
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

      expect(category.category_id).toBeUndefined();
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

      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('changeName()', () => {
    it('should change name', () => {
      const category = new Category({
        name: 'Movie',
      });

      category.changeName('other name');
      expect(category.name).toBe('other name');
    });
  });

  describe('changeDescription()', () => {
    it('should change description', () => {
      const category = new Category({
        name: 'Movie',
      });

      category.changeDescription('movie new description');
      expect(category.description).toBe('movie new description');
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