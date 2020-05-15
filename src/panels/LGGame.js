import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Gallery } from '@vkontakte/vkui';

import Zoom from 'react-reveal/Zoom';
import LGQuestionCard from './elemenst/LGQuestionCard';
import Timer from './elemenst/timer/timer'

class LGGame extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      slideIndex: 1,
      currentAnswer: null,
      currentQuestion: 0,
      sessionAnswers: [],
      questions: [],
      rightAnswers: []
    }   
  }

  drag(e) {
    if (e.shiftXAbs > 100){
      let answer = e.shiftX > 0 ? 'Greater': 'Lower'
      let answers = this.state.sessionAnswers
      answers.push(answer)
      this.setState({
        currentAnswer: answer,
        slideIndex: this.state.slideIndex + 3,
        currentQuestion: this.state.currentQuestion + 1,
        sessionAnswers: answers})
    }
  }

  cardButton(side){
    let answer = null
    let answers = this.state.sessionAnswers
    if (side === 'l' || side === 'L' || side === 'left'){
      answer = 'Lower'
    } else {
      answer = 'Greater'
    }
    this.setState({
      currentAnswer: answer,
      slideIndex: this.state.slideIndex + 3,
      currentQuestion: this.state.currentQuestion + 1,
      sessionAnswers: answers})
  }

  verifyAnswers(answers, right) {
    let verify = [];
    for (let i = 0; i < answers.length; i++){
      if (answers[i] === right[i]){
        verify.push(1)
      } else {
        verify.push(0)
      }
    }
    return verify;
  }

  generateQuestionsAnswers(rawQuestions){
    for (let i = 0; i < rawQuestions.length; i++){
      let rawQ = rawQuestions[i]
      let question = {
        firstPart: rawQ['firstPart'],
        number: parseFloat(rawQ['variables'][Math.floor(Math.random() * rawQ['variables'].length)]),
        units: rawQ['units'],
        target: rawQ['number'],
        country: rawQ['country'],
        flag: rawQ['flag']
      }
      this.state.questions.push(question)
      this.state.rightAnswers.push(question.number > question.target ? "Lower": "Greater")
    }
  }

  render () {
    let { id, endLGGame, questions } = this.props;
    
    if (this.state.questions.length === 0){
      this.generateQuestionsAnswers(questions)
    }

    if (this.state.currentQuestion === questions.length) {
      endLGGame(this.verifyAnswers(this.state.sessionAnswers, this.state.rightAnswers));
      this.setState({currentQuestion: null})
    }

    return (
        <Panel id={id}>
          <PanelHeader>Больше - меньше</PanelHeader>
            <div style={{textAlign: "center", marginTop: "5%", fontSize: '2vh'}}>
              <Timer />
            </div>
            <Gallery
              slideWidth="90%"
              align="center"
              style={{ height: "85vh" }}
              onDragEnd={this.drag.bind(this)}
              slideIndex={this.state.slideIndex}
            >
              <div />
              <div>
                <div>
                {
                  this.state.questions.map((question, index, array) => {
                    return(
                      <div key={index}>
                        {
                        this.state.currentQuestion === index &&
                        <Zoom>
                          <LGQuestionCard
                            cardnumber={index}
                            total={array.length}
                            firstPart={question.firstPart}
                            number={question.number}
                            unit={question.units}
                            flag={question.flag}
                            country={question.country}
                            cardButton={this.cardButton.bind(this)}
                            />
                        </Zoom>
                        }
                      </div>
                    )
                })
                }
                </div>
              </div>
              <div />
            </Gallery>
        </Panel>
    )
  }
}

LGGame.propTypes = {
    id: PropTypes.string.isRequired,
};

export default LGGame;
