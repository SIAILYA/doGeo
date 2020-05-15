import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, Div, Header, Group, Avatar, SimpleCell, Switch, PanelHeaderButton, ModalPage,
  ModalRoot, ModalPageHeader } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline';
import Icon28GiftOutline from '@vkontakte/icons/dist/28/gift_outline';
import Icon28CopyOutline from '@vkontakte/icons/dist/28/copy_outline';
import Icon28InboxOutline from '@vkontakte/icons/dist/28/inbox_outline';

import bridge from '@vkontakte/vk-bridge';

import {BACKEND} from '../Config.js';

class More extends React.Component {
	constructor(props) {
    super(props);
    
    this.state = {
      slideIndex: 0,
      imageHeight : 350,
      qrTooltip: false,
      activeModal: null,
      userRating: null
    }

    this.modalBack = () => {
      this.setState({activeModal: null});
    };
  }
  
  createStory() {
    console.log(123);
    bridge.send("VKWebAppShowStoryBox",
    {
      "background_type": "none",
      "stickers": [
        {
          "sticker_type": "renderable",
          "sticker": {
            "can_delete": 0,
            "content_type": "image",
            "url": "https://i.ibb.co/LJQxJjd/sticker.png",
            "clickable_zones": [
              {
                "action_type": "link",
                "action": {
                  "link": "https://vk.com/app7459253",
                  "tooltip_text_key": "Открыть приложение"
                },
                "clickable_area": [
                  {
                    "x": 8,
                    "y": 7
                  },
                  {
                    "x": 703,
                    "y": 7
                  },
                  {
                    "x": 703,
                    "y": 381
                  },
                  {
                    "x": 8,
                    "y": 381
                  }
                ]
              }
            ]
          }
        }
      ]
    }
    );
  }

  sendLink() {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app7459253"});
  }

  donate() {
    bridge.send("VKWebAppOpenPayForm",
    {
      "app_id": 7459253,
      "action": "transfer-to-user",
      "params": {
        "user_id": 223632391,
        "description": "На чай, пиццу и все остальное :)"
      }
    });
    
  }

  setRating(r) {
    if (this.state.userRating === null) {
      this.setState({userRating: '...'})
    } else {
      let word = ''
      let rating = r
      if (rating < 20) {
        if (rating >= 5 || rating === 0){
          word = 'очков'
        } else if (rating === 2 || rating === 3 || rating === 4){
          word = 'очка'
        } else {
          word = 'очко'
        }
      } else {
        if (rating % 10 === 0){
          word = 'очков'
        } else if (rating % 10 === 1){
          word = 'очко'
        } else {
          word = 'очка'
        }
      }
      this.setState({userRating: rating + ' ' + word})
    }
  }

