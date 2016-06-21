# Koa notes sample

Simple API for a Twitter-like scenario. 

## Endpoints
- GET `/api/` return the endpoints
- POST `/api/create` create new note
- GET `/api/all` get all notes
- GET `/api/:id` get note id (or, easier, /api/get/:id)
- POST `/api/fave/:id mark a note as fave
- GET `/api/faves get all fave notes

## STEPS
1. API normal, como en los ejemplos
2. Parte visual, paginitas para ver los resultados
3. Authentication!!

## DETAILS
- Return json (check for XML)
- Not using persisteng storate: use an array of objects to manage the notes
- So, unit testing is everything but the routes, which can be done also