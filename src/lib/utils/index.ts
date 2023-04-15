export const mapArrToObjValues = <T>(arr: T[]) => arr.map((item: T) => ({ val: item }));

export const mapObjValuesToArr = <T>(arr: { val: T }[]) => arr.map(({ val }) => val);
