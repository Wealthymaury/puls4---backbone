$(document).ready(function(){
	console.log('main.js loaded');

	//1. instancia de colecciones y pedir articulos
	window.collections.articles = new Puls3.Collections.Articles();
	var xhr = window.collections.articles.fetch();

	//2. que hacer al agregar un modelo a la coleccion??
	window.collections.articles.on('add', function(model){
		console.log('nuevo modelo agregado a la coleccion articles');
		console.log(model.toJSON());
		var view = new Puls3.Views.Article(model);
		view.render();
		view.$el.prependTo('.posts')
			.css('opacity', '0.1')
			.css('margin-top', '-150px')
			.animate({'margin-top': "0", opacity: "1"}, 500);
	});

	//3. crear la vista App que controla mi interfaz
	window.views.app = new Puls3.Views.App($('body'));

	//4. lo de pony express para la sincronizacion automatica
	window.ponyExpress = new PonyExpress({
		io : window.location.origin
	});

	window.ponyExpress.bind('connect', function(){
		window.plugs.article = new PonyExpress.BackbonePlug({
			collection : window.collections.articles
		});
	});

	//5. inicializando el router
	window.routers.base = new Puls3.Routers.Base();
		//cuando todo este listo, comienza la app en root
		xhr.done(function(){
			Backbone.history.start({
				root : '/',
				pushState : true
			});
		});
});
