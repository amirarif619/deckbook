import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardApi = createApi({
    reducerPath: 'cardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.pokemontcg.io/v2/',
        prepareHeaders: (headers) => {
            headers.set('X-Api-Key', 'my-api-key'); 
            return headers;
          },
        }),

        endpoints: (builder) => ({
            getCards: builder.query({
                query: (searchTerm = '') => `cards?q=name:${encodeURIComponent(searchTerm)}&pageSize=20`,
            }),
            getCardById: builder.query({
                query: (cardId) => `cards/${cardId}`, 
              }),
        }),
    });

export const { useLazyGetCardsQuery, useLazyGetCardByIdQuery } = cardApi;