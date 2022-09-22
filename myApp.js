// -- http://localhost:3000/ -- //

require('dotenv').config();

// -- #1. Install and Set Up Mongoose -- //
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://daniel_d:758071@cluster0.4xh9vvt.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });


// -- #2. Create a Model -- //
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String]
}); 
const Person = mongoose.model("Person", personSchema);


// -- #3. Create and Save a Record of a Model -- //
const createAndSavePerson = (done) => {
  const daniel_d = new Person({name: "Daniel D", age: 25, favoriteFoods: ["rice", "Bun Bo Hue"]});

  daniel_d.save((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};


// -- #4. Create Many Records with model.create() -- //
let arrayOfPeople = [
  {name: "Henry", age: 18, favoriteFoods: ["TacoBell", "Korean BBQ"]},
  {name: "Tuan", age: 65, favoriteFoods: ["TacoBell", "Pho"]},
  {name: "Hoa", age: 49, favoriteFoods: ["Bun Rieu", "Fish"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};


// -- #5. Use model.find() to Search Your Database -- //
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) console.error(err);
    done(null, personFound);
  });
};


// -- #6. Use model.findOne() to Return a Single Matching Document from Your Database -- //
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) console.error(err);
    done(null, foodFound);
  });
};


// -- #7. Use model.findById() to Search Your Database By _id -- //
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, foundId) => {
    if (err) return console.error(err);
    done(null, foundId);
  });
};


// -- #8. Perform Classic Updates by Running Find, Edit, then Save -- //
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  // .findById() method to find a person by _id 
  Person.findById({_id: personId}, (err, foundPerson) => {
    if (err) return console.error(err);  
    
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    foundPerson.favoriteFoods.push(foodToAdd);

    // save() the updated Person
    foundPerson.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};


// -- #9. Perform New Updates on a Document Using model.findOneAndUpdate() -- //
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
  });
};


// -- #10. Delete One Document Using model.findByIdAndRemove() -- //
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
  });
};


// -- #11. Delete Many Documents with model.remove() -- //
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, removedField) => {
    if (err) return console.error(err);
    done(null, removedField);
  });
};


// -- 
const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
