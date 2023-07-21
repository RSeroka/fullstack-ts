// tests/sudoku-section.spec.tx
import { assert } from "chai"; 
import { getSectionNumber9, getSectionNumber } from "../../src/sudoku/sudoku-section";

export default function getSectionNumberTests()  {
    it("getSectionNumber 0", () => {
        const result = getSectionNumber(9, 0, 0);
        assert.equal(result, 0);
    });

    it("getSectionNumber 8", () => {
        const result = getSectionNumber(9, 8, 8);
        assert.equal(result, 8);
    });


    it("getSectionNumber 4", () => {
        const result = getSectionNumber(9, 4, 4);
        assert.equal(result, 4);
    });


    it("getSectionNumber9 0", () => {
        const result = getSectionNumber9(0, 0);
        assert.equal(result, 0);
    });

    it("getSectionNumber9 8", () => {
        const result = getSectionNumber9(8, 8);
        assert.equal(result, 8);
    });


    it("getSectionNumber9 4", () => {
        const result = getSectionNumber9( 4, 4);
        assert.equal(result, 4);
    });

    it("getSectionNumber 3", () => {
        const result = getSectionNumber(9, 4, 0);
        assert.equal(result, 3);
    });

    it("getSectionNumber 6", () => {
        const result = getSectionNumber(9, 7, 0);
        assert.equal(result, 6);
    });


    it("getSectionNumber 1", () => {
        const result = getSectionNumber(9, 2, 5);
        assert.equal(result, 1);
    });
  
}