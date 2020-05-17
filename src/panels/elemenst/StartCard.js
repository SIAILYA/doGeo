import React from 'react';
import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid } from '@vkontakte/vkui';
import Icon28HelpOutline from '@vkontakte/icons/dist/28/info_outline';


class StartCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
    let {title, description, disabled, startGame, startLearning, Gmode, learnLG} = this.props

		return (
        <Group separator="hide">
          <CardGrid>
            <Card size="l" mode="shadow" style={{paddingBottom: '5%', paddingTop: "5%", fontFamily: "Montserrat"}}>
              <div style={{textAlign: "center", fontFamily: "Montserrat", paddingBottom: "5%", fontSize:'4.3vw'}}>
                {title}
              </div>
              <div style={{paddingLeft: "10%", paddingRight:"10%", paddingBottom: "5%", textAlign: "center"}}>
                <div>
                  {description.split('|')[0]}
                </div>
                <div>
                  {description.split('|')[1]}
                </div>
              </div>
              <div>
                {
                  !disabled &&
                  <div style={{display: 'flex', flexDirection: 'row', paddingLeft: "10%", paddingRight: "10%"}}>
                    <Button
                    className="buttonPurple"
                    stretched size='l' 
                    style={{width: "70%", position: "relative", right: "2.5%"}}
                    onClick={learnLG ? () => startGame(Gmode) : () => startLearning(Gmode)}>
                      {
                        learnLG ? "Играть" : "Как играть?"
                      }
                    </Button>
                    <Button
                    className="buttonPurple"
                    size='l' 
                    style={{width: "15%", position: "relative", left: "2.5%"}}
                    onClick={() => startLearning(Gmode)}>
                    <Icon28HelpOutline />
                    </Button>
                  </div>
                }
                {
                  disabled &&
                  <Button stretched disabled size='l' style={{width: "80%", position: "relative", left: "10%",  background: "linear-gradient(135deg, #bdc3c7, 50%, #2c3e50)"}}>
                    Уже скоро!
                  </Button>
                }
              </div>
            </Card>
          </CardGrid>
        </Group>
		);
	}
}

StartCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StartCard;
