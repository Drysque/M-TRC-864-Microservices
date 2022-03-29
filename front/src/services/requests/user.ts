import { backendApi } from 'services/apiService';

import { User } from './auth';

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/users/me',
			providesTags: ['User'],
		}),
	}),
});

export const { useGetUserQuery, useLazyGetUserQuery } = extendedApi;
