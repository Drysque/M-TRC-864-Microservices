import { backendApi } from 'services/apiService';

import { User } from './user';

type AuthLoginRequest = {
	email: string;
	password: string;
};

type AuthRegisterRequest = AuthLoginRequest & {
	name: string;
};

type AuthResponse = {
	user: User;
	tokens: {
		access: {
			token: string;
		};
	};
};

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<AuthResponse, AuthRegisterRequest>({
			query: (params) => ({
				url: `/auth/register`,
				method: 'POST',
				body: params,
			}),
		}),
		login: builder.mutation<AuthResponse, AuthLoginRequest>({
			query: (params) => ({
				url: `/auth/login`,
				method: 'POST',
				body: params,
			}),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = extendedApi;
