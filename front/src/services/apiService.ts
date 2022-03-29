import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const apiBase = fetchBaseQuery({
	baseUrl: `${backendUrl}/v1`,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token');
		if (token) headers.set('authorization', `Bearer ${token}`);
		return headers;
	},
});

export const backendApi = createApi({
	tagTypes: ['User'],
	reducerPath: 'backendApi',
	baseQuery: apiBase,
	endpoints: () => ({}),
});
