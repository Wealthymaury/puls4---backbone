Puls3.Views.App = Backbone.View.extend({
	events : {//objeto con todos los eventos de la vista
		'click .publicar' : 'showForm',
		'submit form' : 'createArticle',
		'click .logo' : 'navigateHome',
	 	'click nav' : 'navigateTag'
	},
	initialize : function($el){ //pasarle el elemento de la pagina, es el cacho que la vista va a tomar...
		this.$el = $el; //sobreescribir el de la vista con el que le llega

	},
	showForm : function(e){ //funcion showForm, es donde hago mi logica al momento de que suceda el evento del click a la clase .publicar
		e.preventDefault();
		this.$el.find('form').slideToggle();
	},
	createArticle : function(evento){
		evento.preventDefault();

		//obtener los valores de los text
		var titulo = $('input[name=titulo]').val() || 'no asignado';
		var autor = $('input[name=autor]').val() || 'no asignado';
		var tag = $('input[name=tag]').val() || 'no asignado';

		//data es el objeto a poner en el server
		var data = ({
			'title' : titulo,
			'image' : '/imagenes/img4.jpg',
			'user' : autor,
			'tag' : tag,
			'votes' : 0
		});

		//crear un nuevo modelo y al modelo darle save()
		var model = new Puls3.Models.Article(data);
		model.save();

		$('form').slideUp(function(){
			$('input[type=text]').val('');
		});

		if(window.app.state !== 'root'){
			Backbone.history.navigate('/',{trigger:true});
		}
	},
	navigateHome : function(){
		Backbone.history.navigate('/', {trigger:true});//el trigger true es para que las vistas escuchen este cambio en la url
	},
	navigateTag : function(e){
		e.preventDefault();
		var destino = e.target.innerHTML; //me da el contenido del enlace al que le di click
		Backbone.history.navigate('/tag/' + destino, {trigger:true});
	}
});