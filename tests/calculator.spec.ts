// tests/calculator.spec.tx
import { assert } from "chai";
import { addition } from "../src/calculator";

describe("Calculator Tests", () => {
    it("test addition", () => {
        const result = addition(2, 3);
        assert.equal(result, 5, "2 + 3 ?= 5");
    });

    it("test addition 2", () => {
        const result = addition(99, -3);
        assert.equal(result, 96, "99 + -3 ?= 96");

    });
});

