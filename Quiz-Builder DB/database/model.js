const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const question = mongoose.model("Question", new Schema({
    Question: String,
    Options: [],
    CorrectAnswerNo: Number,
    Branch: String
}), "Question");

const user = mongoose.model("Users", new Schema({
    Name: String,
    Password: String,
    Email: { type: String, unique: true },
    Type: String,
    Branch: String
}), "Users");

const test = mongoose.model("Tests", new Schema({
    Title: String,
    Id: String,
    Questions: [{}],
    Time: Number,
    Branch: String
}), "Tests");

const result = mongoose.model("Results", new Schema({
    Score: String,
    CreatedAt: { type: Date, default: Date.now },
    Total: String,
    Test: { type: Schema.Types.ObjectId, ref: 'Tests' },
    User: {
        UserName: String,
        UserEmail: String
    }
}), "Results");

exports.result = result;
exports.user = user;
exports.question = question;
exports.test = test;