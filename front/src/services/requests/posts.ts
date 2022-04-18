import { backendApi } from 'services/apiService';

type Post = {
	post: {
		description: string;
		user: { name: string; id: string };
		id: string;
		file: string;
	};
	messages: Message[];
};

type DeletePost = {
	id: string;
};

type UpdatePost = {
	description: string;
	id: string;
};

type GetPost = {
	id: string;
};

type Message = {
	id: string;
	body: string;
	user: { name: string; id: string };
	addedTimestamp: string;
};

type AddMessage = {
	message: string;
	id: string;
};

const extendedApi = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllPosts: builder.query<Post['post'][], void>({
			query: () => ({
				url: `/posts`,
			}),
			providesTags: ['Posts'],
		}),
		getPost: builder.query<Post, GetPost>({
			query: ({ id }) => ({
				url: `/posts/${id}`,
			}),
			providesTags: ['Posts'],
		}),
		createNewPost: builder.mutation<void, FormData>({
			query: (body) => ({
				url: `/posts`,
				body,
				method: 'POST',
			}),
			invalidatesTags: ['Posts'],
		}),
		updatePost: builder.mutation<void, UpdatePost>({
			query: ({ id, ...body }) => ({
				url: `/posts/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Posts'],
		}),
		deletePost: builder.mutation<void, DeletePost>({
			query: ({ id }) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Posts'],
		}),
		addPostMessage: builder.mutation<void, AddMessage>({
			query: ({ id, ...body }) => ({
				url: `/posts/${id}/message`,
				body,
				method: 'POST',
			}),
			invalidatesTags: ['Posts'],
		}),
	}),
});

export const {
	useGetAllPostsQuery,
	useCreateNewPostMutation,
	useAddPostMessageMutation,
	useDeletePostMutation,
	useGetPostQuery,
	useUpdatePostMutation,
} = extendedApi;
