import { backendApi } from 'services/apiService';

export type Post = {
	id: string;
	url: string;
};

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({}),
});

export const {} = extendedApi;
