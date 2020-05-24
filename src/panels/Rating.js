import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, SimpleCell, List, Avatar, Card, CardGrid, Separator, FixedLayout, Header } from '@vkontakte/vkui';

import {scoreDeclination} from '../Utils'


class Rating extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
        }

        this.props.loadRating()
    }

    updateRating() {
        this.props.loadRating()
    }   
 
	render() {
        let {ratingUsers} = this.props

		return (
            <View
                id="ratingview"
                popout={null}
                activePanel='ratingpanel'
            >
                <Panel id="ratingpanel">
                    <PanelHeader>Рейтинг</PanelHeader>
                    {
                        ratingUsers.top !== undefined &&
                        <div style={{paddingTop: '2vh', paddingBottom: '2vh', fontFamily: 'Montserrat', color: 'white'}}>
                            <CardGrid>
                                <Card className='firstGold' size="l" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={80} src={ratingUsers.top[0].photo_max}/>
                                        </div>
                                        <div style={{fontSize: '1.2em'}}>
                                            {ratingUsers.top[0].first_name} {ratingUsers.top[0].last_name}
                                        </div>
                                        <div style={{fontSize: '1.4em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers.top[0].rating)} 
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 400}}>
                                            Игр: {ratingUsers.top[0].games} | Верных ответов: {ratingUsers.top[0].right_answers}
                                        </div>
                                    </div>
                                </Card>
                                <Card className='secondSilver' size="m" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={64} src={ratingUsers.top[1].photo_max}/>
                                        </div>
                                        <div>
                                            {ratingUsers.top[1].first_name} {ratingUsers.top[1].last_name}
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers.top[1].rating)} 
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 400}}>
                                            {ratingUsers.top[1].games} | {ratingUsers.top[1].right_answers}
                                        </div>
                                    </div>
                                </Card>
                                <Card className='thirdBronse' size="m" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={64} src={ratingUsers.top[2].photo_max}/>
                                        </div>
                                        <div>
                                            {ratingUsers.top[2].first_name} {ratingUsers.top[2].last_name}
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers.top[2].rating)} 
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 400}}>
                                            {ratingUsers.top[2].games} | {ratingUsers.top[2].right_answers}
                                        </div>
                                    </div>
                                </Card>
                            </CardGrid>
                        </div>
                    }
                    <Separator></Separator>
                    <List>
                            {   
                                ratingUsers.top !== undefined &&
                                ratingUsers.top.slice(3).map((user, index) => {
                                    return(
                                        <SimpleCell
                                            disabled
                                            key={index}
                                            before={<Avatar src={user.photo_max}/>}
                                            after={<Header mode='secondary'>{scoreDeclination(user.rating)}</Header>}                                    >
                                            {user.first_name} {user.last_name}
                                        </SimpleCell>
                                    )
                                })
                            }
                        </List>

                    {   
                        ratingUsers.top !== undefined && ratingUsers.current_user !== undefined &&
                        <FixedLayout vertical="bottom">
                            <SimpleCell
                                disabled
                                before={<Avatar src={ratingUsers.current_user.photo_max}/>}
                                after={<Header mode='secondary'>{scoreDeclination(ratingUsers.current_user.rating)}</Header>}       
                                description={ratingUsers.place + ' место' }
                            >
                                {ratingUsers.current_user.first_name} {ratingUsers.current_user.last_name}                            
                            </SimpleCell>
                        </FixedLayout>
                    }
                </Panel>
            </View>
		);
	}
}

Rating.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Rating;
