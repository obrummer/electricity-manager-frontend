import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Price } from '../../types';

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  tagTypes: ['Prices'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getPrices: builder.query<Price[], void>({
      query: () => 'electricityprice',
      // Provides a list of `Prices` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Prices` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ time }) => ({ type: 'Prices', time } as const)),
              { type: 'Prices', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Prices', id: 'LIST' }` is invalidated
            [{ type: 'Prices', id: 'LIST' }],
    }),
  }),
});

export const { useGetPricesQuery } = pricesApi;