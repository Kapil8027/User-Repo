var express = require('express');
var router = express.Router();
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.get('/',(req,res)=>{
  res.send('CORS-enabled API');
});
// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
