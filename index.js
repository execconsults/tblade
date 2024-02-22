const express = require('express')
const app = express()
const methodOveride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const ExpressError = require('./views/utilities/ExpressError')
const tailwind = require('tailwindcss')
const fs = require("fs");


// const homeRoute = require('./routes/homeRoutes')

const sessionConfig = {
    secret :'thisshouldbebetter',
    resave:false,
    saveUninitialized:true,
    cookie:{
    httpOnly:true,
    expires: Date.now() + 100 * 60 * 60 * 24 * 7,
    maxAge: 200 * 60 * 60 * 24 * 7
    }
 }


 dbUrl = 'mongodb+srv://bdi:dqrJ6h81tQh2OjLt@cluster0.5lauo.mongodb.net/site'
 mongoose.connect(dbUrl, 
 {useNewUrlParser: true,
 useUnifiedTopology: true})
 
 .then(()=>{
    console.log('open')
 })
 .catch(err =>{
    console.log("Oh no")
    console.log(err)
 });
 
app.set('views engine','ejs')
app.set('views', path.join(__dirname, 'views')); 
app.engine('ejs',ejsMate)
 
app.use(methodOveride('_method'))
app.use(express.static('layouts'))
app.use(express.static('js'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session(sessionConfig))
app.use(flash())

// app.use('/',homeRoute)

 app.use((req, res, next) => {   
    const routes =  req.route
    res.locals.currentUser = req.session.user
    console.log(req.session)
    next();
 })
 
 app.get('/atom.xml', async (req, res) => {
   try {
     const baseUrl = 'https://uniquweb.com'; // Update with your website's base URL
     const currentDate = new Date().toISOString();
 
     // Generate the sitemap XML dynamically
     let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
     sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
 
     // Add URLs dynamically from your website
     sitemap += `<url>
       <loc>${baseUrl}/</loc>
       <lastmod>${currentDate}</lastmod>
       <priority>1.0</priority>
     </url>\n`;
    

     sitemap += '</urlset>';
 
     // Save the generated sitemap XML to a file
     const filePath = path.join(__dirname, '/', 'sitemap.xml');
     fs.writeFileSync(filePath, sitemap, 'utf8');
 
     // Set the content type header and send the file as the response
     res.header('Content-Type', 'application/xml');
     res.sendFile(filePath);
   } catch (error) {
     console.log('Error generating sitemap:', error);
     res.status(500).send(`Internal Server Error ${error}` );
   }
 });

 app.get('/',(req,res)=>{
    res.render('view/index.ejs')
 })

// 404 page not found route
app.all('*', (req,res,next)=>{
   next(new ExpressError('Page Not Found', 404))
})
// error hadling 
 app.use((err, req, res, next) =>{
   const { statusCode = 500 } = err;
   if (!err.message) err.message = 'Oh No, Something Went Wrong!'
   res.status(statusCode).render('error.ejs', { err })
})
//server
app.listen(3001, () => {
    console.log('Serving on port 3000')
})