import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, Div, Header, Group, SimpleCell, Switch, PanelHeaderButton, ModalPage,
  ModalRoot, ModalPageHeader, FormLayout, Input, Select, FormStatus } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon28InboxOutline from '@vkontakte/icons/dist/28/inbox_outline';
import Icon28DeleteOutlineAndroid from '@vkontakte/icons/dist/28/delete_outline_android';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';

import bridge from '@vkontakte/vk-bridge';

class AddQuestion extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            firstPart: '',
            number: '',
            units: '',
            country: '',
            tags: '',
            source: '',
            addedby: '',
        }
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value, addedby: this.props.user.first_name });
    }
    
    send(){
        if (this.state.firstPart && this.state.number && this.state.units && this.state.country){
            this.setState({addedby: this.props.user.first_name})
            this.props.sendQuestion(this.state)
            this.props.goBack()
        } else {
            this.setState({no_all_fields: true})
        }
    }

	render() {
        let { id, sendQuestion } = this.props
		return (
            <Panel id={id}>
            {
              <div>
                <PanelHeader>Добавить вопрос</PanelHeader>
                <FormLayout>
                {
                    this.state.no_all_fields === true &&
                    <FormStatus header="Заполнены не все поля" mode="error">
                        Пожалуйста заполните все необходимые поля
                    </FormStatus>
                }
                    <Input
                        type='text'
                        top="Первая часть вопроса"
                        name="firstPart"
                        onChange={(e) => this.onChange(e)}
                    />
                    <Input
                        type='text'
                        top="Число"
                        name="number"
                        onChange={(e) => this.onChange(e)}
                    />
                    <Input
                        type='text'
                        top="Единицы измерения"
                        name="units"
                        onChange={(e) => this.onChange(e)}
                    />
                    <Input
                        type='text'
                        top="Тэги через запятую или пробел"
                        name="tags"
                        onChange={(e) => this.onChange(e)}
                    />
                    <Select top="Страна" placeholder="Выберите страну" name="country" onChange={(e) => this.onChange(e)}>
                        <option value="ru">Россия</option>
                        <option value="world">Мир</option>
                        <option value="other">Другая</option>
                    </Select>
                    <Input
                        type='text'
                        top="Ссылка на достоверный источник"
                        name="source"
                        onChange={(e) => this.onChange(e)}
                    />
                    <Button size='xl' className='buttonPurple' onClick={() => this.send()}>
                        Отправить вопрос
                    </Button>
                </FormLayout>
              </div>
            }
            </Panel>
		);
	}
}

AddQuestion.propTypes = {
    id: PropTypes.string.isRequired,
};

export default AddQuestion;
