import app from './app.js'

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('ERROR:', err.message);
  }
  console.log('LISTENING on port 3000');
});