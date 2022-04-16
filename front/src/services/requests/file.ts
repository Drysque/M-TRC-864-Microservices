import { backendApi } from 'services/apiService';

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		upload: builder.mutation<void, void>({
			query: (params) => ({
				url: `/auth/register`,
				method: 'POST',
				body: params,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}),
		}),
	}),
});

export const { useUploadMutation } = extendedApi;
