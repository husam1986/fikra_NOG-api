

const mongoose = require('mongoose');

// schema of each employee in document
const empSchema = new mongoose.Schema({
  emp_email:String,
  emp_name: String,
  emp_nationality: String,
  emp_phone: String
})


// schema of NGO  document body

const docSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address_city: Number,
  address_st: String,
  address_state: Number,
  chief_address: String,
  chief_email: String,
  chief_nationality: String,
  chief_phone: String,
  competence: String,
  date: Date,
  doc1: String,
  doc2: String,
  doc3: String,
  doc4: String,
  doc5: String,
  m_address_city: Number,
  m_address_country: Number,
  m_address_st: String,
  m_org_email: String,
  m_org_nationality: String,
  m_org_phone: String,
  m_org_president: String,
  org_chief_name: String,
  org_name_arb: String,
  org_name_eng: String,
  employees: [empSchema]
  
});

module.exports = mongoose.model('NGOdata', docSchema);
