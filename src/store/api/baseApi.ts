import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://khidmah-backend.vercel.app/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result && result.data
          ? [
            ...result.data.map(({ _id }: any) => ({ type: 'Products' as const, id: _id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = baseApi;
