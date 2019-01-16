# Fikra camps project:   NGO document 
## API documentation 
#### Husam Imad 14/1/2019

mongoDB is used , each document contain the fields of a None Goverment Orginzation document , each document 
contain the "employees" field which it an array of json consist of the fields of each employee in this orginization 

heroko like:   (https://tranquil-cliffs-80823.herokuapp.com)

## the commends 
```
// Getting all NGO documents
1-	 get       /api/ngo/ 



2-	get     /api/ngo/find 

/* search (find) using json in body like  
        {
        "find":{"org_name_eng":"husam org","chief_email":"email@mail.com"},
        "sort":{"org_name_arb":"1"},
        "limit":10
        }
  */
 	// NGOdata.find(req.body.find).sort(req.body.sort).limit(req.body.limit)
    
    
    

// Getting information  by doc  id
3-	get      /api/ngo/:id



// Adding a new NGO document 
4-	post        /api/ngo/new


// update doc by id    sending  json in body 
5-	put      /api/ngo/:id
//    NGOdata.updateOne({ _id: req.params.id }, { $set: req.body })


// Deleting a NGO doc   by id
6-	delete   /api/ngo/:id'
```

##  json for testing 

```
{
    "address_city": 4,			// رقم الإنديكس للست المدن المفترض وجوده في دروب داون لست
    "address_st": "عنوان الشارع",
    "address_state": 5,		// رقم الإنديكس للست المحافظات المفترض وجوده في دروب داون لست
    "chief_address": "عنوان رئيس المنظمة",
    "chief_email": "egg@mail.com",
    "chief_nationality": "جنسية الرئيس ",
    "chief_phone": "هاتف الرئيس",
    "competence": "اختصاص المنظمة",
    "date": "2019-01-02T21:00:00.000Z",
    "doc1": " مسار وثيقة مصدقة",
    "doc2": " مسار جواز",
    "doc3": " مسار بيان",
    "doc4": "النظام الداخلي مسار ",
    "doc5": "تقرير النشاطات مسار ",
    "m_address_city": 5,   
    "m_address_country": 61,
    "m_address_st": "عنوان المنظمة الام/شارع",
    "m_org_email": "egg@mail.com",
    "m_org_nationality": "جنسية المنظمة الام",
    "m_org_phone": "هاتف المنظمة الام",
    "m_org_president": "اسم رئيس المنظمة الام",
    "org_chief_name": "اسم رئيس فرع المنظمة",
    "org_name_arb": "اسم المنظمة عربي",
    "org_name_eng": "org name",
    "employees": [
        {
            "emp_email": "eg@mail.com",
            "emp_name": "اسم المنتسب",
            "emp_nationality": "جنسية المنتسب",
            "emp_phone": "هاتف المنتسب"
        },
        {
            "emp_email": "egg@mail.com",
            "emp_name": "2اسم المنتسب",
            "emp_nationality": "737",
            "emp_phone": "2هاتف المنتسب"
        }]
    
}

```

## validation of  document  and employees
```
   // validation of  document 
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
   
 //  emplyoess
    "emp_email" : Joi.string().email({ minDomainAtoms: 2 }),
    "emp_name":  Joi.string().min(5).required(),
    "emp_nationality":  Joi.string().min(3).required(),
    "emp_phone":  Joi.string()
```


### Husam Imad 14-1-2019
