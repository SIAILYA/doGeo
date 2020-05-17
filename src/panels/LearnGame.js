import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import { Panel, Button, Div, Gallery, Group } from '@vkontakte/vkui';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';

import LearnCard from './elemenst/LearnCard'

class LearnGame extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
  
  nextCard() {
    if (this.state.slideIndex === 3){
      bridge.send("VKWebAppStorageSet", {"key": "endLGLearning", "value": "true"})
      bridge.send("VKWebAppStorageGet", {"keys": ['endLGLearning']})
      this.props.endLearning(this.props.gameMode)
    } else {
      this.setState({slideIndex: this.state.slideIndex + 1})
    }
  }

	render() {
        let { id, scheme, gameMode } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
            {
              <div style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
                <Group>
                  {gameMode === 'LG' &&
                    <Gallery
                      slideWidth="100%"
                      align="center"
                      style={{ height: "85vh" }}
                      bullets={(scheme === "bright_light" || scheme === "client_light") ? 'dark': 'light'}
                      slideIndex={this.state.slideIndex}
                      onChange={slideIndex => this.setState({slideIndex})}
                    >
                          <LearnCard
                            id={5}
                            />
                          <LearnCard
                            id={6}
                            />
                          <LearnCard
                            id={7}
                            />
                          <LearnCard
                            id={8}
                            />
                    </Gallery>
                  }
                  <Div style={{marginTop: "2vh", paddingLeft: "2vh", paddingRight: "2vh"}}>
                    <Button
                      className="buttonPurple"
                      after={this.state.slideIndex === 3 ? null: <Icon28ArrowRightOutline/>}
                      style={{position: "relative", bottom: '10', width: "70%", height: "5vh", left: "15%", fontFamily: "Montserrat", fontSize: "5vh"}}
                      onClick={() => this.nextCard()}
                    >
                      {this.state.slideIndex === 3 ? "Начать!": "Вперёд!"}
                    </Button>
                  </Div>
                </Group>
              </div>
            }
            </Panel>
		);
	}
}

LearnGame.propTypes = {
    id: PropTypes.string.isRequired,
};

export default LearnGame;
