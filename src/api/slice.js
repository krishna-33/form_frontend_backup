import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const VITE_BE_URL = import.meta.env.VITE_BE_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: VITE_BE_URL }),
    tagTypes: ["Form"],
    endpoints: (builder) => ({
        getForms: builder.query({
            query: ({ endpoint = '' }) => `${endpoint}`,
            providesTags: ["Form"]
        }),
        updataById: builder.mutation({
            query: ({ endpoint = "", id = "", body, ...props }) => ({
                url: `${endpoint}/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ["Form"]
        }),
        addForm: builder.mutation({
            query: ({ endpoint = "", id = "", body, ...props }) => ({
                url: `${endpoint}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["Form"]
        }),
        addResponse: builder.mutation({
            query: ({ endpoint = "", id = "", body, ...props }) => ({
                url: `${endpoint}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["Form"]
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFormsQuery, useLazyGetFormsQuery, useUpdataByIdMutation, useAddFormMutation, useAddResponseMutation } = api