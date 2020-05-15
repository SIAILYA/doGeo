import React from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
// import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, PanelSpinner } from '@vkontakte/vkui';
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';

import {PHRASES, BACKEND} from '../Config'

class LGGameEnd extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350,
            sendRating: false,
            lockGameEnd: false,

        }
    }
  
  countRights(answers) {
    let rights = 0;
    for (let i = 0; i < answers.length; i++){
      if (answers[i] === 1){
        rights++
      }
    }
    return rights;
  }

  getPhrase(answers) {
    return PHRASES[Math.round(this.countRights(answers)/answers.length) * 5 - 1];
  }

  sendResult(ratingShift, user, lastGame, questions){
    let now = new Date();
    let data = {
      "user_id": user.id,
      "rating_shift": ratingShift,
      "game_data": {'date': now, 'answers': lastGame, 'questions': questions}
    }
    this.setState({lockGameEnd: true})
    axios.post(BACKEND + '/api/increacerating', data)
    .then(response => {
      this.setState({lockGameEnd: false})
    })
  }

  getRatingShift(lg){
    let rights = this.countRights(lg);
    let ratingShift = Math.round(rights - (lg.length - rights) * 0.5)
    let word = ''

    if (ratingShift < 0){
      ratingShift = 0;
    }

    if (ratingShift < 20) {
      if (ratingShift>= 5 || ratingShift === 0){
        word = 'очков'
      } else if (ratingShift === 2 || ratingShift === 3 || ratingShift === 4){
        word = 'очка'
      } else {
        word = 'очко'
      }
    } else {
      if (ratingShift % 10 === 0){
        word = 'очков'
      } else if (ratingShift % 10 === 1){
        word = 'очко'
      } else {
        word = 'очка'
      }
    }

    return 'Вы заработали ' + ratingShift + ' ' + word + '!';
  }

  getRatingShiftInt(lg){
    let rights = this.countRights(lg);
    let ratingShift = Math.round(rights - (lg.length - rights) * 0.5)
    return ratingShift;
  }

	render() {
    let {id, lastGame, questions, menuReturn, user} = this.props

    if (!user.first_name){
      bridge.send('VKWebAppGetUserInfo');
    }

    if (!this.state.sendRating){
      this.sendResult(this.getRatingShiftInt(lastGame), user, lastGame, questions)
      this.setState({sendRating: true})
    }

		return (
      <Panel id={id}>
        <PanelHeader>Больше - меньше</PanelHeader>
        {this.state.lockGameEnd 
        ? <PanelSpinner /> 
        :<div>
          <div style={{fontSize: '5vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '3vh'}}>
            Игра окончена!
          </div>
          <div style={{fontSize: '12vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '15vh'}}>
            {this.countRights(lastGame)}/{lastGame.length}
          </div>
          <div style={{fontSize: '3vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '5vh'}}>
            {this.getPhrase(lastGame)}
          </div>
          <div style={{fontSize: '2vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '5vh'}}>
            {this.getRatingShift(lastGame)}
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
        </div>}
      </Panel>
		);
	}
}

LGGameEnd.propTypes = {
  // TODO: Проставить типы
};

export default LGGameEnd;
