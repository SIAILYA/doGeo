import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ConfigProvider, Epic, Tabbar, TabbarItem, Panel, PanelHeader, List, Root, Button } from '@vkontakte/vkui';

import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28MessageOutline from '@vkontakte/icons/dist/28/message_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28ListOutline from '@vkontakte/icons/dist/28/list_outline';
import Icon28HistoryBackwardOutline from '@vkontakte/icons/dist/28/history_backward_outline';
import Icon28MenuOutline from '@vkontakte/icons/dist/28/menu_outline';
import Icon28GraphOutline from '@vkontakte/icons/dist/28/graph_outline';

import '@vkontakte/vkui/dist/vkui.css';

import Start from "../src/panels/Start"
import More from "../src/panels/More"


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			scheme: "bright_light",
			soft_colors: false,
			mainview: 'epicview',
			activePanel : 'play',
			activeFeed: 'play',
			activeStory: 'play',
			authToken : null,
			history : ['st_play'],
			fetchedUser: '',
			res: null,
		};

		this.onStoryChange = this.onStoryChange.bind(this);
	}

	componentWillMount() {	
		window.addEventListener('popstate', () => this.goBack());
		bridge.send('VKWebAppGetUserInfo');
		bridge.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppUpdateConfig':
					this.setState({ scheme: e.detail.data.scheme });
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
				default:

			}
		});
		fetch("http://tasty-crab-17.serverless.social/api/rating")
      .then(res => console.log());
	}

	updateTheme() {
		if(this.state.scheme === "bright_light" || this.state.scheme === "client_light" ) {
			this.setState({scheme: 'space_gray'});
			bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#000"});
		} else if(this.state.scheme === "space_gray" || this.state.scheme === "client_dark"){
			this.setState({scheme: 'bright_light'}); 
			bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#fff"}); 
		}
 }

	go = (e, object) => {
		let activeElement = e.currentTarget.dataset.to
		const history = [...this.state.history];
		history.push(activeElement);

		window.history.pushState({view: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
	}

	goBack = () => {
		const history = [...this.state.history];
		if(history.length === 1) {
			bridge.send("VKWebAppClose", {"status": "success"}); 
		} else if (history.length > 1) {
			history.pop();
			const activeElement = history[history.length - 1];
			if (activeElement.slice(0, 2) === 'st') { // Меняем mainview на epic, activestory на activeElement
				this.setState({mainview: 'epicview', activeStory: activeElement.slice(3)})
			}
			this.setState({ history: history });
		}
	}

	onStoryChange (e) {
		const history = [...this.state.history];
		history.push('st_' + e.currentTarget.dataset.story);
		this.setState({ activeStory: e.currentTarget.dataset.story, history: history })
		window.history.pushState({view: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
		bridge.send('VKWebAppGetUserInfo');
	}

	render() {
		return (
			<ConfigProvider
			isWebView={true}
			scheme={this.state.scheme}
			>
			<Root activeView={this.state.mainview}>
				<View
					id="epicview"
					activePanel="epicpanel"
					onSwipeBack={this.goBack}
          history={this.state.history}>
					<Panel id="epicpanel">
						<Epic
							activeStory={this.state.activeStory}
							tabbar={
							<Tabbar>
								<TabbarItem
									onClick={this.onStoryChange}
									selected={this.state.activeStory === 'play'}
									data-story="play"
								><Icon28Play />
								</TabbarItem>
								<TabbarItem
									onClick={this.onStoryChange}
									selected={this.state.activeStory === 'rating'}
									data-story="rating"
								><Icon28GraphOutline />
								</TabbarItem>
								<TabbarItem
									onClick={this.onStoryChange}
									selected={this.state.activeStory === 'history'}
									data-story="history"
								><Icon28HistoryBackwardOutline />
								</TabbarItem>
								<TabbarItem
									onClick={this.onStoryChange}
									selected={this.state.activeStory === 'more'}
									data-story="more"
								><Icon28MenuOutline />
								</TabbarItem>
							</Tabbar>
						}>
							<View id="play" activePanel="playpanel">
								<Start
									id="playpanel"
									scheme={this.state.scheme}
									/>
							</View>
							<View id="rating" activePanel="ratingpanel">
								<Panel id="ratingpanel">
									<PanelHeader>Рейтинг</PanelHeader>
								</Panel>
							</View>
							<View id="history" activePanel="historypanel">
								<Panel id="historypanel">
									<PanelHeader>История</PanelHeader>
									<Button onClick={() => this.updateTheme()}>Тема</Button>
								</Panel>
							</View>
							<View id="more" activePanel="morepanel">
								<More
									id='morepanel'
									themeUpdate={() => this.updateTheme()}
									scheme={this.state.scheme}
									user={this.state.fetchedUser}
									/>
							</View>
					</Epic>
					</Panel>
				</View>
				<View id='gameview'>
					
				</View>
				<View id="learnview">

				</View>
			</Root>
				
			</ConfigProvider>
		);
	}
}

export default App;
