const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
  console.log('get data')
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  console.log('New Task:', newTask);
  res.json(newTask);
});

app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  tasks.splice(index, 1);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
