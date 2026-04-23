import { baseApi } from './baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: (result) =>
        result && result.data
          ? [
            ...result.data.map(({ _id }: any) => ({ type: 'Categories' as const, id: _id })),
            { type: 'Categories', id: 'LIST' },
          ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/categories/add',
        method: 'POST',
        body: newCategory, // Expecting FormData
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/update/${id}`,
        method: 'PATCH',
        body: data, // Expecting FormData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Categories', id }, { type: 'Categories', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Categories', id }, { type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
