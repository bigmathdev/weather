import { expect, test } from "vitest";
import { soma } from "./soma";

test('texto deve ser igual ao texto', () => {
  expect(soma("Matheus")).equal("Beatriz")
})