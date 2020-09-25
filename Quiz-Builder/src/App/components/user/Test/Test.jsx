import React, { Component } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import '../../../assets/styles/test.css'
import { FetchTest, SubmitTest } from './TestUtil';

function SubmitModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Body>
                <center><h3>Test Score: {props.score}/{props.total}</h3></center>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide} href="/user/submitted">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

class Test extends Component {
    cardBodyArray = []
    time = 0
    state = {
        testKey: "",
        testTimeMins: "",
        testTimeSecs: "",
        testTitle: "",
        cardBody: this.cardBodyArray,
        SubmitModalShow: false,
        score: 0,
        total: 0
    }

    handleInput = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            [name]: val
        })
    }

    showData = () => {
        this.setState({
            cardBody: this.cardBodyArray
        })
    }

    componentDidMount() {
        FetchTest(this.cardBodyArray, this.state, this.showData, this.submitTest, this.timer)
    }

    submitTest = () => {
        SubmitTest(this.state)
        this.setState({ SubmitModalShow: true })
    }

    timer = (time) => {
        let timeInMinutes = time;
        let timeInSeconds = (time*60)%60;
        const timerInterval = setInterval(() => {
            this.setState({
                testTimeMins: timeInMinutes,
                testTimeSecs: timeInSeconds
            })
            if (timeInMinutes === 0 && timeInSeconds === 0) {
                clearInterval(timerInterval);
                this.submitTest()
            }
            else if (timeInSeconds === 0) {
                timeInMinutes--;
                timeInSeconds = 60;
            }
            timeInSeconds--;
        }, 1000);
    }

    render() {
        return (
            <div className="test-body">
                <div className="test-content">
                    <Card className='test-card-style mx-auto'>
                        <Card.Body>
                            <span className="test-name-style">{this.state.testTitle}</span> 
                            <span className="test-timer-style">Time Left: {this.state.testTimeMins} Mins {this.state.testTimeSecs} Secs</span>
                            <hr />
                            <div className='form-group'>
                                {this.state.cardBody}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <SubmitModal
                    show={this.state.SubmitModalShow}
                    score={this.state.score}
                    total={this.state.total}
                    onHide={() => { this.setState({ SubmitModalShow: false }) }}
                />
            </div>
        );
    }
}

export default Test;