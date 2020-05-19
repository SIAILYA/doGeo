import React from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { View, ConfigProvider, Epic, Tabbar, TabbarItem, Panel, PanelHeader, Root, Button, PanelSpinner, ScreenSpinner, Placeholder } from '@vkontakte/vkui';

import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28HistoryBackwardOutline from '@vkontakte/icons/dist/28/history_backward_outline';
import Icon28MenuOutline from '@vkontakte/icons/dist/28/menu_outline';
import Icon28GraphOutline from '@vkontakte/icons/dist/28/graph_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

import '@vkontakte/vkui/dist/vkui.css';

import Start from "../src/panels/Start"
import More from "../src/panels/More"
import Learn from "../src/panels/Learn"
import LearnGame from "../src/panels/LearnGame"
import LGGame from "./panels/LGGame"
import LGGameEnd from "./panels/LGGameEnd"
import GameStat from "./panels/GameStat"
import Questions from "./panels/Questions"
import Rating from "./panels/Rating"

import { BACKEND } from './Config';
import LGGameStart from './panels/LGGameStart';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			serverError: null,
			scheme: "bright_light",
			mainview: 'epicview',
			activePanel : 'play',
			activeFeed: 'play',
			activeStory: 'play',
			learnPanel : 'learnpanel',
			epiclock: true,
			authToken : null,
			history : ['st_play'],
			fetchedUser: '',
			res: null,
			response: null,
			gameMode: null,
			lastGameChecked: [],
			gamepanel: 'lggamestartpanel',
			questions: [],
			generatedQuestions: [],
			learnLG: null,
			questionsList: [],
			loadingQuestions: true,
			questionsPanel: 'questionspanel',
			loadingRating: true,
			ratingUsers: [],
			sendRating: false,
			lockGameEnd: false,
			gameInfo: null,
			allowRating: null,
			ratingGame: false,
			beforeRating: null,
		};

		this.onStoryChange = this.onStoryChange.bind(this);

		setInterval(() => this.checkServer(), 15000)
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
							this.setState({mainview: 'epicview', epiclock: false})
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
				if (activeElement === 'st_questions'){
					this.setState({questionsPanel: 'questionspanel'})
				}
			}
			if (activeElement.slice(0, 2) === 'pa') {
				if (activeElement === 'pa_lggameendpanel') {
					this.setState({mainview: 'gameview', gamepanel: 'lggameendpanel'})
				}
			}
			if (activeElement.slice(0, 2) === 'vi') {
				if (activeElement === 'vi_gameview') {
					this.setState({mainview: 'epicview', gamepanel: 'lggamepanel'})
				}
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
		axios.post(BACKEND + '/api/newuser', {user})
		.then(res => {
			this.setState({epiclock: false})
		})
		.catch(err => {this.setState({serverError: true})});
	}

	
	onStoryChange (e) {
		const history = [...this.state.history];
		history.push('st_' + e.currentTarget.dataset.story);
		this.setState({ activeStory: e.currentTarget.dataset.story, history: history })
		window.history.pushState({view: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
	}

	startGame(gameMode, rating){
		if (rating === true){
			this.setState({ratingGame: true})
		} else {
			this.setState({ratingGame: false})
		}

		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', ratingGame: rating })	
			axios.get(BACKEND + '/api/getquestions/7')
			.then(res => {
				this.setState({questions: res.data})
				this.setState({mainview: 'gameview', gamepanel: 'lggamepanel'})
			})
			.catch(err => {this.setState({serverError: true})})
		}
	}

	prepareGame(gameMode){
		this.getGameInfo()
		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', mainview: 'gameview', gamepanel: 'lggamestartpanel' })
		}
	}

	endGame(gameMode, verified) {
		if (gameMode === 'LG'){
			this.setState({gamepanel: 'lggameendpanel', lastGameChecked: verified})
		}
	}

	viewGameStat(){
		this.setState({gamepanel: 'lastgamestat'})
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
		this.setState({ mainview: 'epicview', history : ['st_play'] })
	}

	checkServer(){
		axios.get(BACKEND + '/api/test')
		.then(response => {this.setState({serverError: false})})
		.catch(err => {this.setState({serverError: true})})
	}

	getFirstQuestions(){
        axios.get(BACKEND + '/api/getquestionslg/' + this.state.questionsList.length + '/10')
        .then(res =>{
            this.setState({questionsList: res.data, loadingQuestions: false})

        })
        .catch(error =>{
            this.setState({serverError: true})
        })
    }


    addQuestions(){
        this.setState({loadingQuestions: true})
        axios.get(BACKEND + '/api/getquestionslg/' + this.state.questionsList.length + '/10')
        .then(res =>{
            let newQuestions = this.state.questionsList
            res.data.forEach(element => {
                newQuestions.push(element)
            });
            this.setState({questionsList: newQuestions, loadingQuestions: false})
        })
        .catch(error =>{
            this.setState({serverError: true, loadingQuestions: false})
            return null;
        })
	}


	openSearch(){
		this.setState({questionsPanel: 'searchpanel'})
		const history = [...this.state.history];
		history.push('pa_searchpanel');
		this.setState({ activeStory: 'questions', history: history })
		window.history.pushState({view: 'searchpanel'}, 'searchpanel');
	}

	getGlobalRating(){
		axios.get(BACKEND + '/api/getglobalrating/' + this.state.fetchedUser.id)
		.then(res => {
			this.setState({ratingUsers: res.data, loadingRating: false})
		})
	}

	getGameInfo(){
		axios.get(BACKEND + '/api/getgamehistory/' + this.state.fetchedUser.id)
		.then(res => {
			this.setState({gameInfo: res.data})
			if (res.data.gametimes.length === 5){
				let now = new Date()
				this.setState({allowRating: false, beforeRating: Math.abs(new Date(new Date(res.data.gametimes[0]).getTime() + 24*60*60*1000) - now) / (1000 * 60)})
			} else {
				this.setState({allowRating: 5 - res.data.gametimes.length})
			}
		})
	}

	
	sendResult(ratingShift, user, lastGame, questions){
		if (this.state.ratingGame){
			this.setState({sendRating: true})
			let now = new Date();
			let data = {
			  "user_id": user.id,
			  "rating_shift": ratingShift,
			  "game_data": {'date': now, 'answers': lastGame, 'questions': questions}
			}
			this.setState({lockGameEnd: true})
			axios.post(BACKEND + '/api/increacerating', data)
			.then(() => {
			  this.setState({lockGameEnd: false})
			})
		}
	  }

	render() {
		if (this.state.gameInfo === null && this.state.fetchedUser.id){
			this.getGameInfo()
		}

		return (
			<ConfigProvider
			isWebView={true}
			scheme={this.state.scheme}
			>
			{
				this.state.serverError === null || this.state.serverError === false
				? 
				<Root activeView={this.state.mainview}>
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
									startGame={this.prepareGame.bind(this)}
									startLearning={this.startLearning.bind(this)}
									learnLG={this.state.learnLG}
									history={this.state.history}
									/>
							</View>
							<View id="rating" activePanel="ratingview">
								<Rating
									id='ratingview'
									loadingRating={this.state.loadingRating}
									ratingUsers={this.state.ratingUsers}
									loadRating={() => this.getGlobalRating()}
									fetchedUser={this.state.fetchedUser}
								/>
							</View>
							<View id="questions" activePanel="questionsview">
								<Questions 
									id='questionsview'
									history={this.state.history}
									questionsList={this.state.questionsList}
									getFirstQuestions={() => this.getFirstQuestions()}
									addQuestions={() => this.addQuestions()}
									loadingQuestions={this.state.loadingQuestions}
									questionsPanel={this.state.questionsPanel}
									openSearch={() => this.openSearch()}
								/>
							</View>
							<View id="history" activePanel="historypanel">
								<Panel id="historypanel">
									<PanelHeader>История</PanelHeader>
									<Placeholder icon={<Icon56RecentOutline />} header="Раздел уже в работе!"></Placeholder>
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
				<View id='gameview' activePanel={this.state.gamepanel}>
					<LGGameStart
						id='lggamestartpanel'
						gameInfo={this.state.gameInfo}
						allowRating={this.state.allowRating}
						beforeRating={this.state.beforeRating}
						history={this.state.history}
						startGame={this.startGame.bind(this)}
					/>
					<LGGame
						id='lggamepanel'
						lastGame={this.state.lastGame}
						endGame={this.endGame.bind(this)}
						history={this.state.history}
						questions={this.state.questions}
						generatedQuestions={this.state.generatedQuestions}
					/>
					<LGGameEnd
						id='lggameendpanel'
						lastGame={this.state.lastGameChecked}
						user={this.state.fetchedUser}
						history={this.state.history}
						questions={this.state.questions}
						generatedQuestions={this.state.generatedQuestions}
						menuReturn={this.menuReturn.bind(this)}
						viewGameStat={this.viewGameStat.bind(this)}
						sendResult={this.sendResult.bind(this)}
						lockGameEnd={this.state.lockGameEnd}
						sendRating={this.state.sendRating}
					/>
					<GameStat
						id='lastgamestat'
						lastGame={this.state.lastGameChecked}
						questions={this.state.questions}
						generatedQuestions={this.state.generatedQuestions}
						menuReturn={this.menuReturn.bind(this)}
					/>
				</View>
				</Root>
				:
				<View>
					<Panel>
						<PanelHeader>Ошибка загрузки</PanelHeader>
						<Placeholder
							icon={<Icon56DoNotDisturbOutline />}
							header="Сервер недоступен, либо недоступно Ваше интернет-подключение :("
							action={<Button size='xl' className='buttonPurple' onClick={() => this.checkServer()}>Попробовать еще раз</Button>}
						>
						</Placeholder>
					</Panel>
				</View>
			}
			
			</ConfigProvider>
		);
	}
}

export default App;
