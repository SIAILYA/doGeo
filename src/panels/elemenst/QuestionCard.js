import React from 'react';
import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid } from '@vkontakte/vkui';



class QuestionCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let {number, total, mode, } = this.props

		return (
        <Group separator="hide">
          <CardGrid>
            <Card size="l" mode="shadow" style={{paddingBottom: '5%', paddingTop: "5%", fontFamily: "Montserrat", height: "70vh"}}>
              Sit irure ut minim exercitation.
            </Card>
          </CardGrid>
        </Group>
		);
	}
}

QuestionCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default QuestionCard;
