Puls3.Routers.Base = Backbone.Router.extend({//extiendo el router de la clase de backbone, y lo asigno a mi espacio de nombres
	//un router siempre tiene que tener rutas
	routes : {
		'' : 'root', //ruta para cuendo inicia la app, ruta base, sintaxis - es ruta y luego funcion
		'article/:id' : 'articleSingle', //:id es la manera de pasar un parametro
		'tag/:nombre' : 'articlesTag'
	},//debo ahora declarar las functiones
	root : function(){
		console.log("Estamos en el root");
		//debo decir a que estado de la aplicacion estoy entrando, es para que la vista sepa como renderearse
		window.app.state = 'root';
		window.app.article = null; //en este estado no tengo ningun articulo seleccionado
		window.app.tag = null;
	},
	articleSingle : function(id){
		console.log("Estamos en articleSingle");
		//debo decir a que estado de la aplicacion estoy entrando
		window.app.state = 'articleSingle';
		window.app.article = id; //el articulo seleccionado es el que viene adjunto en la url
		window.app.tag = null;
	},
	articlesTag : function(nombre){
		window.app.state = 'articlesTag';
		window.app.article = null;
		window.app.tag = nombre;
	}
});