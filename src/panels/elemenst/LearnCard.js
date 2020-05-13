import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FixedLayout, Button, Div, Header, Gallery, Group, PanelHeaderBack, Avatar, Card, CardGrid } from '@vkontakte/vkui';
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import gamepad from "../../img/gamepad.svg"
import question from "../../img/question.svg"
import earth from "../../img/earth.svg"
import share from "../../img/share.svg"

class LearnCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let { id } = this.props

		return (
        <Group separator="hide">
          { id === 1 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "18vw", fontWeight: 700, marginBottom: 0, marginTop: 0}}>Привет!</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "7vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Это doGeo!</p>
                <p style={{marginBottom: 0, marginTop: 10}}>Сервис, который превращает географию в увлекательную игру!</p>
              </div>
              <div className="icon" style={{marginTop: "10vh"}}>
                <img className="iconimg" src={gamepad}/>
              </div>
            </div>
          }
          { id === 2 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "12vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Отвечайте на вопросы</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Разнообразные режимы</p>
                <p style={{marginBottom: 0, marginTop: 10}}>Набирайте очки рейтинга и поднимайтесь в турнирной таблице!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={question}/>
              </div>
            </div>
          }
          { id === 3 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "12vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Приглашайте друзей</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Соревнуйтесь друг с другом</p>
                <p style={{marginBottom: 0, marginTop: 10}}>Выясните, кто настоящий знаток географии!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={share}/>
              </div>
            </div>
          }
          { id === 4 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "12vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Готовы ли Вы</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "6vw", marginBottom: 0, marginTop: 30, fontWeight: 600}}>Погрузиться в мир географии?</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={earth}/>
              </div>
            </div>
          }
        </Group>
		);
	}
}

LearnCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LearnCard;
