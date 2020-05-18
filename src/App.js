import React from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { View, ConfigProvider, Epic, Tabbar, TabbarItem, Panel, PanelHeader, Root, Button, PanelSpinner, ScreenSpinner } from '@vkontakte/vkui';

import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28HistoryBackwardOutline from '@vkontakte/icons/dist/28/history_backward_outline';
import Icon28MenuOutline from '@vkontakte/icons/dist/28/menu_outline';
import Icon28GraphOutline from '@vkontakte/icons/dist/28/graph_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';

import '@vkontakte/vkui/dist/vkui.css';

import Start from "../src/panels/Start"
import More from "../src/panels/More"
import Learn from "../src/panels/Learn"
import LearnGame from "../src/panels/LearnGame"
import LGGame from "./panels/LGGame"
import LGGameEnd from "./panels/LGGameEnd"

import { BACKEND } from './Config';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			scheme: "bright_light",
			mainview: 'emptyview',
			activePanel : 'play',
			activeFeed: 'play',
			activeStory: 'play',
			learnPanel : 'learnpanel',
			epiclock: false,
			authToken : null,
			history : ['st_play'],
			fetchedUser: '',
			res: null,
			response: null,
			gameMode: null,
			lastGameChecked: null,
			gameview: 'lggamepanel',
			questions: null,
			learnLG: null,
		};

		this.onStoryChange = this.onStoryChange.bind(this);
	}

	componentDidMount() {	
		window.addEventListener('popstate', () => this.goBack());
		bridge.send('VKWebAppGetUserInfo');
		bridge.subscribe((e) => {
			if (e.detail.type === 'VKWebAppUpdateConfig')
			{
				this.setState({ scheme: e.detail.data.scheme })
			} else 
			if (e.detail.type === 'VKWebAppGetUserInfoResult') {
				this.setState({ fetchedUser: e.detail.data });
			} else
			if (e.detail.type === 'VKWebAppStorageGetResult') {
				for (let i = 0; i < e.detail.data.keys.length; i++){
					if (e.detail.data.keys[i].key === 'endLearning') {
						if (!e.detail.data.keys[i].value || e.detail.data.keys[i].value === 'false'){
							this.setState({mainview: 'learnview'})
						} else {
							this.setState({mainview: 'epicview'})
						}
					}
					if (e.detail.data.keys[i].key === 'endLGLearning') {
						if (e.detail.data.keys[i].value === false || e.detail.data.keys[i].value === 'false'){
							this.setState({learnLG: false})
						} else {
							this.setState({learnLG: true})
						}
					}
				}
			}
		})
	}

	apitest() {
		console.log(BACKEND + ' api!!')
		axios.get(BACKEND + '/api/test').then(
			response => console.log(response)
		)
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

	go = (e) => {
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

	endLearning() {
		let user = this.state.fetchedUser;
		if (!user.first_name) {
			bridge.send('VKWebAppGetUserInfo');
		}
		bridge.send("VKWebAppStorageSet", {"key": "endLearning", "value": "true"})
		this.setState({mainview: 'epicview'})
		this.setState({epiclock: true})
		axios.post('https://dogeo-backend.herokuapp.com/api/newuser', {user})
		.then(res => {
			this.setState({epiclock: false})
		});
	}

	
	onStoryChange (e) {
		const history = [...this.state.history];
		history.push('st_' + e.currentTarget.dataset.story);
		this.setState({ activeStory: e.currentTarget.dataset.story, history: history })
		window.history.pushState({view: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
	}

	startGame(gameMode){
		if (gameMode === 'LG'){
			this.setState({ mainview: 'emptyview', gameMode: 'LG' })	
			axios.get(BACKEND + '/api/getquestions/7').then(res => {
				this.setState({questions: res.data})
				this.setState({mainview: 'gameview', gameview: 'lggamepanel'})
			})
		}
	}

	endGame(gameMode, verified) {
		if (gameMode === 'LG'){
			this.setState({gameview: 'lggameendpanel', lastGameChecked: verified})
		}
	}
	
	startLearning(gameMode) {
		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', mainview: 'learnview', learnPanel: 'learngame' })	
		}
	}
	
	endGameLearning(gameMode) {
		if (gameMode === 'LG'){
			this.setState({ learnLG: true, mainview: 'epicview' })	
		}
	}

	menuReturn(){
		this.setState({mainview: 'epicview'})
	}

	render() {
		return (
			<ConfigProvider
			isWebView={true}
			scheme={this.state.scheme}
			>
			<Root activeView={this.state.mainview}>
				<View id="emptyview" activePanel="spinnerpanel">
					<Panel id='spinnerpanel'>
						<PanelSpinner />
					</Panel>
				</View>
				<View id="learnview" activePanel={this.state.learnPanel}>
					<Learn
						id="learnpanel"
						scheme={this.state.scheme}
						endLearning={() => this.endLearning()}
					/>
					<LearnGame 
						id="learngame"
						gameMode={this.state.gameMode}
						scheme={this.state.scheme}
						endLearning={this.endGameLearning.bind(this)}
					/>
				</View>
				<View id="epicview" activePanel="epicpanel"
					onSwipeBack={this.goBack}
          history={this.state.history}
					popout={this.state.epiclock ? <ScreenSpinner /> : null}>
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
									selected={this.state.activeStory === 'questions'}
									data-story="questions"
								><Icon28BrainOutline />
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
									startGame={this.startGame.bind(this)}
									startLearning={this.startLearning.bind(this)}
									learnLG={this.state.learnLG}
									/>
							</View>
							<View id="rating" activePanel="ratingpanel">
								<Panel id="ratingpanel">
									<PanelHeader>Рейтинг</PanelHeader>
								</Panel>
							</View>
							<View id="questions" activePanel="questionspanel">
								<Panel id="questionspanel">
									<PanelHeader>Вопросы</PanelHeader>
								</Panel>
							</View>
							<View id="history" activePanel="historypanel">
								<Panel id="historypanel">
									<PanelHeader>История</PanelHeader>
									<Button onClick={() => {
										bridge.send("VKWebAppStorageSet", {"key": "endLearning", "value": 'false'})
										bridge.send("VKWebAppStorageSet", {"key": "endLGLearning", "value": 'false'})
										}}>btn</Button>
									<Button onClick={() => this.apitest()}>btn</Button>
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
				<View id='gameview' activePanel={this.state.gameview}>
					<LGGame
						id='lggamepanel'
						lastGame={this.state.lastGame}
						endGame={this.endGame.bind(this)}
						questions={this.state.questions}
						/>
					<LGGameEnd
						id='lggameendpanel'
						lastGame={this.state.lastGameChecked}
						menuReturn={this.menuReturn.bind(this)}
						user={this.state.fetchedUser}
						questions={this.state.questions}
						/>
				</View>
			</Root>
				
			</ConfigProvider>
		);
	}
}

export default App;
