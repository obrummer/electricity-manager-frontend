import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwitchPoint } from '../../types';

// Define a service using a base URL and expected endpoints
export const switchesApi = createApi({
  reducerPath: 'switchesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getSwitches: builder.query<SwitchPoint[], void>({
      query: () => 'switches',
    }),
  }),
});

export const { useGetSwitchesQuery } = switchesApi;
