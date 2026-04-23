import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://khidmah-backend.vercel.app/api' }),
  tagTypes: ['Products', 'Categories', 'Brands'],
  endpoints: () => ({}),
});
