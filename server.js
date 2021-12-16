const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(session({ secret: 'ssshhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));


var sesss;
router.get('/', (req, res) => {
    
    if (sesss.email) {
        return res.redirect('/admin');
    }
    res.sendFile('index.html');
    
});

router.post('/login', (req, res) => {
    sesss = req.session;
    sesss.email = req.body.email;
    res.end('done');
});

router.get('/admin',(req, res) =>{
    sesss = req.session;

    if(sesss.email){
        res.write(`<h2>Hello ${sesss.email} </h2><br>`);
        res.end('>logout');
    }
    else{
        res.write('Please login first');
        res.end('>login');
    }

});

router.get('/logout',(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/')
    })
});

app.use('/',router);

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app started on port ${process.env.PORT || 3000}`);
})