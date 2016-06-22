'use strict';

const router = require('koa-router')()
const dataManager = require('../lib/datamanager').datamanager;

// curl -X GET http://localhost:4444/
router.get('/', function (ctx, next) {
  ctx.body = dataManager.getAll();
})

router.post('/create', function(ctx, next) {
  var content = ctx.request.body.content;
  return dataManager.create(content)
    .then(res => {
      ctx.body = {ok: true};
    });  
})

// Switch id fave false <-> true
router.post('/fave', function(ctx, next) {
  return dataManager.setFave(ctx.request.body.id)
    .then(res => {
      ctx.body = res;
    })
})

router.get('/faves', function(ctx, next) {
  ctx.body = dataManager.faves();
})

router.get('/all', function(ctx, next) {
  ctx.body = dataManager.getAll();  
})

router.get('/:id', function(ctx, next) {
  ctx.body = dataManager.get(ctx.params.id);
})


router.post('/clearall', function(ctx, next) {
  return dataManager.clearAll()
    .then(function(resp) {
      ctx.body = resp;
    })
})

module.exports = router
