import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FixedLayout, Button, Div, Header, Gallery, Group, PanelHeaderBack, Avatar } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import bridge from '@vkontakte/vk-bridge';

import logo from '../img/logo.svg'
import LearnCard from '../panels/elemenst/LearnCard'

class Learn extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let { id, scheme } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
            {
              <div style={{ marginBottom : 0, paddingRight: 0, paddingLeft: 0 }}>
                <Group header={<Header mode="secondary">Centered</Header>}>
                  <Gallery
                    slideWidth="90%"
                    align="center"
                    style={{ height: 150 }}
                    bullets={(scheme === "bright_light" || scheme === "client_light") ? 'dark': 'light'}
                  >
                    <LearnCard
                      id={1}
                      
                      />
                  </Gallery>
                </Group>
              </div>
            }
            </Panel>
		);
	}
}

Learn.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Learn;
