require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let db = [
  'https://www.google.com/'
  ];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const inputUrl = req.body.url;
  if(isValidHttpUrl(inputUrl)){
    
  console.log(inputUrl);
  if(db.includes(inputUrl)){
      res.json({ original_url:inputUrl,short_url: db.indexOf(inputUrl) });
    } else {
      db.push(inputUrl);
      res.json({original_url:inputUrl, short_url: db.indexOf(inputUrl) });
    }
  } else {
    res.json({error:'invalid url'});
  }
});

app.get('/api/shorturl/:shortedUrlIndex', (req, res) => {
  const url = Number(req.params.shortedUrlIndex);
  res.redirect(db[url]);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL (string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
