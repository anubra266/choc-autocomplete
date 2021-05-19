export const runIfFn = (value: any, ...args: any[]) =>
  typeof value === 'function' ? value(...args) : value;

export const returnT = (variable: any) => variable && variable;
