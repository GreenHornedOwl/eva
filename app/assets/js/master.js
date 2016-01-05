
var Navigation = React.createClass({
	displayName: 'Navigation',

	getInitialState: function () {
		return {
			data: []
		};
	},
	componentDidMount: function () {
		$.getJSON(this.props.source, (function (result) {
			if (this.isMounted()) {
				this.setState({
					data: result[this.props.target]
				});
			}
		}).bind(this));
	},
	eachItem: function (item, i) {
		return React.createElement(
			'li',
			{ key: i,
				index: i,
				className: i === this.props.active - 1 ? 'dropdown active' : 'dropdown'
			},
			React.createElement(
				'a',
				{ href: item.url },
				item.name
			)
		);
	},
	render: function () {
		return React.createElement(
			'ul',
			null,
			this.state.data.map(this.eachItem)
		);
	}
});
var NewsletterBlock = React.createClass({
	displayName: 'NewsletterBlock',

	render: function () {
		return React.createElement(
			'div',
			{ className: this.props.className },
			React.createElement(
				'div',
				{ className: 'item-newsletter' },
				React.createElement(
					'div',
					{ className: 'newsletter' },
					React.createElement(
						'p',
						null,
						'Stay in touch with our newest collections'
					),
					React.createElement('input', { type: 'email', placeholder: 'Enter your email address.' }),
					React.createElement(
						'button',
						{ type: 'button' },
						'Subscribe to Newsletter'
					)
				)
			)
		);
	}
});

