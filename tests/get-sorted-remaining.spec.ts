// tests/get-sorted-remaining.spec.tx
import { assert } from "chai"; 
import getSortedRemaining from "../src/get-sorted-remaining";

describe("getSortedRemaining Tests", () => {
    it("presorted below 8", () => {
        const numsQuantity = [8, 7, 6, 5, 4, 3, 2, 1, 0];
        const result = getSortedRemaining(numsQuantity);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("all 9s", () => {
        const numsQuantity = [9, 9, 9,  9, 9, 9,  9, 9, 9];
        const result = getSortedRemaining(numsQuantity);
        assert.deepEqual(result, []);
    });

    it("some 9s", () => {
        const numsQuantity = [8, 7, 9,  5, 4, 9,  2, 9, 0];
        const result = getSortedRemaining(numsQuantity);
        assert.deepEqual(result, [1, 2,  4, 5,   7,  9]);
    });
});

