import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vkontakte/vkui';
import gamepad from "../../img/gamepad.svg"
import question from "../../img/question.svg"
import earth from "../../img/earth.svg"
import share from "../../img/share.svg"
import swipe from "../../img/swipe.svg"
import lg from "../../img/lg.svg"
import num from "../../img/num.svg"
import map from "../../img/map.svg"
import score from "../../img/score.svg"

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
                <img className="iconimg" src={gamepad} alt="gamepad"/>
              </div>
            </div>
          }
          { id === 2 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "12vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Отвечайте на вопросы</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>В разнообразных режимах</p>
                <p style={{marginBottom: 0, marginTop: 10}}>Набирайте очки рейтинга и поднимайтесь в турнирной таблице!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={question} alt="question"/>
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
                <img className="iconimg" src={share} alt="share"/>
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
                <img className="iconimg" src={earth} alt="earth"/>
              </div>
            </div>
          }
          { id === 5 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "10vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Больше - меньше</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>В каждом вопросе выделено число,</p>
                <p style={{marginBottom: 0, marginTop: 10}}>которое на самом деле больше или меньше</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={num} alt="number"/>
              </div>
            </div>
          }
          { id === 6 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "10vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Больше - меньше</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Если выделенное число</p>
                <p style={{marginBottom: 0, marginTop: 10}}>меньше действительного - свайпните карточку вправо. И наоборот: если число больше - свайп влево!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={lg} alt="lg"/>
              </div>
            </div>
          }
          { id === 7 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "10vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Больше - меньше</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Например, карточку с утверждением </p>
                <p style={{marginBottom: 0, marginTop: 10}}>"В мире 1 континент" нужно смахнуть вправо</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={swipe} alt="swipe"/>
              </div>
            </div>
          }
          { id === 8 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "10vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Больше - меньше</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Ведь в мире на самом деле</p>
                <p style={{marginBottom: 0, marginTop: 10}}>целых шесть континентов! А шесть, как известно, больше одного!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={map} alt="map"/>
              </div>
            </div>
          }
          { id === 9 &&
            <div style={{textAlign: "center", fontFamily: "Montserrat", marginTop: "8vh"}}>
              <div>
                <p className="hello gradient-text" style={{fontSize: "10vw", fontWeight: 700, marginBottom: 0, marginTop: 0, lineHeight: 1.2}}>Больше - меньше</p>
              </div>
              <div style={{textAlign: 'center', paddingRight: '10%', paddingLeft: '10%'}}>
                <p className="dogeo gradient-text" style={{fontSize: "5vw", marginBottom: 0, marginTop: 30, fontWeight: 500}}>Набирайте очки!</p>
                <p style={{marginBottom: 0, marginTop: 10}}>Правильный ответ прибавит 1 балл к вашему рейтингу, а ошибка будет строить -0,5 балла. Но в минус все равно уйти не получится!</p>
              </div>
              <div className="icon" style={{marginTop: "7vh"}}>
                <img className="iconimg" src={score} alt="score"/>
              </div>
            </div>
          }
        </Group>
		);
	}
}

LearnCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default LearnCard;
