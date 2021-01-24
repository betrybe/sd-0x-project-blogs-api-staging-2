const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const authController = require('./controllers/authController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use('/post', postController);
app.use('/login', authController);
