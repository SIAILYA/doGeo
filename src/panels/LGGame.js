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
      sessionAnswers: []
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
    answers.push(answer)
    this.setState({
      currentAnswer: answer,
      slideIndex: this.state.slideIndex + 3,
      currentQuestion: this.state.currentQuestion + 1,
      sessionAnswers: answers})
  }

  render () {
    let { id, questions, sendResult } = this.props;
    
    if (this.state.currentQuestion === questions.length) {
      sendResult(this.state.sessionAnswers)
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
