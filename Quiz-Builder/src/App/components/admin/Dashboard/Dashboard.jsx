import React, { Component } from 'react';
import '../../../assets/styles/dashboard.css';
import { Card, Button } from 'react-bootstrap';
import addQuestionImage from '../../../assets/images/addQuestion.png';
import viewQuestionsImage from '../../../assets/images/viewQuestions.png';
import createTestImage from '../../../assets/images/createTest.png';
import viewTestsImage from '../../../assets/images/viewTests.png';
import AddQuestion from '../components/AddQuestion/AddQuestion';

class DashBoard extends Component {
    state = {
        addQuestionModalShow: false
    }
    render() {
        return (
            <div className="dashboard-content">
                <Card className="card-style">
                    <img alt="add Question" className="add-Question" src={addQuestionImage} />
                    <Card.Body>
                        <center><Button className="add-Question-Button" variant="success" onClick={() => this.setState({ addQuestionModalShow: true })}>Add Question</Button></center>
                    </Card.Body>
                </Card>
                <Card className="card-style">
                    <img alt="view Questions" className="view-Questions" src={viewQuestionsImage} />
                    <Card.Body>
                        <center><Button className="view-Questions-Button" variant="success" href="/admin/viewQuestions">View Questions</Button></center>
                    </Card.Body>
                </Card>
                <Card className="card-style">
                    <img alt="create Test" className="create-Test" src={createTestImage} />
                    <Card.Body>
                        <center><Button className="create-Test-Button" variant="success" href="/admin/createTest">Create Test</Button></center>
                    </Card.Body>
                </Card>
                <Card className="card-style">
                    <img alt="view Tests" className="view-Tests" src={viewTestsImage} />
                    <Card.Body>
                        <center><Button className="view-Tests-Button" variant="success" href="/admin/viewTests">View Tests</Button></center>
                    </Card.Body>
                </Card>
                <AddQuestion
                    addQuestionModalState={this.state.addQuestionModalShow}
                    hideAddQuestionModal={() => this.setState({ addQuestionModalShow: false })}
                />
            </div>
        );
    }
}

export default DashBoard;