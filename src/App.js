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
import Statistics from "./panels/Statistics"
import AddQuestion from "./panels/AddQuestion"

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
			morepanel: "morepanel",
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
			questionsFeed: [],
			loadingQuestions: true,
			questionsPanel: 'questionspanel',
			loadingRating: true,
			ratingUsers: [],
			sendRating: false,
			lockGameEnd: false,
			allowRating: null,
			ratingGame: false,
			beforeRating: null,
			searchTags: [],
			searchMode: 0, //1 - include 0 - exclude
			freePlayTags: [],
			freePlayMode: 0,
			freePlayCount: 7,
			userStatistics: null,
			LGSearchTags: null,
		};

		this.onStoryChange = this.onStoryChange.bind(this);
		this.changeMode = this.changeMode.bind(this);
		this.changeTags = this.changeTags.bind(this);
		
		this.checkServer()
		setInterval(() => this.checkServer(), 30000)
		this.getRatingPlayAccess()
		this.getUserStatistics()
		this.getLGSearchTags()
	}

	UNSAFE_componentWillMount() {
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
		if (this.state.LGsearchTags !== null && this.state.fetchedUser !== ''){
			this.setState({epiclock: false})
		}
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
				if (activeElement === 'st_more'){
					this.setState({morepanel: 'morepanel'})
				}
			}
			if (activeElement.slice(0, 2) === 'pa') {
				if (activeElement === 'pa_lggameendpanel') {
					this.setState({mainview: 'gameview', gamepanel: 'lggameendpanel'})
				}
				if (activeElement === 'pa_searchpanel'){
					this.setState({mainview: 'epicview', activeStory: 'questions'})
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

	onStoryChange (e) {
		const history = [...this.state.history];
		history.push('st_' + e.currentTarget.dataset.story);
		this.setState({ activeStory: e.currentTarget.dataset.story, history: history })
		window.history.pushState({view: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
	}

	checkServer(){
		axios.post(BACKEND + '/api/v1/test_api')
		.then(() => {this.setState({serverError: false})})
		.catch(() => {this.setState({serverError: true})})
	}

	endLearning() {
		let user = this.state.fetchedUser;
		if (!user.first_name) {
			bridge.send('VKWebAppGetUserInfo');
		}
		bridge.send("VKWebAppStorageSet", {"key": "endLearning", "value": "true"})
		this.setState({mainview: 'epicview', epiclock: true})
		axios.post(BACKEND + '/api/v1/new_user', user)
		.then(() => {
			this.setState({epiclock: false})
		})
		.catch(() => {this.setState({serverError: true})});
	}

	prepareGame(gameMode){
		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', mainview: 'gameview', gamepanel: 'lggamestartpanel' })
			this.getRatingPlayAccess(gameMode)
		}
	}
	
	startGameLearning(gameMode) {
		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', mainview: 'learnview', learnPanel: 'learngame' })

		}
	}
	
	endGameLearning(gameMode) {
		if (gameMode === 'LG'){
			this.setState({ learnLG: true, mainview: 'epicview' })	
		}
	}

	startGame(gameMode, rating){
		if (rating === true){
			this.setState({ratingGame: true})
		} else {
			this.setState({ratingGame: false})
		}

		if (gameMode === 'LG'){
			this.setState({ gameMode: 'LG', ratingGame: rating })	
			let settings = {
				current_user_id: this.state.fetchedUser.id,
				count: rating ? 7 : this.state.freePlayCount,
				rating_game: this.state.ratingGame,
				freePlayTags: this.state.freePlayTags,
				freePlayMode: this.state.freePlayMode
			}
			axios.post(BACKEND + '/api/v1/get_lg_questions', settings)
			.then(res => {
				this.setState({questions: res.data, mainview: 'gameview', gamepanel: 'lggamepanel'})
			})
			.catch(() => {this.setState({serverError: true})})
		}
	}

	viewGameStat(){
		this.setState({gamepanel: 'lastgamestat'})
	}
	
	menuReturn(){
		this.setState({ mainview: 'epicview', history : ['st_play'] })
	}

	getFeedQuestions(){
		this.setState({loadingQuestions: true})
		let settings = {
			offset: 0,
			search_tags: this.state.searchTags,
			search_mode: this.state.searchMode
		}
        axios.post(BACKEND + '/api/v1/get_feed_questions', settings)
        .then(res =>{
            this.setState({questionsFeed: res.data, loadingQuestions: false})
        })
    }

    addFeedQuestions(){
		this.setState({loadingQuestions: true})
		let settings = {
			offset: this.state.questionsFeed.length,
			search_tags: this.state.searchTags,
			search_mode: this.state.searchMode
		}
        axios.post(BACKEND + '/api/v1/get_feed_questions', settings)
        .then(res =>{
            let newQuestions = this.state.questionsFeed
            res.data.forEach(element => {
                newQuestions.push(element)
			});
            this.setState({questionsFeed: newQuestions, loadingQuestions: false})
        })
	}

	getLGSearchTags(){
		axios.post(BACKEND + '/api/v1/get_lg_search_tags')
		.then(res => {
			this.setState({LGSearchTags: res.data.tags})
		})
	}

	openSearch(){
		this.getLGSearchTags()
		this.setState({questionsPanel: 'searchpanel'})
		const history = [...this.state.history];
		history.push('pa_searchpanel');
		this.setState({ activeStory: 'questions', history: history })
		window.history.pushState({view: 'searchpanel'}, 'searchpanel');
	}

	getGlobalRating(){
		this.setState({epiclock: true})
		axios.post(BACKEND + '/api/v1/get_global_rating', {user_id: this.state.fetchedUser.id})
		.then(res => {
			this.setState({ratingUsers: res.data, epiclock: false})
		})
	}
	
	getRatingPlayAccess(gameMode){
		axios.post(BACKEND + '/api/v1/rating_play_access', {user_id: this.state.fetchedUser.id, game_mode: gameMode}).then(res => {
			this.setState({allowRating: res.data})
		})
	}
	
	sendResult(lastGameAnswers){
		if (this.state.gameMode === 'LG'){
			this.setState({sendRating: true, lockGameEnd: true, gamepanel: 'lggameendpanel'})
			let data = {
				user_id: this.state.fetchedUser.id,
				rating_play: this.state.ratingGame,
				mode: this.state.gameMode,
				date: new Date(),
				answers: lastGameAnswers,
				questions: this.state.questions
			}
			axios.post(BACKEND + '/api/v1/end_game', data)
			.then(res => {
				this.setState({lockGameEnd: false, lastGameChecked: res.data})
				this.state.history.push('pa_lggameendpanel');
				window.history.pushState({view: 'lggameendpanel'}, 'lggameendpanel');
			})
		}
	}

	getUserStatistics(){
		this.setState({epiclock: true})
		axios.post(BACKEND + '/api/v1/get_user_stat', {user_id: this.state.fetchedUser.id})
		.then(res => {
			this.setState({userStatistics: res.data, epiclock: false})
		})
	}

	addQuestion(){
		this.setState({morepanel: 'addpanel'})
		const history = [...this.state.history];
		history.push('pa_questionadd');
		this.setState({ history: history })
		window.history.pushState({view: 'pa_questionadd'}, 'pa_questionadd');
	}

	showSnackbar() {
		this.setState({snackbar: true})
		setTimeout(() => {this.setState({snackbar: true})}, 3000)
	}

	saveSearch() {
		this.goBack()
		this.getFeedQuestions()
	}

	changeMode(e) {
		this.setState({searchMode: parseInt(e.currentTarget.value)})
		let st = this.state.searchTags
		if (e.currentTarget.value === "1"){
			for (let i = 0; i < this.state.LGSearchTags.length; i++){
				if (this.state.searchTags.indexOf(this.state.LGSearchTags[i]) !== -1){
					st.splice(this.state.searchTags.indexOf(this.state.LGSearchTags[i]), 1)
				} else {
					st.push(this.state.LGSearchTags[i])
				}
			}
		} else {
			for (let i = 0; i < this.state.LGSearchTags.length; i++){
				if (this.state.searchTags.indexOf(this.state.LGSearchTags[i]) !== -1){
					st.splice(this.state.searchTags.indexOf(this.state.LGSearchTags[i]), 1)
				} else {
					st.push(this.state.LGSearchTags[i])
				}
			}
		}
		this.setState({searchTags: st})
	}

	changeTags(e) {
		let st = this.state.searchTags
		let tag = e.currentTarget.value
		if (st.indexOf(tag) !== -1){
			st.splice(this.state.searchTags.indexOf(tag), 1)
		} else {
			st.push(tag)
		}
		this.setState({searchTags: st})
	}

	render() {
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
										selected={this.state.activeStory === 'statistics'}
										data-story="statistics"
									><Icon28HistoryBackwardOutline />
									</TabbarItem>
									<TabbarItem
										onClick={this.onStoryChange}
										selected={this.state.activeStory === 'more'}
										data-story="more"
									><Icon28MenuOutline />
									</TabbarItem>
								</Tabbar>
								}
							>
								<View id="play" activePanel="playpanel">
									<Start
										id="playpanel"
										scheme={this.state.scheme}
										startGame={this.prepareGame.bind(this)}
										startLearning={this.startGameLearning.bind(this)}
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
										questionsList={this.state.questionsFeed}
										getFirstQuestions={() => this.getFeedQuestions()}
										addQuestions={() => this.addFeedQuestions()}
										loadingQuestions={this.state.loadingQuestions}
										questionsPanel={this.state.questionsPanel}
										openSearch={() => this.openSearch()}
										searchMode={this.state.searchMode}
										searchTags={this.state.searchTags}
										setSearchSettings={() => this.setSearchSettings()}
										LGsearchTags={this.state.LGSearchTags}
										changeMode={this.changeMode}
										changeTags={this.changeTags}
										saveSearch={() => this.saveSearch()}
									/>
								</View>
								<View id="statistics" activePanel="statisticspanel">
									<Statistics
										id='statisticspanel'
										user={this.state.fetchedUser}
										user_stat={this.state.userStatistics}
										get_stat={() => this.getUserStatistics()}
									/>
								</View>
								<View id="more" activePanel={this.state.morepanel}>
									<More
										id='morepanel'
										themeUpdate={() => this.updateTheme()}
										scheme={this.state.scheme}
										user={this.state.fetchedUser}
										addQuestion={() => this.addQuestion()}
										snackbar={this.state.snackbar}
									/>
									<AddQuestion
										id='addpanel'
										sendQuestion={this.sendQuestion}
										user={this.state.fetchedUser}
										goBack={() => this.goBack()}
										showSnackbar={() => this.showSnackbar()}
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
						allowRating={this.state.allowRating}
						beforeRating={this.state.beforeRating}
						startGame={this.startGame.bind(this)}
					/>
					<LGGame
						id='lggamepanel'
						questions={this.state.questions}
						generatedQuestions={this.state.generatedQuestions}
						sendResult={this.sendResult.bind(this)}
					/>
					<LGGameEnd
						id='lggameendpanel'
						lastGame={this.state.lastGameChecked}
						history={this.state.history}
						menuReturn={this.menuReturn.bind(this)}
						viewGameStat={this.viewGameStat.bind(this)}
						lockGameEnd={this.state.lockGameEnd}
						ratingGame={this.state.ratingGame}
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
