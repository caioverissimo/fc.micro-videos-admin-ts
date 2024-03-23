import { InvalidUuidError, Uuid } from "../value-objects/uuid.vo";
import { validate as uuidValidate } from "uuid";

describe('Uuid | Unit Tests', () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  it('should throw error when uuid is invalid', () => {
    const uuidGeneration = () => {
      new Uuid('invalid-uuid')
    };

    expect(uuidGeneration).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a valid uuid', () => {
    const uuid = new Uuid();

    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })

  it('should accept a valid uuid', () => {
    const uuid = new Uuid('d36bd018-d6c3-4119-8d79-6c1297263eda');

    expect(uuid.id).toBe('d36bd018-d6c3-4119-8d79-6c1297263eda');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
});