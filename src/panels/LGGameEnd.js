import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button } from '@vkontakte/vkui';
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';

import {PHRASES} from '../Config'

class LGGameEnd extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
  
  contRights(answers) {
    let rights = 0;
    for (let i = 0; i < answers.length; i++){
      if (answers[i] === 1){
        rights++
      }
    }
    return rights;
  }

  getPhrase(answers) {
    return PHRASES[Math.round(this.contRights(answers)/answers.length) * 5 - 1];
  }

	render() {
    let {id, lastGame, menuReturn} = this.props

		return (
      <Panel id={id}>
        <PanelHeader>Больше - меньше</PanelHeader>
        <div>
          <div style={{fontSize: '5vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '3vh'}}>
            Игра окончена!
          </div>
          <div style={{fontSize: '12vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '15vh'}}>
            {this.contRights(lastGame)}/{lastGame.length}
          </div>
          <div style={{fontSize: '3vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '5vh'}}>
            {this.getPhrase(lastGame)}
          </div>
          <div style={{position: 'relative', left: '20%', width: '60%', paddingTop: '5vh'}}>
            <Button stretched className="buttonPurple" before={<Icon28StoryOutline />}>
              Поделиться в истории
            </Button>
          </div>
          <div style={{position: 'relative', left: '10%', width: '80%', paddingTop: '15vh'}}>
            <Button
              stretched
              size='xl'
              className="buttonPurple"
              after={<Icon28ArrowRightOutline />}
              onClick={() => menuReturn()}
              >
              В меню 
            </Button>
          </div>
        </div>
      </Panel>
		);
	}
}

LGGameEnd.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LGGameEnd;