var Banner = React.createClass({
	displayName: 'Banner',

	getInitialState: function () {
		return {
			imageSrc: "",
			title: "Placeholder Title",
			url: "",
			newItem: true,
			data: [{
				"title": "Half",
				"src": "assets/img/eva-banner-wide-1.jpg",
				"url": "#"
			}, {
				"title": "Half",
				"src": "assets/img/eva-banner-wide-2.jpg",
				"url": "#"
			}]
		};
	},
	remove: function () {
		this.props.onRemove(this.props.index);
	},
	eachItem: function (item, i) {
		return React.createElement(
			'button',
			{ key: i, className: 'col-xs-2' },
			React.createElement('img', { index: i, src: item.src, title: item.title })
		);
	},
	renderDisplay: function () {
		return React.createElement(
			'a',
			{ href: this.props.url },
			React.createElement('img', { src: this.props.imageSrc, title: this.props.title })
		);
	},
	renderConfig: function () {
		return React.createElement(
			'div',
			{ className: 'editing-banner' },
			React.createElement(
				'a',
				{ href: this.props.url },
				React.createElement('img', { src: this.props.imageSrc, title: this.props.title })
			),
			React.createElement(
				'button',
				{ type: 'button', className: 'delete-banner', onClick: this.remove },
				React.createElement('i', { className: 'fa fa-trash-o' })
			)
		);
	},
	renderNewItem: function () {
		return React.createElement(
			'div',
			{ className: 'editing-banner' },
			React.createElement(
				'a',
				{ href: this.props.url },
				React.createElement('img', { src: this.props.imageSrc, title: this.props.title })
			),
			React.createElement(
				'button',
				{ type: 'button', className: 'delete-banner', onClick: this.remove },
				React.createElement('i', { className: 'fa fa-trash-o' })
			),
			this.state.data.map(this.eachItem)
		);
	},
	render: function () {
		if (this.props.newItem) {
			return this.renderNewItem();
		}
		if (this.props.editing === true) {
			return this.renderConfig();
		} else {
			return this.renderDisplay();
		}
	}
});
var GenerateRow = React.createClass({
	displayName: 'GenerateRow',

	getInitialState: function () {
		return {
			data: [],
			fluid: false,
			columnNumber: 3,
			editing: false
		};
	},
	componentDidMount: function () {
		this.setState({ columnNumber: this.props.columns === "" ? this.state.columnNumber : this.props.columns });
		this.setState({ editing: this.props.editing === "" ? this.state.editing : this.props.editing });
		this.setState({ data: this.props.source });
	},
	containerClass: function () {
		if (this.state.fluid === true) {
			return "container-fluid";
		} else {
			return "container";
		}
	},
	handleColumnNumber: function (e) {
		var value = e.target.value;
		this.setState({ columnNumber: value });
	},
	dynamicClass: function () {
		var columnClass = "" + 12 / this.state.columnNumber;
		return "item col-sm-" + columnClass;
	},
	edit: function () {
		var value = !this.state.editing;
		this.setState({ editing: value });
	},
	add: function () {
		var arr = this.state.data;
		arr.push(this.state.data[0]);
		this.setState({ data: arr });
	},
	remove: function (i) {
		var arr = this.state.data;
		arr.splice(i, 1);
		this.setState({ data: arr });
	},
	addNewsletter: function () {
		if (this.props.newsletter) {
			return React.createElement(NewsletterBlock, { className: this.dynamicClass() });
		}
	},
	eachItem: function (item, i) {
		return React.createElement(
			'div',
			{ key: i, className: this.dynamicClass() },
			React.createElement(Banner, { index: i, url: item.url, imageSrc: item.src, title: item.title, editing: this.state.editing, onRemove: this.remove })
		);
	},
	renderDisplay: function () {
		return React.createElement(
			'div',
			{ className: 'row-wrap' },
			React.createElement(
				'div',
				{ className: this.containerClass() },
				React.createElement(
					'div',
					{ className: 'configuration' },
					React.createElement(
						'button',
						{ type: 'button', className: 'edit-trigger', onClick: this.edit, 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Row Configuration' },
						React.createElement('i', { className: 'fa fa-cog' })
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					this.state.data.map(this.eachItem)
				)
			)
		);
	},
	renderConfig: function () {
		return React.createElement(
			'div',
			{ className: 'row-wrap edit' },
			React.createElement(
				'div',
				{ className: this.containerClass() },
				React.createElement(
					'div',
					{ className: 'configuration' },
					React.createElement(
						'button',
						{ type: 'button', className: 'edit-trigger', onClick: this.edit, 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Row Configuration' },
						React.createElement('i', { className: 'fa fa-cog' })
					),
					React.createElement(
						'div',
						{ className: 'content' },
						React.createElement(
							'p',
							null,
							'Columns: ',
							React.createElement(
								'span',
								{ className: 'modifier' },
								this.state.columnNumber
							)
						),
						React.createElement('input', { onChange: this.handleColumnNumber, type: 'range', name: 'columnNumbers', min: '1', max: '12', list: 'numbers', defaultValue: this.state.columnNumber }),
						React.createElement(
							'datalist',
							{ id: 'numbers' },
							React.createElement(
								'option',
								null,
								'1'
							),
							React.createElement(
								'option',
								null,
								'2'
							),
							React.createElement(
								'option',
								null,
								'3'
							),
							React.createElement(
								'option',
								null,
								'4'
							),
							React.createElement(
								'option',
								null,
								'6'
							),
							React.createElement(
								'option',
								null,
								'12'
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					this.state.data.map(this.eachItem),
					React.createElement(
						'div',
						{ className: 'col-xs-12' },
						React.createElement(
							'button',
							{ type: 'button', className: 'add-banner', onClick: this.add },
							'Add new banner'
						)
					)
				)
			)
		);
	},
	render: function () {
		if (this.state.editing === true) {
			return this.renderConfig();
		} else {
			return this.renderDisplay();
		}
	}
});
var Banners = React.createClass({
	displayName: 'Banners',

	getInitialState: function () {
		return {
			data: [],
			editing: false
		};
	},
	componentDidMount: function () {
		this.setState({ columnNumber: this.props.columns });
		$.getJSON(this.props.source, (function (result) {
			if (this.isMounted()) {
				this.setState({
					data: result
				});
			}
		}).bind(this));
	},
	edit: function () {
		var value = !this.state.editing;
		this.setState({ editing: value });
	},
	remove: function (i) {
		var arr = this.state.data;
		arr.splice(i, 1);
		this.setState({ data: arr });
	},
	addNewsletter: function () {
		if (this.props.newsletter) {
			return React.createElement(NewsletterBlock, { className: this.dynamicClass() });
		}
	},
	eachItem: function (item, i) {
		return React.createElement(GenerateRow, { key: i, editing: this.state.editing, source: this.state.data[i], columns: this.props.columns, newsletter: 'true' });
	},
	renderDisplay: function () {
		return React.createElement(
			'div',
			{ className: 'banner-zone' },
			this.state.data.map(this.eachItem)
		);
	},
	renderConfig: function () {
		return React.createElement(
			'div',
			{ className: 'banner-zone edit' },
			this.state.data.map(this.eachItem)
		);
	},
	render: function () {
		if (this.state.editing) {
			return this.renderConfig();
		} else {
			return this.renderDisplay();
		}
	}
});
ReactDOM.render(React.createElement(Navigation, { source: 'http://localhost:3000/resources/navigation.json', target: 'mainNav', active: '2' }), document.getElementById('react-main-navigation'));
ReactDOM.render(React.createElement(Navigation, { source: 'http://localhost:3000/resources/navigation.json', target: 'headerNav' }), document.getElementById('react-header-navigation'));
ReactDOM.render(React.createElement(Banners, { source: 'http://localhost:3000/resources/homepage.json', newsletter: 'true', columns: '3' }), document.getElementById('react-homepage-middle-banners'));
ReactDOM.render(React.createElement(Banners, { source: 'http://localhost:3000/resources/homepage-lower-banners.json', columns: '2' }), document.getElementById('react-homepage-lower-banners'));