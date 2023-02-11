import app from './app';
const main = () => {
  app.listen(app.get("port"));

  console.log(`Se esta escuchando en el Puerto ${app.get("port")}`);
};
main();
