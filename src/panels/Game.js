import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FixedLayout, Button, Div, Header, Gallery, Group, PanelHeaderBack, Avatar } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import bridge from '@vkontakte/vk-bridge';

import logo from '../img/logo.svg'
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
        let { id, mode } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
            {
              <div style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
                <PanelHeader>{{mode}}</PanelHeader>
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