	render() {
    let { id, themeUpdate, scheme, user } = this.props
    if (!user.first_name){
      bridge.send('VKWebAppGetUserInfo');
    }
    if (this.state.userRating === null){
      this.setState(
        { userRating: '...' }
      )
      axios.get(BACKEND + '/api/getuserrating/' + user.id).then(response =>
        this.setRating(response.data)
      )
    }


		return (
            <Panel id={id} style={{ marginBottom : 5 }}>
            {
              <div>
                <PanelHeader>Другое</PanelHeader>
                <Div
                  style={{paddingRight: "0", paddingLeft: "0", paddingBottom: "0"}}>
                  <Group>
                    <Header mode="secondary">Добрый день!</Header>
                    <SimpleCell
                      before={<Avatar size={48}
                      src={user.photo_max_orig} />}
                      after={<Icon28StoryOutline fill="var(--purple-light)"/>}
                      description={this.state.userRating}
                      onClick={this.createStory}
                    >
                      {user.first_name} {user.last_name}
                    </SimpleCell>
                  </Group>
                  <Group>
                    <Header mode="secondary">Внешний вид</Header>
                    {
                      (scheme === "bright_light" || scheme === "client_light")
                      ? <SimpleCell
                          disabled
                          after={<Switch />}
                          onChange={themeUpdate}
                        >
                          Тёмная тема
                        </SimpleCell>
                        // Условие!!
                      : <SimpleCell
                          disabled
                          after={<Switch defaultChecked />}
                          onChange={themeUpdate}
                        >
                          Тёмная тема
                        </SimpleCell>
                    }
                  </Group>
                  <Group>
                    <Header mode="secondary">Рассказать о сервисе</Header>
                    <SimpleCell
                      before={<Icon28StoryOutline fill="var(--purple-light)"/>}
                      description="Расскажите о своих познаниях в географии!"
                    >
                      Поделиться в истории
                    </SimpleCell>
                    <SimpleCell
                      before={<Icon28ShareOutline fill="var(--purple-light)"/>}
                      description="Соревнуйтесь с друзьями"
                      onClick={this.sendLink}
                    >
                      Отправить ссылку
                    </SimpleCell>
                  </Group>
                  <Group>
                    <Header mode="secondary">Контакты</Header>
                    <SimpleCell
                      before={<Icon28MessageOutline fill="var(--purple-light)"/>}
                      description="По вопросам сотрудничества и проблемам"
                      href="https://vk.com/im?sel=223632391"
                      style={{textDecoration: "none"}}
                    >
                      Написать разработчику
                    </SimpleCell>
                    <SimpleCell
                      before={<Icon28GiftOutline fill="var(--purple-light)"/>}
                      description="Порадовать разработчика"
                      onClick={() => {this.donate()}}
                    >
                      Сделать пожертвование
                    </SimpleCell>
                    <SimpleCell
                      before={<Icon28InboxOutline fill="var(--purple-light)"/>}
                      description="Или сообщить об ошибке"
                      disabled
                    >
                      Предложить факт
                    </SimpleCell>
                  </Group>
                  <Group>
                    <Header mode="secondary">Прочее</Header>
                    <SimpleCell
                      before={<Icon28CopyOutline fill="var(--purple-light)"/>}
                      description="Пользуясь приложением..."
                      onClick={()  => {this.setState({activeModal: "agreement"})}}
                    >
                      Соглашения
                    </SimpleCell>
                  </Group>
                  <ModalRoot
                  activeModal={this.state.activeModal}
                  onClose={this.modalBack}
                  >
                    <ModalPage
                      id="agreement"
                      onClose={this.modalBack}
                      header={
                        <ModalPageHeader
                          right={<PanelHeaderButton onClick={this.modalBack}>{<Icon24Back />}</PanelHeaderButton>}
                        >
                          Пользовательские соглашения
                        </ModalPageHeader>
                      }
                    >
                    <Div 
                      style={{paddingBottom: "200px", paddingLeft: 0, paddingRight: 0}}>
                      <Group>
                        <Header mode="secondary">doGeo!</Header>
                        <Div>
                          Приложение "doGeo!" не собирает данных пользователя в целях их коммерчесского и некоммерческого использования.
                          Используя приложение, вы соглашаетесь с нижеприведенной политикой конфиденциальности, а так же принимаете соглашение пользователя.
                        </Div>
                      </Group>
                      <Group>
                        <Header mode="secondary" size="l">Политика конфиденциальности</Header>
                        <Div>
                          <Button stretched href="https://vk.com/dev/uprivacy">Открыть</Button>
                        </Div>
                      </Group>
                      <Group>
                        <Header mode="secondary" size="l">Соглашение пользователя</Header>
                        <Div>
                          <Button stretched href="https://vk.com/dev/uterms">Открыть</Button>
                        </Div>
                      </Group>
                    </Div>
                    </ModalPage>
                  </ModalRoot>
                </Div>
              </div>
            }
            </Panel>
		);
	}
}

More.propTypes = {
    id: PropTypes.string.isRequired,
};

export default More;
