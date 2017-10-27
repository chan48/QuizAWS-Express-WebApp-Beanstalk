const express = require('express');

const 
port = process.env.PORT || 3000,
app = express(),
path = require('path');
app.locals.pretty = true ;
app.listen(port);

// const publicDir = path.join(__dirname,'public');
// app.use(express.static(publicDir));



app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
  res.render('hi', {time:Date(), title:'Welcom to QuizAWS'});
});

app.get('/quiz-test', function(req, res){
  res.render('hi');
});