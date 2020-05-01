const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express(); //Runs the Server

app.set('view engine','ejs'); //Template Engine - View
app.set('views',path.join(__dirname, 'views')); //Dynammic Path Directory

//Middlewares

app.use(express.urlencoded()); // Parsing Values
app.use(express.static('assets'));

var contactList = [    // Creating Object 
    {
        name: "Abhishek",
        number: '7017841375'
    },

    {   name: "Tony Stark",
        number: '1234876543'
    },

    {
        name: "Coding Ninjas",
        number: '2324354332'
    }
]

//Controllers

app.get('/',function(req,res){  
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching Contacts');
            return;
        }

        return res.render('home',{
            title: 'Contacts List',
            contact_list: contacts
        });

    });

    
});

app.get('/practice',function(req,res){

    return res.render('practice',{
        title: 'Let us play with ejs'
    });
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     number: req.body.number 
    // });
    // return res.redirect('/');

    Contact.create({
        name: req.body.name,
        number: req.body.number
    }, function(err,newContact){
        if(err){
            console.log('Error in Creating Contact!');
            return;
        }

        console.log('********',newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in Deleting the Contact');
            return;
        }
        return res.redirect('back');
    });
    
});

app.listen(port,function(err){
   

    console.log('Yup!My Express Surver is running on port:',port);
});


//C:\Program Files\MongoDB\Server\4.2\data\ Data Directory