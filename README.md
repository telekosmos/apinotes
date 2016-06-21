# Koa notes sample

Simple API for a Twitter/Notes-like scenario.

## Endpoints
- GET `/notes/`, `/notes/all` return all notes
- POST `/notes/create` create new note with parameter content
- GET `/notes/:id` get an note with id
- POST `/notes/fave/:id` mark a note as fave
- GET `/notes/faves` get all fave notes
- POST `/notes/clearall` will clear the notes database

## STEPS
1. `git clone` this repo
2. `npm install`
4. `mocha` to run the tests
3. `gulp start` will start the server listening on port 3210


## PLAY
Tested and functional in node@~4.2

`curl -X GET http://localhost:3210/notes`
```
[
  {
    "id": 1,
    "content": "This is only a test",
    "fave": true
  },
  {
    "id": 2,
    "content": "2nd note",
    "fave": false
  }
]
```
`curl -X POST --data 'content: This would be the 3RD note' http://localhost:3210/notes/create`

```
{"ok": true }
``

`curl -XPOST --data 'id=3' http://localhost:3210/notes/fave`
```
{
  "id": 3,
  "fave": true
}
```
`curl -XGET http://localhost:3210/notes/faves`
```
[
  {
    "id": 1,
    "content": "This is only a test",
    "fave": true
  },
  {
    "id": 3,
    "fave": true
  }
]
```

                                       `