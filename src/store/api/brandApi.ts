import { baseApi } from './baseApi';

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => '/brands',
      providesTags: (result) =>
        result && result.data
          ? [
            ...result.data.map(({ _id }: any) => ({ type: 'Brands' as const, id: _id })),
            { type: 'Brands', id: 'LIST' },
          ]
          : [{ type: 'Brands', id: 'LIST' }],
    }),
    addBrand: builder.mutation({
      query: (newBrand) => ({
        url: '/brands/add',
        method: 'POST',
        body: newBrand, // Expecting FormData
      }),
      invalidatesTags: [{ type: 'Brands', id: 'LIST' }],
    }),
    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brands/update/${id}`,
        method: 'PATCH',
        body: data, // Expecting FormData
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Brands', id }, { type: 'Brands', id: 'LIST' }],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Brands', id }, { type: 'Brands', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
