import React from 'react';
import bridge from '@vkontakte/vk-bridge';
// import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, PanelSpinner } from '@vkontakte/vkui';
import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline';
import Icon28GraphOutline from '@vkontakte/icons/dist/28/graph_outline';

import {PHRASES, STORY_STICKERS, STORY_SCORE_LINKS } from '../Config'
import {scoreDeclination, countRights, ratingShift} from '../Utils'

class LGGameEnd extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350,
        }
    }
  

  handler(e) {
    this.props.history.push('pa_' + e.currentTarget.dataset.panel);
    window.history.pushState({view: e.currentTarget.dataset.panel}, e.currentTarget.dataset.panel);
    if (e.currentTarget.dataset.panel === 'statpanel'){
      this.props.viewGameStat()
    }
  }

  createSroreStory(lg){
    console.log(lg)
    bridge.send("VKWebAppShowStoryBox",
    {
      "background_type": "image",
      "url": STORY_SCORE_LINKS[countRights(this.props.lastGame) - 1],
      "locked": true,
      "stickers": [
        {
          "sticker_type": "renderable",
          "sticker": {
            "can_delete": 0,
            "content_type": "image",
            "url": STORY_STICKERS.open_dogeo_rotate,
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

	render() {
    let {id, lastGame, menuReturn, lockGameEnd, ratingGame} = this.props

		return (
      <Panel id={id}>
        <PanelHeader>Больше - меньше</PanelHeader>
        {lockGameEnd 
        ? <PanelSpinner /> 
        :<div>
          <div style={{fontSize: '5vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '3vh'}}>
            Игра окончена!
          </div>
          <div style={{fontSize: '12vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '7vh', paddingBottom: '7vh'}}>
            {countRights(lastGame)}/{lastGame.length}
          </div>
          <div style={{fontSize: '3vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)"}}>
            {PHRASES[countRights(lastGame) - 1]}
          </div>
          <div style={{fontSize: '2vh', fontFamily: "Montserrat", fontWeight: 500, textAlign: "center", color: "var(--purple-dark)", paddingTop: '3vh'}}>
            Вы заработали {ratingGame ? '' : "бы"} {scoreDeclination(ratingShift(lastGame))}!
          </div>
          <div style={{position: 'relative', paddingTop: '5vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '10%', paddingRight: '10%'}}>
            <Button stretched className="buttonPurple" style={{width: '40%', marginRight: '2%'}} before={<Icon28StoryOutline />} onClick={lastGame => this.createSroreStory(lastGame)}>
              Поделиться в истории
            </Button>
            <Button stretched
            className="buttonPurple"
            style={{width: '40%', marginLeft: '2%'}}
            before={<Icon28GraphOutline />}
            data-panel='statpanel'
            onClick={this.handler.bind(this)}
            >
              Подробнее
            </Button>
          </div>
          <div style={{position: 'relative', left: '10%', width: '80%', paddingTop: '2vh'}}>
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
        </div>}
      </Panel>
		);
	}
}

LGGameEnd.propTypes = {
  // TODO: Проставить типы
};

export default LGGameEnd;
