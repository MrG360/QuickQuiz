var express = require("express");
var router = express.Router();
var {result, user, question, test} = require('./database/model.js');
var nodemailer = require('nodemailer');

router.get("/", (req, res) => {
    res.end("Quiz Builder API!")
})

router.post("/loginUser", (req, res) => {
    user.find({
        Email: req.body.Email,
        Password: req.body.Password
    })
        .then((data) => {
            if (data.length) {
                res.end(JSON.stringify(data[0]));
            }
            else
                res.end("false");
        })
        .catch((err) => {
            console.log("Error While logging in User: ", err);
            res.end("false");
        });
});

router.post("/registerUser", (req, res) => {
    user.create({
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Type: req.body.Type,
        Branch: req.body.Branch
    })
        .then((data) => {
            res.end(JSON.stringify({
                status: true
            }));
        })
        .catch((err) => {
            if(err.code === 11000)
                console.log("Error while registering user: need unique email");
            else 
                console.log("Error while registering user: ", err);
            res.end(JSON.stringify({
                status: false,
                errCode: err.code
            }));
        })
});

router.post("/addQuestion", (req, res) => {
    question.create({
        Question: req.body.Question,
        CorrectAnswerNo: req.body.CorrectAnswerNo,
        Options: req.body.Options,
        Branch: req.body.Branch
    })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error While adding Question: ", err);
            res.end("[]");
        })
});

router.get("/getQuestions", (req, res) => {
    question.find({})
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error in /getQuestions: ", err);
            res.end("[]");
        });
});

router.post("/getQuestionsByBranch", (req, res) => {
    question.find({Branch: req.body.Branch})
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error in /getQuestionsByBranch: ", err);
            res.end("[]");
        });
});

router.post("/deleteQuestion", (req, res) => {
    question.deleteOne({ _id: req.body.id })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error in /deleteQuestion: ", err);
            res.end("[]");
        });
});

router.post("/createTest", (req, res) => {
    test.create({
        Title: req.body.Title,
        Id: req.body.Id,
        Questions: req.body.Questions,
        Time: req.body.Time,
        Branch: req.body.Branch
    })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error in /createTest: ", err);
            res.end("[]");
        })
});

router.get("/getAllTests", (req, res) => {
    test.find({})
        .then((data) => {
            res.send(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Consoling Error : " + err);
            res.end("[]");
        })
})

router.post("/getTestsByBranch", (req, res) => {
    test.find({Branch: req.body.Branch})
        .then((data) => {
            res.send(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Consoling Error : " + err);
            res.end("[]");
        })
})

router.post("/getTestsByUser", (req, res) => {
    let availableTest = [];
    test.find({ Branch: req.body.Branch })
        .then((testdata) => {
            result.find({ "User.UserEmail": req.body.UserEmail })
                .then((resultdata) => {
                    for(let i = 0, flag = 1; i<testdata.length; i++, flag=1) {
                        for(let j=0; j<resultdata.length; j++) {
                            if (testdata[i].id == resultdata[j].Test)
                                 flag = 0;
                        }
                        if(flag)
                            availableTest.push(testdata[i])
                    }
                    res.end(JSON.stringify(
                        availableTest
                    ))
                })
                .catch((err) => {
                    console.log("Consoling Error : " + err);
                    res.end("[]");
                })
        })
        .catch((err) => {
            console.log("Consoling Error : " + err);
            res.end("[]");
        })
})

router.post("/getTestByKey", (req, res) => {
    test.find({
        Id: req.body.Key
    })
        .then((data) => {
            res.send(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error : " + err);
            res.end("[]");
        })
})

router.post("/getTest", (req, res) => {
    test.find({
        _id: req.body.Id
    })
        .then((data) => {
            res.send(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error : " + err);
            res.end("[]");
        })
})

router.post("/deleteTest", (req, res) => {
    test.deleteOne({ Id: req.body.Id })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            console.log("Error in /deleteTest: ", err);
            res.end("[]");
        });
});

router.post('/postResult', (req, res) => {
    result.create({
        Test: req.body.TestId,
        Score: req.body.Score,
        Total: req.body.Total,
        User: {
            UserName: req.body.User.UserName,
            UserEmail: req.body.User.UserEmail
        }
    }).then(() => {
        res.end("[]");
    }).catch(() => {
        res.end("[]");
    })
})

router.post('/getResult', (req, res) => {
    result.find({ Test: req.body.TestId })
        .then((data) => {
            res.send(JSON.stringify(data));
        }).catch((err) => {
            console.log(err);
            res.end("[]");
        })
})

router.post('/getResultByUser', (req, res) => {
    result.find({ "User.UserEmail": req.body.UserEmail })
        .populate('Test')
        .then((data) => {
            res.send(JSON.stringify(data));
        }).catch((err) => {
            console.log(err);
            res.end("[]");
        })
})

router.post('/sendMail', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: "Yandex",
        auth: {
            user: "quizb",
            pass: "rZgqKbSK$RfV5CA"
        }
    });

    const mailOptions = {
        from: 'quizb@yandex.com',
        to: `${req.body.userEmail}`,
        subject: 'Test Result',
        text: `${req.body.testTitle} Result.
        Your Marks: ${req.body.score}
        Total Marks: ${req.body.total}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to ' + req.body.userEmail + ' : ' + info.response);
        }
        res.end("[]");
    });
})

module.exports = router;