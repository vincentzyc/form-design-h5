import utils from "../index";

test('getType', () => {
  const obj = {}, arr = [], num = 1, str = "1", bool = false, isNull = null, isUndefined = undefined;
  expect(utils.getType(obj)).toBe('Object');
  expect(utils.getType(arr)).toBe('Array');
  expect(utils.getType(num)).toBe('Number');
  expect(utils.getType(str)).toBe('String');
  expect(utils.getType(bool)).toBe('Boolean');
  expect(utils.getType(isNull)).toBe('Null');
  expect(utils.getType(isUndefined)).toBe('Undefined');
})