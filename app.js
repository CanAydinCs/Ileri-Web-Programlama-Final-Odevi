const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const session=require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);

const MONGODB_URI="mongodb+srv://Can:1234@cluster0.ronmjgb.mongodb.net/";

const mongoose = require("mongoose");

const app = express();

//resimlerin ve görüntülerin beslenebilmesi için gerekli
app.use('/images', express.static('MAINHTML/images'));
app.use('/css', express.static('MAINHTML/css'));
app.use('/js', express.static('MAINHTML/js'));

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
  });

app.set("view engine", "ejs");
app.set("views", "views");

const hataController = require("./controllers/hata");

const yoneticiVerisi = require("./routes/yonetici");
const publicRoutes = require("./routes/public");
const yetkiRoutes = require("./routes/yetki"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use(session({secret:'gizli sifrem', resave:false, saveUnitialized:false, store:store}));


app.use((req,res,next) => {
  res.locals.yonetici=req.session.oturum_acildi;
  next();
})

app.use(yoneticiVerisi.routes);
app.use(publicRoutes);
app.use(yetkiRoutes);

app.use(hataController.getHata404);


mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });