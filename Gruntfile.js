module.exports = function(grunt) {
	var config = {
		package : grunt.file.readJSON( 'package.json' ),

		concat : {
		    options : {
				separator : ';'
		    },
		    site : {
				src : [
					'<%= package.webroot %>/init/*.js',
					'<%= package.webroot %>/libs/*.js',
					'<%= package.webroot %>/templates/*.js',
					'<%= package.webroot %>/vendor/*.js',
					'<%= package.webroot %>/app/*.js',
					'<%= package.webroot %>/boot.js'
				],
				dest : '<%= package.webroot %>/built.js',
		    },
  		},

  		jshint: {
			options: {
				jshintrc : true
			},
    		beforeconcat : '<%= concat.site.src %>'
  		},

  		uglify : {
			site : {
				files : {
					'<%= concat.site.dest %>' : '<%= concat.site.dest %>'
				}
			}
    	},

    	cssmin : {
    		target : {
		    	files : {
		      		'style.css' : 'style.css'
		    	}
		  	}
    	},

		watch: {
		    script : {
		    	files : '<%= concat.site.src %>',
		    	tasks : ['jshint', 'concat']
		    }
  		}
	};

	grunt.initConfig( config );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.registerTask( 'js', ['jshint', 'concat'] );
	grunt.registerTask( 'jsmin', ['jshint', 'concat', 'uglify'] );
	grunt.registerTask( 'deploy', ['jsmin', 'cssmin'] );
};