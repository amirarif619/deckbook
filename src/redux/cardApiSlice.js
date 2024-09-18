import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardApi = createApi({
    reducerPath: 'cardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.pokemontcg.io/v2/',
        prepareHeaders: (headers) => {
            headers.set('X-Api-Key', 'your-api-key-here'); // Add your API key here
            return headers;
          },
        }),

        endpoints: (builder) => ({
            getCards: builder.query({
                query: () => 'cards?pagesSize=20',
            }),
        }),
    });

export const { useLazyGetCardsQuery } = cardApi;