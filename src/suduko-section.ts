

export function getSectionNumber(size: number, row: number, col: number) : number {
    if (size !== 9) {
        throw new Error(`getSectionNumber not implemented with size: ${size}`);
    }
    return getSectionNumber9(row, col);
}

export function getSectionNumber9(row: number, col: number) : number {
    return Math.trunc(row / 3) * 3 + Math.trunc(col / 3);
}