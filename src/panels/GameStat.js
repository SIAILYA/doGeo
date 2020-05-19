import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Group, SimpleCell, Header, CardGrid, Card, Avatar, Button } from '@vkontakte/vkui';

import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';

import {countRights, getCountry} from '../Utils'

import allow from "../img/allow.svg"
import deny from "../img/deny.svg"

class Start extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let { id, lastGame, questions, menuReturn, generatedQuestions } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
            <PanelHeader>Результат игры</PanelHeader>
            <div style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0, marginTop: "5vh", textAlign: "center" }}>
                <div style={{fontSize: '12vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)"}}>
                    {countRights(lastGame)}/{lastGame.length}
                </div>
                <div style={{fontSize: '3vh', fontFamily: "Montserrat", color: "var(--purple-dark)" }}>
                    Статистика игры:
                </div>
                {
                    questions.map((question, index) => {
                        return(
                            <div style={{marginBottom: '2vh', textAlign: 'left'}}>
                                <Group
                                separator="hide"
                                header={
                                    <Header
                                    mode="secondary">
                                        Вопрос №{index + 1} {
                                            lastGame[index] === 1 
                                            ? <img style={{marginBottom: '-2px'}} width='6%' src={allow} alt='okay!'></img>
                                            : <img style={{marginBottom: '-2px'}} width='6%' src={deny} alt='no...'></img>
                                            }
                                    </Header>
                                }>
                                    <CardGrid>
                                    <Card size="l" mode="shadow" style={{fontFamily: "Montserrat"}}>
                                        <div style={{marginTop: "2vh", paddingLeft: "5%", paddingRight: "5%", marginBottom: "3%"}}>
                                            <div>
                                                <SimpleCell
                                                disabled
                                                style={{padding: 0}}
                                                before={<Avatar size={40} src={question.flag}/>}
                                                after={<Header mode="secondary">{'id#' + question.id}</Header>} 
                                                >
                                                    {getCountry(question.country)}
                                                </SimpleCell>
                                            </div>
                                            <div style={{fontWeight: 600, paddingTop: "2vh", marginBottom: "-1vh"}}>
                                                Вопрос:
                                            </div>
                                            <div>
                                                <p>{generatedQuestions[index].firstPart} <span style={{color: "var(--purple-dark)", fontWeight: 500, fontSize: '1.5em'}}>{generatedQuestions[index].number}</span> {generatedQuestions[index].units}</p>
                                            </div>
                                            <div style={{fontWeight: 600, paddingTop: "2vh", marginBottom: "-1vh"}}>
                                                Верно:
                                            </div>
                                            <div>
                                                <p>{question.firstPart} <span style={{color: "var(--purple-dark)", fontWeight: 500, fontSize: '1.5em'}}>{question.number}</span> {question.units}</p>
                                            </div>
                                            <div>
                                                {
                                                    lastGame[index] === 1
                                                    ? <p style={{color: '#76c976'}}>Вы ответили верно <span style={{fontSize: '0.8em'}}>({generatedQuestions[index].number} {generatedQuestions[index].number > question.number ? '>' : '<'} {question.number} - на самом деле {generatedQuestions[index].number > question.number ? 'меньше' : 'больше'})</span></p>
                                                    : <p style={{color: '#a31f21'}}>Вы ответили неверно <span style={{fontSize: '0.8em'}}>({generatedQuestions[index].number} {generatedQuestions[index].number > question.number ? '>' : '<'} {question.number} - на самом деле {generatedQuestions[index].number > question.number ? 'меньше' : 'больше'})</span></p>
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                    </CardGrid>
                                </Group>
                            </div>
                        )
                    })
                }
                <div style={{position: 'relative', left: '10%', width: '80%', paddingTop: '2vh', paddingBottom: '2vh'}}>
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

Start.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Start;
