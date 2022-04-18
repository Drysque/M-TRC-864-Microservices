import { backendApi } from 'services/apiService';

export type User = {
	id: string;
	email: string;
	name: string;
};

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/users/me',
			providesTags: ['User'],
		}),
	}),
});

export const { useGetUserQuery, useLazyGetUserQuery } = extendedApi;
