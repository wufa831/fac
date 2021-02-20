const Koa = require('koa');

const app = new Koa();
app.use((ctx) => {
  console.log(ctx.URL);
  console.log(ctx.path);
  

});

app.listen(3000, () => {
  console.log('start success');
});