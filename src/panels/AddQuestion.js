import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, FormLayout, Input, Select, FormStatus, FormLayoutGroup } from '@vkontakte/vkui';
import axios from 'axios';

import { BACKEND } from '../Config';

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
            addedlink: ''
        }

    }
    
    

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
        this.setState({addedlink: 'https://vk.com/id' + this.props.user.id})
    }
    
    send(){
        if (this.state.firstPart && this.state.number && this.state.units && this.state.country){
            axios.post(BACKEND + '/api/v1/add_user_question', this.state)
            this.props.showSnackbar()
            this.props.goBack()
        } else {
            this.setState({no_all_fields: true})
        }
    }

	render() {
        let { id } = this.props
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
                        placeholder='Россия имеет'
                        onChange={(e) => this.onChange(e)}
                        maxLength={85}
                    />
                    <Input
                        type='number'
                        top="Число"
                        name="number"
                        placeholder='18'
                        onChange={(e) => this.onChange(e)}
                        maxLength={20}
                    />
                    <Input
                        type='text'
                        top="Единицы измерения"
                        name="units"
                        placeholder='сухопутных границ'
                        onChange={(e) => this.onChange(e)}
                        maxLength={45}
                    />
                    <Input
                        type='text'
                        top="Теги через запятую или пробел"
                        name="tags"
                        placeholder='Россия, Население'
                        onChange={(e) => this.onChange(e)}
                    />
                    <Select top="Страна" placeholder="Выберите страну" name="country" onChange={(e) => this.onChange(e)}>
                        <option value="ru">Россия</option>
                        <option value="world">Мир</option>
                        <option value="other">Другая</option>
                    </Select>
                    <FormLayoutGroup top="Ссылка на достоверный источник" bottom="Если у Вас нет ссылки на источник, оставьте поле пустым">
                        <Input
                            type='text'
                            name="source"
                            onChange={(e) => this.onChange(e)}
                            maxLength={200}
                        />
                    </FormLayoutGroup>
                    <FormLayoutGroup top="Никнейм" bottom="Будет указан на панели просмотра вопросов">
                        <Input
                            type='text'
                            name="addedby"
                            onChange={(e) => this.onChange(e)}
                        />
                    </FormLayoutGroup>
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
