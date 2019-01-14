
/*
 /api/NGOdata Routes
 */


const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const NGOdata = require('../models/NGOdata');


// Getting all NGOdatas
router.get('/', (req, res) => {
  NGOdata.find() 
   
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err)
    })
});



/* search using json in body like  
        {
        "find":{"org_name_eng":"husam org","chief_email":"email@mail.com"},
        "sort":{"org_name_arb":"1"},
        "limit":10
        }
  */
router.get('/find', (req, res) => {

  NGOdata.find(req.body.find).sort(req.body.sort).limit(req.body.limit)
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err)
    })
  //console.log(req.body.find);
});

// Getting information
router.get('/:id', (req, res) => {
  NGOdata.findById(req.params.id).then(result => {
    if (!result) {
      res.status(404).send('There is no such NGO Documente');
    }
    res.send(result);
  }).catch(err => {
    res.status(400).send(err.message)
  });
});





// Adding a new NGOdata
router.post('/new', (req, res) => {

  // validate document body
  const vld_doc = Validating_doc(req.body);

  // validate all employees in the document 
  const vld_emp_err = Validating_emp(req.body.employees);

  if (vld_doc.error) {
    res.status(400).send(vld_doc.error);
  } else if (vld_emp_err){
    res.status(400).send(vld_emp_err);
  } else {

    const NGO_doc = new NGOdata({
      _id: new mongoose.Types.ObjectId(),
      address_city: req.body.address_city,
      address_st: req.body.address_st,
      address_state: req.body.address_state,
      chief_address: req.body.chief_address,
      chief_email: req.body.chief_email,
      chief_nationality: req.body.chief_nationality,
      chief_phone: req.body.chief_phone,
      competence: req.body.competence,
      date: req.body.date,
      doc1: req.body.doc1,
      doc2: req.body.doc2,
      doc3: req.body.doc3,
      doc4: req.body.doc4 ,
      doc5: req.body.doc5 ,
      m_address_city: req.body.m_address_city ,
      m_address_country: req.body.m_address_country ,
      m_address_st: req.body.m_address_st ,
      m_org_email: req.body.m_org_email ,
      m_org_nationality: req.body.m_org_nationality ,
      m_org_phone: req.body.m_org_phone ,
      m_org_president: req.body.m_org_president ,
      org_chief_name: req.body.org_chief_name ,
      org_name_arb: req.body.org_name_arb ,
      org_name_eng: req.body.org_name_eng,
      employees: req.body.employees
    });
 
    NGO_doc.save()
      .then(result => {
        res.send('You have added a new NGO doc');
        //console.log(result);
      }).catch(err => {
        res.status(401).send(err);
        //console.log(err);
      });
  }
});


// PUT
router.put('/:id', (req, res) => {
  // validate document body
  const vld_doc = Validating_doc(req.body);
  
  // validate all employees in the document 
  const vld_emp_err = Validating_emp(req.body.employees);

  if (vld_doc.error) {
    res.status(400).send(vld_doc.error);

  } else if (vld_emp_err){
    res.status(400).send(vld_emp_err);
  } else {

    NGOdata.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(result => {
        res.send(`Number of updated NGO documents is ${result.n}`);
      }).catch(err => {
        res.status(400).send(err);
      });
  }
});


// Deleting a NGOdata
router.delete('/:id', (req, res) => {
  NGOdata.remove({_id: req.params.id }).then(result => {
    res.send(`Number of deleted NGO documents is ${result.n}`)
  }).catch(err => {
    res.status(400).send(err);
  });
});



  // validate document body
 function Validating_doc(data) {

  const NGOSchema = {
    "address_city": Joi.number(),
    "address_st": Joi.string().min(5),
    "address_state": Joi.number(),
    "chief_address": Joi.string().min(5),
    "chief_email": Joi.string().email({ minDomainAtoms: 2 }),
    "chief_nationality": Joi.string().min(3).required(),
    "chief_phone": Joi.string(),
    "competence": Joi.string().required(),
    "date": Joi.date(),
    "doc1": Joi.string(),
    "doc2": Joi.string(),
    "doc3": Joi.string(),
    "doc4": Joi.string(),
    "doc5": Joi.string(),
    "m_address_city": Joi.number(),
    "m_address_country": Joi.number(),
    "m_address_st": Joi.string().min(5),
    "m_org_email": Joi.string().email({ minDomainAtoms: 2 }),
    "m_org_nationality": Joi.string().min(3).required(),
    "m_org_phone": Joi.string(),
    "m_org_president": Joi.string().min(3).required(),
    "org_chief_name": Joi.string().min(3).required(),
    "org_name_arb": Joi.string().min(3).required(),
    "org_name_eng": Joi.string().min(3).required(),
    "employees": Joi.array()
  };

  return Joi.validate(data, NGOSchema) ;
}



  // validate all employees in the document 

function Validating_emp(data) {

  const empSchema = {
    "emp_email":Joi.string().email({ minDomainAtoms: 2 }),
    "emp_name": Joi.string().min(5).required(),
    "emp_nationality": Joi.string().min(3).required(),
    "emp_phone": Joi.string()
  }

 //  validation for  each employee in NGO document
  const vld_list = []
  data.forEach(element => {
    vld= Joi.validate(element, empSchema)
    if(vld.error){
      vld_list.push(vld.error)
    }
  });

  if (vld_list.length == 0){return false;}
  return  vld_list;
}



//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
