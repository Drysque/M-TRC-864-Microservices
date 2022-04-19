# Pantoufle

## Launch locally

Prerequisites:
- Docker
- Docker Compose


```
docker-compose up
```


## Frontend

Upload your pictures and discuss about them !
The uploaded pictures are compressed and viewable by everyone.

Developped in `ReactTS` with `ChakraUI`.

Visit `localhost:3000` to start sharing.


## Backend

Developped in `ExpressJS`.

Visit `localhost:3001/v1/docs` to view the swagger for more info.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/logout` - logout\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\

**User routes**:\
`GET /v1/users` - get all users\
`GET /v1/users/me` - get logged in user\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

**Posts routes**:\
`POST /v1/posts` - create a post\
`GET /v1/posts` - get all posts in user\
`GET /v1/posts/:postId` - get a post\
`PATCH /v1/posts/:postId` - update a post\
`DELETE /v1/posts/:postId` - delete a post\
`GET /v1/posts/:postId/message` - get all messages of a post\
`POST /v1/posts/:postId/message` - Add a message to a post\


## Image Compressor

Developped in `.NET`.

Visit `localhost:80/` to view the swagger for more info.
