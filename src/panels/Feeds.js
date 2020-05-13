import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Cell, List, PanelHeader, Group, Div, Header, CardGrid, Card, Button } from '@vkontakte/vkui';
import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon20LikeOutline from '@vkontakte/icons/dist/20/like_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';

class Feeds extends React.Component {
	render() {
		let { 
			id, poems 
		} = this.props

		return (
			<Panel id={id}>
				<PanelHeader>Лента</PanelHeader>
				<Group>
					<List>
						{	poems.map((poem, index) => (
								<CardGrid
								key={index.toString()}>
									<Card
									size="l"
									mode="shadow">
										<Header>
											{poem.title} 
										</Header>
										<Cell 
											key={index}
											data-to="poem" 
											onClick={(e) => this.props.go(e, { poemId : poem.id })}
										>
											{poem.text.split("\n").slice(0, 4).map((string, i, arr) => {
												if (i === 0){
													return(
														<Div
														style={{paddingTop: 5, paddingBottom: 0, paddingLeft: 0}}
														key={i.toString()}
														>
														
															{string}
														</Div>
													);
												} else if (i !== (arr.length - 1)){
													return(
														<Div style={{paddingTop: 5, paddingBottom: 0, paddingLeft: 0}}>
															{string}
														</Div>
													);
												} else {
													return(
														<Div style={{paddingTop: 5, paddingBottom: 0, paddingLeft: 0}}>
															{string}
														</Div>
													);
												}
											})}
											<Div style={{textAlign: "right", fontStyle: "italic", paddingBottom: 5}}>
												{poem.author}
											</Div>
										</Cell>
										<Div style={{display: "flex", paddingTop: 0, paddingBottom: 0}}>
											{poem.tags.map((theme, i) => {
												return (
													<Button
													mode="secondary"
													style={{fontSize: 10, marginRight: 5}}>
														{theme}
													</Button>
												);
											})}
										</Div>
										<Div style={{display: "flex", paddingTop: 0, paddingBottom: 0, justifyContent: "space-between"}}>
											<Div style={{display: "flex", paddingLeft: 0}}>
												<Button
												mode="outline"
												data-to="poem"
												onClick={(e) => {this.props.go(e, { poemId : poem.id })}}
												>
													Читать
												</Button>
											</Div>
											<Div style={{display: "flex", paddingRight: 0}}>
												<Button
												mode="outline"
												style={{ color: "#ff3347", borderColor: "#ff3347", marginRight: 5}}
												>
													<Icon20LikeOutline width={24} />
												</Button>
											</Div>
										</Div>
									</Card>
								</CardGrid>
							))
						}
					</List>
				</Group>
			</Panel>
		);
	}
}

Feeds.propTypes = {
	id: PropTypes.string.isRequired
};

export default Feeds;
