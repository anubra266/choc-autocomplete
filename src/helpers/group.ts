import { State } from "../store";

export const hasFirstOption = (children: any, state: State) =>
  children?.some((child: any) => child.key === state.item.filtered[0]?.key);
