const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
