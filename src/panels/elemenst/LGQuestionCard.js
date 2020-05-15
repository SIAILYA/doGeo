import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid, SimpleCell, Avatar } from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

class LGQuestionCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
  
  getCountry(code){
    if (code === 'ru'){
      return 'Россия'
    } else if (code === 'world'){
      return 'Весь мир'
    }
  }

	render() {
    let { cardnumber, total, firstPart, number, unit, flag, country } = this.props

		return (
        <Group separator="hide">
          <CardGrid>
            <Card size="l" mode="shadow" style={{fontFamily: "Montserrat", height: "76vh"}}>
              <div style={{paddingBottom: '5%', paddingTop: "5%", paddingLeft: "5%", paddingRight: "5%",}}>
                <div style={{textAlign: "center"}}>
                  Карточка {cardnumber + 1}/{total}
                </div>
                <div style={{marginTop: "2vh", paddingLeft: "5%", paddingRight: "5%", marginBottom: "5%"}}>
                  <SimpleCell disabled before={<Avatar size={40} src={flag} />}>{this.getCountry(country)}</SimpleCell>
                </div>
                <div style={{marginTop: "10vh", fontSize: "3vh", textAlign: "center"}}>
                  {firstPart}
                </div>
                <div style={{textAlign: "center", fontSize: "7vh", fontWeight: 500, color: "var(--purple-dark)", marginTop: "5vh"}}>
                  {number}
                </div>
                <div style={{textAlign: "center", fontSize: "2vh", marginTop: "1vh"}}>
                  {unit}
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "13vh"}}>
                <div style={{textAlign: "center"}}>
                  <Button className="buttonPurple" style={{width: "7vh", height: "7vh", borderRadius: "50%"}}>{<Icon24BrowserBack />}</Button>
                  <br/>
                  <p style={{fontSize: "1.4vh"}}>На самом деле{<br/>}меньше</p>
                </div>
                <div style={{textAlign: "center"}}>
                  <Button className="buttonPurple" style={{width: "7vh", height: "7vh", borderRadius: "50%"}}>{<Icon24BrowserForward />}</Button>
                  <br/>
                  <p style={{fontSize: "1.4vh"}}>На самом деле{<br/>}больше</p>
                </div>
                </div>
              </div>
            </Card>
          </CardGrid>
        </Group>
		);
	}
}

LGQuestionCard.propTypes = {
  // TODO: Указать типы
};

export default LGQuestionCard;