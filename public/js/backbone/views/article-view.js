Puls3.Views.Article = Backbone.View.extend({//generamos la vista, que exista en backbone, una vista, que tenga lo siguiente, y antes del igual dile donde la vas a guardar
	events : { //eventos propios de la vista articulo
		'click .acciones .votos .up' : 'upVote',
		'click .acciones .votos .down' : 'downVote',
		'click' : 'navigate' //no le digo a que selector de css le aplico el evento para que se lo aplique a toda la vista
	},
	tagName : 'article', //que el tipo del tag a generar sea un article
	className : 'post',
	//como quieres que se inicialice??... aqui va la logica que pasa con la vista cunado se inicialize
	initialize : function(model){
		var self = this;
		//debugger;
		//especifico el template que usara esta vista (es de underscore)
		this.template = _.template($('#article-template').html());//dame el html del template con ese ID
		this.extendedTemplate = _.template($('#article-extended-template').html());
		this.model = model;

		//poner a escuchar cambios en el modelo, para hacer un render en caso de tener cambio
		/*this.model.on('change', function(){
			if(window.app.state === 'articleSingle'){ //para que si cambias el modelo, sepa en que estado estes y haga el render como lo necesitas y no lo cambie
				self.extentedRender();
			}else{
				self.render();
			}
		});*/

		this.model.on('change', function(){
			console.log('el modelo cambio');
			self.renderVotes();
		});

		//la vista debe escuchar al router
		window.routers.base.on('route:root', function(){
			//cuando este en root siempre este visible, pero no quiere que me modifique el css, para eso
			self.$el.css('display', '');
			self.render(); // para cuando vuelves al estado normal(root) se haga un render normal
		});
		window.routers.base.on('route:articleSingle', function(){ //ojo, no pongas espacios en los :
			//aqui tengo dos posibilidades, que sea la vista que voy a renderear mas grande, o que sea una vista que no debe verse, para eso
			if (window.app.article === self.model.get('id')){ //si el elemento en pantalla es que de esta vista
				//mostrarlo mas grande, para eso necesito tener un render extendido de la vista, lo que implica tener un template diferente, mas grande
				self.extentedRender();
			}else{
				//ocultarlo si no es el que viene en el id
				self.$el.hide();
			}
		});
		window.routers.base.on('route:articlesTag',function(){
			if (window.app.tag === self.model.get('tag')){
				self.$el.css('display','');
				self.render();
			}else{
				self.$el.hide();
			}
		});
	},
	extentedRender : function(){
		//de donde saco los datos para esta vista??
		var data = this.model.toJSON(); 

		//junto el data con el template extendido
		var html = this.extendedTemplate(data);

		//al html de esta vista, asigale el template
		this.$el.html(html);
		this.$el.css('width', '100%');//para evitar que salga en 2 con el responsive
	},
	render : function(){
		//de donde saco los datos para esta vista??
		var data = this.model.toJSON(); 

		//junto el data con el template
		var html = this.template(data);

		//al html de esta vista, asigale el template
		this.$el.html(html);
		this.$el.css('width', ''); //regresar a la normalidad despues de verlo grande, ignorando el responsive
	},
	renderVotes : function(){
		var data = this.model.get('votes');
		this.$el.find('.total').html(data);
	},
	upVote : function(e){
		e.preventDefault();
		e.stopPropagation(); //para que el evento no lo procese nadie mas, solo este elemento, y asi poder trabajar con el navigate
		var votes = this.model.get('votes');
		this.model.set('votes', ++votes);
		this.model.save();
	},
	downVote : function(e){
		e.preventDefault();
		e.stopPropagation();
		var votes = this.model.get('votes');
		this.model.set('votes', --votes);
		this.model.save();
	},
	navigate : function(){
		Backbone.history.navigate('/article/' + this.model.get('id'), {trigger:true});
	}
	//ojo una vista tiene tres partes, this.$el (el objeto actual), .$render, .$event
}); 
