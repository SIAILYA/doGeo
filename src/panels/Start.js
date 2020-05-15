import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Div, Gallery, Group, SimpleCell } from '@vkontakte/vkui';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';


import StartCard from '../panels/elemenst/StartCard.js'

class Start extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let { id, scheme, startGame } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
            {
              <div style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
                <PanelHeader>Играть</PanelHeader>
                <Div style={{paddingBottom: 0, paddingRight: 0, paddingLeft: 0}}>
                  <div style={{paddingTop: "5%", paddingLeft: "10%", paddingRight: "10%"}}>
                    <div>
                      <p className="logo-text logo-do">do</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p className="logo-text logo-geo">Geo<span className="exclamatory">!</span></p>
                    </div>
                    <div style={{textAlign: 'center', fontFamily: 'Montserrat', color: "#f53f8e", fontWeight: '500', paddingTop: '2%', fontSize: "4vw"}}>
                      Без географии вы нигде!
                    </div>
                  </div>

                  <div style={{paddingTop: "5%", marginBottom : 0, marginRight: 0, marginLeft: 0 }}>
                  <Group>
                    <Gallery
                      slideWidth="90%"
                      align="center"
                      style={{ height: 280 }}
                      bullets={(scheme === "bright_light" || scheme === "client_light") ? 'dark': 'light'}
                    > 
                      <StartCard
                        title="Больше - меньше"
                        description="На каждой карточке вопрос, в котором явно фигурирует некоторое число.|Догадайтесь, в какую сторону мы его изменили"
                        Gmode='LG'
                        startGame={startGame}
                      />
                      <StartCard
                        title="Верю - не верю"
                        description='Факты, о которых с ходу (или не совсем) можно сказать "правда" или "ложь".|Ваша задача - докопаться до истины!'
                        disabled={true}
                        />
                      <StartCard
                        title="Время - деньги"
                        description='На каждую карточку даётся по 5 секунд, не забудьте прочитать!|Единственное правило: "Не успел - проиграл"!'
                        disabled={true}
                      />
                    </Gallery>
                  </Group>
                  <div style={{textAlign: "center", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "5%"}}>
                      <SimpleCell
                        disabled
                        before={<Icon24BrowserBack fill="var(--purple-dark)"/>}
                        after={<Icon24BrowserForward fill="var(--purple-dark)" />}>
                        Свайпните для выбора режима
                      </SimpleCell>
                  </div>
                  </div>
                </Div>
              </div>
            }
            </Panel>
		);
	}
}

Start.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Start;
