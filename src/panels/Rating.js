import React from 'react';
import PropTypes from 'prop-types';
import { View, Panel, PanelHeader, SimpleCell, ScreenSpinner, List, Avatar, Card, CardGrid, Separator, FixedLayout } from '@vkontakte/vkui';

import {scoreDeclination} from '../Utils'


class Questions extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {

        }

    }


 
	render() {
        let {loadingRating, ratingUsers, loadRating, fetchedUser} = this.props

        if (ratingUsers.length === 0){
            loadRating()
        }

		return (
            <View
                id="ratingview"
                popout={loadingRating ? <ScreenSpinner /> : null}
                activePanel='ratingpanel'
            >
                <Panel id="ratingpanel">
                    <PanelHeader>Рейтинг</PanelHeader>
                    {
                        ratingUsers.length !== 0 &&
                        <div style={{paddingTop: '2vh', paddingBottom: '2vh', fontFamily: 'Montserrat', color: 'white'}}>
                            <CardGrid>
                                <Card className='firstGold' size="l" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={80} src={ratingUsers[0].photo_max}/>
                                        </div>
                                        <div style={{fontSize: '1.2em'}}>
                                            {ratingUsers[0].first_name} {ratingUsers[0].last_name}
                                        </div>
                                        <div style={{fontSize: '1.4em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers[0].rating)} 
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 400}}>
                                            35 игр | 125 верных ответов 
                                        </div>
                                    </div>
                                </Card>
                                <Card className='secondSilver' size="m" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={64} src={ratingUsers[1].photo_max}/>
                                        </div>
                                        <div>
                                            {ratingUsers[1].first_name} {ratingUsers[1].last_name}
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers[1].rating)} 
                                        </div>
                                    </div>
                                </Card>
                                <Card className='thirdBronse' size="m" mode="shadow">
                                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', paddingTop: '1vh', paddingBottom: '1vh' }}>
                                        <div style={{margin: '0 auto'}}>
                                            <Avatar size={64} src={ratingUsers[2].photo_max}/>
                                        </div>
                                        <div>
                                            {ratingUsers[2].first_name} {ratingUsers[2].last_name}
                                        </div>
                                        <div style={{fontSize: '1.1em', fontWeight: 500}}>
                                            {scoreDeclination(ratingUsers[2].rating)} 
                                        </div>
                                    </div>
                                </Card>
                            </CardGrid>
                        </div>
                    }
                    <Separator></Separator>
                    <List>
                        {   
                            ratingUsers.slice(3).map((user, index) => {
                                if (user.id === fetchedUser.id && ratingUsers[ratingUsers.length - 1] === true){
                                    return null
                                }
                                return(
                                    user.id &&
                                    <SimpleCell
                                        disabled
                                        key={index}
                                        before={<Avatar src={user.photo_max}/>}
                                        description={index + 4 + ' место - ' +scoreDeclination(user.rating) + ' рейтинга'}
                                    >
                                        {user.first_name} {user.last_name}
                                    </SimpleCell>
                                )
                            })
                        }
                    </List>
                    {   
                        ratingUsers[ratingUsers.length - 1] === true &&
                        <FixedLayout vertical="bottom">
                            <SimpleCell
                                disabled
                                before={<Avatar src={ratingUsers[ratingUsers.length - 3].photo_max}/>}
                                description={ratingUsers[ratingUsers.length - 2] + ' место - ' + scoreDeclination(ratingUsers[ratingUsers.length - 3].rating) + ' рейтинга'}
                            >
                                {ratingUsers[ratingUsers.length - 3].first_name} {ratingUsers[ratingUsers.length - 3].last_name}                            
                            </SimpleCell>
                        </FixedLayout>
                    }
                </Panel>
            </View>
		);
	}
}

Questions.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Questions;
