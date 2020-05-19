import React from 'react';
// import PropTypes from 'prop-types';
import { Panel, PanelHeader, Button, Placeholder, Separator } from '@vkontakte/vkui';
import Icon44CoinsOutline from '@vkontakte/icons/dist/44/coins_outline';
import Icon56HideOutline from '@vkontakte/icons/dist/56/hide_outline';


class LGGameStart extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            slideIndex: 0,
            imageHeight : 350,
        }
    }
  

  handler(e) {
    if (e.currentTarget.dataset.play === 'rating'){
        this.props.startGame('LG', true)
    } else {
        this.props.startGame('LG', false)
    }
  }

	render() {
        let {id, allowRating, beforeRating} = this.props
        
        return (
            <Panel id={id}>
                <PanelHeader>Больше - меньше</PanelHeader>
                <Placeholder
                    icon={<Icon44CoinsOutline fill='var(--purple-dark)' width={56} height={56} />}
                    header="Играть с рейтингом"
                    action={
                        allowRating
                        ? <Button className='buttonPurple' data-play='rating' size="l" style={{width: '60vw'}} onClick={this.handler.bind(this)}>Играть!</Button>
                        : <Button disabled size="l" style={{width: '60vw', background: "linear-gradient(135deg, #bdc3c7, 50%, #2c3e50)"}}>Играть!</Button>
                    }
                >
                    Очки будут засчитаны и учтены в таблице рейтинга{<br/>}Рейтинговая игра будет доступна через {Math.round(beforeRating / 60)} часов
                </Placeholder>
                <Separator wide />
                <Placeholder
                    icon={<Icon56HideOutline fill='var(--purple-dark)'/>}
                    header="Играть без рейтинга"
                    action={<Button className='buttonPurple' date-play='norating' size="l" style={{width: '60vw'}} onClick={this.handler.bind(this)}>Играть!</Button>}
                >
                    Изучайте факты в свое удовольствие!
                </Placeholder>

            </Panel>
        );
        }
}

LGGameStart.propTypes = {
  // TODO: Проставить типы
};

export default LGGameStart;
