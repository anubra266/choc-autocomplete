export const isChild = (child: any, type: string) => {
  return child.type.displayName === type ? child.key || true : false;
};
