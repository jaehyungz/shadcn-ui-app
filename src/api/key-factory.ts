import {
  createQueryKeys,
  inferQueryKeyStore,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

const userKeys = createQueryKeys("user", {
  list: () => ({
    queryKey: ["getUsers"],
  }),
  info: () => ({
    // queryKey: ["user-info", pathName],
    queryKey: ["user-info"],
  }),
});

export const queryKeys = mergeQueryKeys(userKeys);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
