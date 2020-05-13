import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader, FixedLayout, Button, Div, Header, Gallery, Group, PanelHeaderBack } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back'
import bridge from '@vkontakte/vk-bridge';

class Poem extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }

    shareItem() {
        bridge.send("VKWebAppShare", {"link": `https://vk.com/app6906999#itemId=${this.props.item.id}`});
    }
    
	render() {
        let { id, poem } = this.props

		return (
            <Panel id={id} style={{ marginBottom : 100 }}>
            {
                <div>
                    <PanelHeader left={<PanelHeaderBack onClick={this.props.onBackClick} />}>{poem.title}</PanelHeader>

                    <Group>
                        <Div>
                            {poem.text}
                        </Div>
                    </Group>
                </div>
            }
            </Panel>
		);
	}
}

Poem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Poem;
