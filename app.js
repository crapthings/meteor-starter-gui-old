import nedb from 'nedb'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

let db = {}
db.projects = new nedb({ filename: `${__dirname}/projects`, autoload: true })

db.projects.remove({}, { multi: true })

class Layout extends Component {
	render () {
		return <div>
			<ul>
				<li>
					<Link to="/">home</Link>
				</li>
				<li>
					<Link to="about">About</Link>
				</li>
			</ul>
			{this.props.children}
		</div>
	}
}

const App = () => <Router history={hashHistory}>
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="about" component={About} />
	</Route>
</Router>

class Home extends Component {
	render () {
		return (
			<div>
				<CreateProject />
			</div>
		)
	}
}

const About = () => <div>
	<h1>about</h1>
</div>

class CreateProject extends Component {
	submit (e) {
		e.preventDefault()
		let data = form2js(e.currentTarget.id)
		db.projects.insert(data)
		db.projects.find({}, function (err, results) {
			console.log(results)
		})
	}

	render () {
		return (
			<form id="project-form" onSubmit={this.submit}>
				<input type="text" name="name" />
				<input type="submit" />
			</form>
		)
	}
}

module.exports = (function () {
	ReactDOM.render(<App />, document.getElementById('app'))
})()
