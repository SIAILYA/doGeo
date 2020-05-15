import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Gallery, SimpleCell, Avatar } from '@vkontakte/vkui';

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
    }   
  }

  next() {
    this.setState(
      { slideIndex: 1 }
    )
  }

  drag(e) {
    if (e.shiftXAbs > 100){
      let answer = e.shiftX > 0 ? 'Greater': 'Lower'
      let answers = this.state.sessionAnswers
      console.log(answers)
      answers.push(answer)
      this.setState({
        currentAnswer: answer,
        slideIndex: this.state.slideIndex + 3,
        currentQuestion: this.state.currentQuestion + 1,
        sessionAnswers: answers})
      console.log(this.state.sessionAnswers)
    }
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

  render () {
    let { id, endLGGame } = this.props;
    let questions = [
      {
        id: 1,
        firstPart: "ВВП России на 2019 год составляет",
        number: 200,
        unit: "трлн. руб."
      },
      {
        id: 2,
        firstPart: "В состав Российской Федерации входит",
        number: 38,
        unit: "субъектов"
      }
    ]
    let rightAnswers = ["Lower", "Greater"]

    if (this.state.currentQuestion === questions.length) {
      endLGGame(this.verifyAnswers(this.state.sessionAnswers, rightAnswers));
      this.setState({currentQuestion: null})
    }

    return (
        <Panel id={id}>
          <PanelHeader>Больше - меньше</PanelHeader>
          <div style={{marginTop: "2vh", paddingLeft: "5%", paddingRight: "5%"}}>
            <SimpleCell disabled after={<Timer />} before={<Avatar size={40} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png"} />}>Россия</SimpleCell>
          </div>
            <Gallery
              slideWidth="90%"
              align="center"
              style={{ height: "80vh" }}
              onDragEnd={this.drag.bind(this)}
              slideIndex={this.state.slideIndex}
            >
              <div />
              <div>
                <div>
                {
                  questions.map((question, index, array) => {
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
                            unit={question.unit}
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
