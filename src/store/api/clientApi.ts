import { baseApi } from './baseApi';

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/clients',
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ _id }: any) => ({ type: 'Clients' as const, id: _id })),
              { type: 'Clients', id: 'LIST' },
            ]
          : [{ type: 'Clients', id: 'LIST' }],
    }),
    addClient: builder.mutation({
      query: (newClient) => ({
        url: '/clients/add',
        method: 'POST',
        body: newClient, // Expecting FormData
      }),
      invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
    }),
    updateClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/clients/update/${id}`,
        method: 'PATCH',
        body: data, // Expecting FormData
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Clients', id }, { type: 'Clients', id: 'LIST' }],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Clients', id }, { type: 'Clients', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;

export default clientApi;
