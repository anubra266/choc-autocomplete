import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./model";

const typedHooks = createTypedHooks<StoreModel>();

// We export the hooks from our store as they will contain the
// type information on them
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
