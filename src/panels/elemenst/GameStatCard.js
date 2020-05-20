import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid, SimpleCell, Header, HorizontalScroll } from '@vkontakte/vkui';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';

import {countArray} from '../../Utils'

class GameStatCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {

        }
    }


	render() {
        let { game_object } = this.props
        
		return (
            <div style={{marginBottom: '2vh', textAlign: 'left'}}>
                <Group
                    separator="hide"
                >
                <CardGrid>
                <Card size="l" mode="shadow" style={{fontFamily: "Montserrat"}}>
                    <div style={{marginTop: "2vh", paddingLeft: "5%", paddingRight: "5%", marginBottom: "3%"}}>
                        <div style={{textAlign: 'center'}}>
                            <SimpleCell
                            disabled
                            style={{padding: 0, textAlign: 'center'}}
                            before={game_object.rating_play
                                ? <Icon28Favorite style={{paddingTop: '7px'}} fill='var(--purple-dark)'/>
                                : <Icon28BrainOutline style={{paddingTop: '7px'}} fill='var(--purple-dark)'/>
                                    }
                            after={game_object.game_mode === 'LG' ? <Header mode="secondary">Больше-меньше</Header> : null}
                            >
                            </SimpleCell>
                            {new Date(game_object.date).toLocaleString("ru", {month: "short", day: "numeric"})}
                        </div>
                        
                        <div style={{fontSize: '5vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '2vh', paddingBottom: '2vh'}}>
                            {countArray(game_object.answers)}/{game_object.answers.length}
                        </div>

                        <div style={{paddingBottom: '2vh'}}>
                            <HorizontalScroll>
                                <div style={{ display: 'flex' }}>
                                    {
                                        game_object.answers.map((answer, index) => {
                                            if (answer === 1){
                                                return(
                                                    <Button className='buttonPurple' disabled style={{marginRight: '2%', borderRadius: 100, opacity: 1}}>
                                                        {index}
                                                    </Button>
                                                )
                                            } else {
                                                return(
                                                    <Button  mode="overlay_secondary" disabled style={{marginRight: '2%', borderRadius: 100, opacity: 1}}>
                                                        {index}
                                                    </Button>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </HorizontalScroll>
                        </div>
                    </div>
                </Card>
                </CardGrid>
            </Group>
            </div>
		);
	}
}

GameStatCard.propTypes = {
  // TODO: Указать типы
};

export default GameStatCard;
