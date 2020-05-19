import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, Button, SimpleCell, ModalRoot, ScreenSpinner, Placeholder, ModalCard } from '@vkontakte/vkui';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon56LinkCircleOutline from '@vkontakte/icons/dist/56/link_circle_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

import QuestionCard from '../panels/elemenst/QuestionCard'

class Questions extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350,
            qrTooltip: false,
            activeModal: null,
            questionsList: [],
            loadingQuestions: true,
            serverError: false,
            source: null,
        }

        this.modalBack = () => {
            this.setState({activeModal: null});
        };
    }

    openModal(source) {
        this.setState({activeModal: 'modalcard', source: source})
    }

 
	render() {
        let {questionsList, getFirstQuestions, addQuestions, loadingQuestions, questionsPanel, openSearch} = this.props

        if (questionsList.length === 0){
            getFirstQuestions()
        }

        const modal = (
            <ModalRoot
                activeModal={this.state.activeModal}
                onClose={this.modalBack}
            >  
                <ModalCard
                id='modalcard'
                onClose={() => this.setState({activeModal: null})}
                icon={<Icon56LinkCircleOutline fill='var(--purple-dark)'/>}
                header="Перейти источник"
                caption={this.state.source}
                >
                    <Button size='xl' className='buttonPurple' style={{marginTop: '2vh'}} href={this.state.source}>
                        Открыть
                    </Button>
                </ModalCard>
            </ModalRoot>
        )

		return (
            <View
                id="questionsview"
                activePanel={questionsPanel}
                popout={loadingQuestions ? <ScreenSpinner /> : null}
                modal={modal}
            >
                <Panel id='questionspanel'>
                    <PanelHeader>Вопросы и факты</PanelHeader>
                    <SimpleCell
                        before={<Icon28SearchOutline fill='var(--purple-dark)'/>}
                        after={<Button className="buttonPurple" onClick={() => openSearch()}>Параметры</Button>}
                        style={{fontFamily: 'Montserrat', color: 'var(--purple-dark)'}}
                        disabled
                    >
                        Настройки поиска
                    </SimpleCell>
                    {
                        questionsList.map((question, index) => {
                            return(
                                <QuestionCard
                                    key={index}
                                    flag={question.flag}
                                    country={question.country}
                                    firstPart={question.firstPart}
                                    number={question.number}
                                    units={question.units}
                                    id={question.id}
                                    source={question.source}
                                    addedby={question.addedby}
                                    addedlink={question.addedlink}
                                    tags={question.tags}
                                    openModal={this.openModal.bind(this)}
                                />
                        )})
                    }
                    {
                        questionsList.length !== 0 &&
                        <div>
                            <Button
                                stretched
                                className="buttonPurple"
                                size='xl'
                                after={<Icon28MoreHorizontal />}
                                style={{position: 'relative', width: '80%', left: '10%', marginBottom: '2vh'}}
                                onClick={() => addQuestions()}
                            >
                                Показать еще
                            </Button>
                        </div>
                    }
                    {
                        this.state.serverError &&
                        <Placeholder
                            icon={<Icon56DoNotDisturbOutline />}
                            header="Сервер с вопросами недоступен..."
                        ></Placeholder>
                    }
                </Panel>
                <Panel id='searchpanel'>
                    <PanelHeader>Поиск вопросов</PanelHeader>
                    <Placeholder
                        icon={<Icon56RecentOutline />}
                        header='Уже скоро здесь появится поиск вопросов по тэгам!'
                    >

                    </Placeholder>
                </Panel>
            </View>
		);
	}
}

Questions.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Questions;
