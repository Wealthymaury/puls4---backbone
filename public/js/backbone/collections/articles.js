Puls3.Collections.Articles = Backbone.Collection.extend({ //antes del igual le dices donde quieres que se guarde
	//esta coleccion con que modelo se relaciona??
	model : Puls3.Models.Article,
	//donde esta ese modelo??
	url : '/articles/',
	//como se llamara la coleccion
	name : 'articles'
})