import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Gallery, SimpleCell, Avatar } from '@vkontakte/vkui';

import Zoom from 'react-reveal/Zoom';
import QuestionCard from '../panels/elemenst/QuestionCard';

class Game extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      slideIndex: 1,
      currentAnswer: null,
      currentQuestion: 1,
    }   
  }

  next() {

    this.setState(
      { slideIndex: 1 }
    )

  }

  drag(e){
    if (e.shiftXAbs > 100){
      this.setState({currentAnswer: e.shiftX > 0 ? 'Право': 'Лево', slideIndex: this.state.slideIndex + 3})
      console.log(this.state.currentAnswer)
      this.setState(
        { currentQuestion: this.state.currentQuestion + 1 }
      )
      console.log(this.state.currentQuestion)
    }
  }

  render () {
    let { id } = this.props;

    return (
        <Panel id={id}>
          <PanelHeader>modeName</PanelHeader>
          <div style={{marginTop: "1vh", paddingLeft: "1vw", paddingRight: "1vw"}}>
            <SimpleCell before={<Avatar size={40} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1280px-Flag_of_Russia.svg.png"} />}>Россия</SimpleCell>
          </div>
          <Gallery
            slideWidth="100%"
            align="center"
            style={{ height: "80vh" }}
            onDragEnd={this.drag.bind(this)}
            slideIndex={this.state.slideIndex}
          >
            <div />
            <div>
              <div>
              {
                this.state.currentQuestion === 1 &&
                <Zoom>
                  <QuestionCard />
                </Zoom>
              }
              {
                this.state.currentQuestion === 2 &&
                <Zoom>
                  <QuestionCard />
                </Zoom> 
              }
              {
                this.state.currentQuestion === 3 &&
                <Zoom>
                  <QuestionCard />
                </Zoom> 
              }
              </div>
            </div>
            <div />
          </Gallery>
        </Panel>
    )
  }
}

Game.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Game;
