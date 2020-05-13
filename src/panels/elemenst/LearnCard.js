import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FixedLayout, Button, Div, Header, Gallery, Group, PanelHeaderBack, Avatar, Card, CardGrid } from '@vkontakte/vkui';
import Icon28Play from '@vkontakte/icons/dist/28/play';


class LearnCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let { id } = this.props

		return (
        <Group separator="hide">
          { id === 1 &&
            <div style={{textAlign: "center"}}>
              <div>
                <p className="hello">Привет!</p>
              </div>
              <div style={{textAlign: 'center'}}>
                <p className="dogeo">Это doGeo - </p>
                <p>сервис, который превращает географию в веселую игру!</p>
              </div>
            </div>
          }
        </Group>
		);
	}
}

LearnCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LearnCard;
