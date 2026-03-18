const mongoose = require("mongoose");

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log(
    "Invalid arguments! Usage: node mongo.js <password> <name> <number>",
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);
const urlProps =
  "phoneBook?ssl=true&replicaSet=atlas-fv1fuz-shard-0&authSource=admin&appName=FSO-Cluster0";

/*NOTE: I was having trouble with DNS SRV resolution on my network and found no quick fix, so I switched to
the no SRV string format. It looks messier but the connection works and it still lets me set params.*/
const url = `mongodb://Haku:${password}@ac-zy87dqt-shard-00-00.4bg9lnf.mongodb.net:27017,ac-zy87dqt-shard-00-01.4bg9lnf.mongodb.net:27017,ac-zy87dqt-shard-00-02.4bg9lnf.mongodb.net:27017/${urlProps}`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(
      "Added '" +
        result.name +
        "' Number: '" +
        result.number +
        "' to phonebook",
    );
    mongoose.connection.close();
  });
} else {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
}
