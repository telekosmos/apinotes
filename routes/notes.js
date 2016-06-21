'use strict';

const router = require('koa-router')()
const dataManager = require('../lib/datamanager')

// curl -X GET http://localhost:4444/
router.get('/', function (ctx, next) {
  ctx.body = dataManager.getAll();
})

router.post('/create', function(ctx, next) {
  var content = ctx.request.body.content;
  console.log(`/notes/create?${content}`)
  return dataManager.create(content)
    .then(res => {
      ctx.body = {ok: true};
    });  
})

router.get('/all', function(ctx, next) {
  ctx.body = dataManager.getAll();  
})

router.get('/:id', function(ctx, next) {
  
})

router.get('/faves', function(ctx, next) {
  
})

// Mark id as fave
router.put('/fave/:id', function(ctx, next) {
  
})
module.exports = router
