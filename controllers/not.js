const Not = require("../models/not");


exports.getNots = (req, res, next) => {
  Not.find()
    .then((nots) => {
      res.render("index", {
        sayfaBasligi: "Duyuru Listesi",
        nots: nots,
        yol: "/"
      
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNot = (req, res, next) => {
  const notId = req.params.notId;
 
  Not.findById(notId)
    .then((not) => {
      res.render("not-detay", {
        sayfaBasligi: "Duyuru Bilgisi",
        not: not,
        yol: "/"
       
      });
    })
    .catch((err) => {});
};

exports.getNotEkle = (req, res, next) => {
  res.render("not-ekle", {
    sayfaBasligi: "",
    baslikGoster: 2,
    yol: "/not-ekle"
  
  });
};


exports.postNotEkle = (req, res, next) => {
  const name = req.body.name;
  const context = req.body.context;
  const startDate = req.body.startDate;
  const finishDate = req.body.finishDate;
  const category = req.body.category;
  const priority = req.body.priority;

  const not = new Not({
    name : name,
    context : context,
    startDate : startDate,
    finishDate : finishDate,
    category : category,
    priority : priority,
  });
  not
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.postSilId = (req, res, next) => {
  const notId = req.body.notId;
  Not.findByIdAndRemove(notId)
    .then((result) => {
      console.log("Ürün Silindi");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};