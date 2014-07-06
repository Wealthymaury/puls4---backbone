module.exports = function(grunt) {
	//donde le digo que elementos quiero minificar?
	grunt.initConfig({
		uglify : {
			options : {
				//opciones, que no solo los concatene, sino que los minifique
				compress : true,
				//que me avise lo que hace
				report : true,
				//lo que quiero que tenga el archivo
				banner : '/*Minified on <%= grunt.template.date() %>*/\n' //usa el sistema de templates de underscore
			},
			app : { 
				files : { //archivos que van a estar minificando
					"public/app.min.js" :[ //archivo destino
						//archivos fuente que seran minificados, van en el orden que estan en index
						"public/js/init.js",
						"public/js/backbone/models/article.js",
						"public/js/backbone/collections/articles.js",
						"public/js/backbone/views/app.js",
						"public/js/backbone/views/article-view.js",
						"public/js/backbone/routers/base.js",
						"public/js/main.js"
					],
					"public/vendors.min.js" : [
						"public//js/vendor/underscore.js",
					    "public//js/vendor/backbone.js",
					    "public//js/vendor/socket.io.js",
					    "public//js/vendor/neon.js",
					    "public//js/vendor/CustomEvent.js",
					    "public//js/vendor/CustomEventSupport.js",
					    "public//js/vendor/PonyExpress.js"
					]
				}
			}
		}
	});

	//generar nuestra primera tarea, para eso debo cargar un plugin de grunt
	grunt.loadNpmTasks("grunt-contrib-uglify");

	//registrar la tarea default
	grunt.registerTask("default", ['uglify']);  //especifico que default tiene que hacer l tarea uglify, que es la que declare al inicio en initConfig
};