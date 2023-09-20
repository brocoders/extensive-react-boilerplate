type KeyType<K = unknown> = {
  key: K[];
  sub?: Record<string, BodyType>;
};

// Need for recursive type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BodyType = (...params: any[]) => KeyType;

type AllType = {
  all: () => Pick<KeyType, "key">;
};

/*
  Function for building factory keys for react-query

  Example of usage:

  const posts = createQueryKeys(['posts'], {
    details: () => ({
      key: [],
      sub: {
        detail: (id: number) => ({
          key: [id],
          sub: {
            likes: () => ({
              key: [],
            }),
          },
        }),
      },
    }),
    lists: () => ({
      key: [],
      sub: {
        list: (filter: string) => ({
          key: [filter],
        }),
      },
    }),
  });

  Output:
  {
    all: () => {
      key: ['posts']
    },
    details: () => ({
      key: ['posts', 'details'],
      sub: {
        detail: (id: number) => ({
          key: ['posts', 'details', 'detail', id],
          sub: {
            likes: () => ({
              key: ['posts', 'details', 'detail', id, 'likes'],
            }),
          },
        }),
      },
    }),
    lists: () => ({
      key: ['posts', 'lists'],
      sub: {
        list: (filter: string) => ({
          key: ['posts', 'lists', 'list', filter],
        }),
      },
    }),
  }

  posts.details().sub.detail(42).sub.likes().key // ['posts', 'details', 'detail', 42, 'likes']
 */

export function createQueryKeys<T extends Record<string, BodyType>>(
  rootName: unknown[],
  keys: T = {} as T
): T & AllType {
  return {
    all: () => ({
      key: rootName,
    }),
    ...(Object.keys(keys).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: (...params: Parameters<BodyType>) => {
          const { key: keyName, sub } = keys[key](...params);

          return {
            key: [...rootName, key, ...keyName],
            ...(sub && {
              sub: createQueryKeys([...rootName, key, ...keyName], sub),
            }),
          };
        },
      }),
      {}
    ) as T),
  };
}
