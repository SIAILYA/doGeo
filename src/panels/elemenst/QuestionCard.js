import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid, SimpleCell, Avatar, Header, HorizontalScroll } from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon28LinkOutline from '@vkontakte/icons/dist/28/link_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';

import {getCountry} from '../../Utils'

class QuestionCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }

    openSource(e) {
        if (e.currentTarget.dataset.type === 'source'){
            this.props.openModal(e.currentTarget.dataset.source)
        }
    }


	render() {
    let { flag, country, firstPart, number, units, id, source, addedby, addedlink, tags } = this.props

		return (
            <div style={{marginBottom: '2vh', textAlign: 'left'}}>
                <Group
                separator="hide"
                >
                <CardGrid>
                <Card size="l" mode="shadow" style={{fontFamily: "Montserrat"}}>
                    <div style={{marginTop: "2vh", paddingLeft: "5%", paddingRight: "5%", marginBottom: "3%"}}>
                        <div>
                            <SimpleCell
                            disabled
                            style={{padding: 0}}
                            before={<Avatar size={40} src={flag}/>}
                            after={<Header mode="secondary">{'id#' + id}</Header>} 
                            >
                                {getCountry(country)}
                            </SimpleCell>
                        </div>
                        
                        <div>
                            <p>{firstPart} <span style={{color: "var(--purple-dark)", fontWeight: 500, fontSize: '1.5em'}}>{number}</span> {units}</p>
                        </div>

                        <div style={{paddingBottom: '2vh'}}>
                            <HorizontalScroll>
                                <div style={{ display: 'flex' }}>
                                    {
                                        tags.map((tag, index) => {
                                            return(
                                                <Button
                                                    key={index}
                                                    mode='secondary'
                                                    disabled
                                                    style={{color: 'var(--purple-dark)', opacity: 1, marginRight: '2%'}}
                                                >
                                                {tag}
                                                </Button>
                                            )
                                        })
                                    }
                                </div>
                            </HorizontalScroll>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                                <Button
                                    before={<Icon28LinkOutline />}
                                    data-type='source'
                                    data-source={source}
                                    className='buttonPurple'
                                    onClick={this.openSource.bind(this)}
                                >
                                    Источник
                                </Button>
                            </div>
                            <div>
                                <Button
                                    before={<Icon28UserOutline width={20} height={20} fill='var(--purple-dark)'/>}
                                    onClick={this.openSource.bind(this)}
                                    mode='outline'
                                    data-type='author'
                                    data-link={addedlink}
                                    style={{color: 'var(--purple-dark)', borderColor: 'var(--purple-dark)'}}
                                >
                                     {addedby}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
                </CardGrid>
            </Group>
            </div>
		);
	}
}

QuestionCard.propTypes = {
  // TODO: Указать типы
};

export default QuestionCard;
