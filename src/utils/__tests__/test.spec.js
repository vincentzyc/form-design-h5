import utils from "../index";
import { later } from "@/tests"

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

test("setCookie getCookie", () => {
  const mockId = "cookie";
  const mockData = "cookie data";
  utils.setCookie(mockId, mockData, 2);
  expect(utils.getCookie(mockId)).toEqual(mockData);
});

test("delCookie", async () => {
  const mockId = "cookie";
  const mockData = "cookie data";
  utils.setCookie(mockId, mockData, 1);
  await later()
  utils.delCookie(mockId)
  expect(utils.getCookie(mockId)).toEqual('');
});