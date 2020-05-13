import React from 'react';
import PropTypes from 'prop-types';
import { Button, Group, Card, CardGrid } from '@vkontakte/vkui';


class StartCard extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350
        }
    }
    
	render() {
        let {title, description} = this.props

		return (
        <Group separator="hide">
          <CardGrid>
            <Card size="l" mode="shadow" style={{paddingBottom: '5%', paddingTop: "5%", fontFamily: "Montserrat"}}>
              <div style={{textAlign: "center", fontFamily: "Montserrat", paddingBottom: "5%", fontSize:'4.3vw'}}>
                {title}
              </div>
              <div style={{paddingLeft: "10%", paddingRight:"10%", paddingBottom: "5%", textAlign: "center"}}>
                <div>
                  {description.split('|')[0]}
                </div>
                <div>
                  {description.split('|')[1]}
                </div>
              </div>
              <div>
                <Button stretched size='l' style={{width: "80%", position: "relative", left: "10%",  background: "linear-gradient(135deg, #f53f8e, 50%, #f5226f)"}}>
                  Играть
                </Button>
              </div>
            </Card>
          </CardGrid>
        </Group>
		);
	}
}

StartCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StartCard;
