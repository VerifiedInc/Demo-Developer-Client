import { isValidJson } from '../../utils/isValidJson';

describe('isValidJson', () => {
  it('returns true for a valid JSON string', () => {
    const json = '{ "a": "test", "b": [{ "c": "d"}] }';
    const result = isValidJson(json);
    expect(result).toBe(true);
  });

  it('returns false if the string is not valid JSON', () => {
    const notJson = 'test';
    const result = isValidJson(notJson);
    expect(result).toBe(false);
  });
});
