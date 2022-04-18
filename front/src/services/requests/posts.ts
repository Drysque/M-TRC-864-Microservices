import { backendApi } from 'services/apiService';

export type Post = {
	title: string;
	description: string;
	user: string;
};

export type DeletePost = {
	id: string;
};

export type GetMessages = {
	id: string;
};

export type Message = {
	body: string;
	user: string;
};

export type AddMessage = {
	message: string;
	id: string;
};

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.query<Post[], void>({
			query: (body) => ({
				url: `/posts`,
				body,
			}),
			providesTags: ['Posts'],
		}),
		createNewPost: builder.mutation<void, FormData>({
			query: (body) => ({
				url: `/posts`,
				body,
				headers: { 'Content-Type': 'multipart/form-data' },
				method: 'POST',
			}),
			invalidatesTags: ['Posts'],
		}),
		deletePost: builder.mutation<void, DeletePost>({
			query: (params) => ({
				url: `/posts/${params.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Posts'],
		}),
		getPostMessages: builder.query<Message[], GetMessages>({
			query: (params) => ({
				url: `/posts/${params.id}/message`,
			}),
			providesTags: ['Posts'],
		}),
		addPostMessage: builder.query<void, AddMessage>({
			query: ({ id, ...body }) => ({
				url: `/posts/${id}/message`,
				body,
			}),
			providesTags: ['Posts'],
		}),
	}),
});

export const { useGetAllPostsQuery, useCreateNewPostMutation } = extendedApi;
