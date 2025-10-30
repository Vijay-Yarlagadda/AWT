const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.render('form', { result: '' }));

app.post('/submit', (req, res) => {
  const { rno } = req.body;
  const result = [1, 2, 3].includes(Number(rno)) ? 'PASS' : 'FAIL';
  res.render('form', { result });
});

app.get('/about', (req, res) => res.render('about'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
