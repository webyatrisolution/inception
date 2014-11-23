/* jshint node:true */
module.exports = function( grunt ){
	'use strict';

	grunt.initConfig({

		// Setting folder templates.
		dirs: {
			fonts: 'assets/fonts',
			images: 'assets/images',
			styles: 'assets/styles',
			scripts: 'assets/scripts'
		},

		// JavaScript linting with JSHint.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.scripts %>/*.js',
				'!<%= dirs.scripts %>/*.min.js',
				'<%= dirs.scripts %>/admin/*.js',
				'!<%= dirs.scripts %>/admin/*.min.js',
				'<%= dirs.scripts %>/frontend/*.js',
				'!<%= dirs.scripts %>/frontend/*.min.js'
			]
		},

		// Compile all .scss files.
		sass: {
			options: {
				sourcemap: 'none',
				style: 'expanded',
				loadPath: require( 'node-bourbon' ).includePaths
			},
			admin: {
				files: [{
					expand: true,
					cwd: '<%= dirs.styles %>/sass/admin/',
					src: ['*.scss'],
					dest: '<%= dirs.styles %>/css/admin/',
					ext: '.css'
				}]
			},
			frontend: {
				files: [{
					expand: true,
					cwd: '<%= dirs.styles %>/sass/',
					src: ['*.scss'],
					dest: '<%= dirs.styles %>/css/',
					ext: '.css'
				}]
			}
		},

		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},
			admin: {
				files: [{
					expand: true,
					cwd: '<%= dirs.scripts %>/admin/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: '<%= dirs.scripts %>/admin/',
					ext: '.min.js'
				}]
			},
			frontend: {
				files: [{
					expand: true,
					cwd: '<%= dirs.scripts %>/frontend/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: '<%= dirs.scripts %>/frontend/',
					ext: '.min.js'
				}]
			}
		},

		// Minify all .css files.
		cssmin: {
			admin: {
				expand: true,
				cwd: '<%= dirs.styles %>/css/admin/',
				src: ['*.css'],
				dest: '<%= dirs.styles %>/css/admin/',
				ext: '.min.css'
			},
			frontend: {
				expand: true,
				cwd: '<%= dirs.styles %>/css/',
				src: ['*.css'],
				dest: '<%= dirs.styles %>/css/',
				ext: '.min.css'
			}
		},

		// Watch changes for assets.
		watch: {
			styles: {
				files: [
					'<%= dirs.styles %>/sass/*.scss'
				],
				tasks: ['sass', 'cssbeautifier','cssmin']
			},
			scripts: {
				files: [
					'<%= dirs.scripts %>/admin/*.js',
					'!<%= dirs.scripts %>/admin/*.min.js',
					'<%= dirs.scripts %>/frontend/*.js',
					'!<%= dirs.scripts %>/frontend/*.min.js'
				],
				tasks: ['uglify']
			}
		},

		// Generate POT files.
		makepot: {
			themes: {
				options: {
					type: 'wp-theme',
					domainPath: 'languages',
					potFilename: 'switcher.pot',
					exclude: [
						'dummy/.*',
						'deploy/.*',
						'includes/admin/.*'
					],
					potHeaders: {
						poedit: true,
						'report-msgid-bugs-to': 'https://axisthemes.com/translation/issues',
						'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
					}
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options:{
				text_domain: 'switcher',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			themes: {
				src: [
					'**/*.php',
					'!dummy/**',
					'!deploy/**',
					'!node_modules/**',
					'!includes/admin/**',
					'!includes/controller/walkers/**' // Since we are Hijacking Walker_Nav_Menu_Edit
				],
				expand: true
			}
		},

		// Exec shell commands.
		shell: {
			options: {
				stdout: true,
				stderr: true
			},
			txpush: {
				command: 'tx push -s' // push the resources
			},
			txpull: {
				command: 'tx pull -a -f' // pull the .po files
			}
		},

		// Generate MO files.
		potomo: {
			options: {
				poDel: false
			},
			themes: {
				files: [{
					expand: true,
					cwd: 'languages/',
					src: ['*.po'],
					dest: 'languages/',
					ext: '.mo',
					nonull: true
				}]
			}
		},

		// Copy files to deploy.
		copy: {
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'!Gruntfile.js',
					'!package.json',
					'!node_modules/**'
				],
				dest: 'deploy',
				expand: true,
				dot: true
			}
		},

		// Clean the directory.
		clean: {
			deploy: {
				src: [ 'deploy' ]
			}
		}
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-shell' );
	grunt.loadNpmTasks( 'grunt-potomo' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	// Register tasks
	grunt.registerTask( 'default', [
		'css',
		'uglify'
	]);

	grunt.registerTask( 'css', [
		'sass',
		'cssmin'
	]);

	grunt.registerTask( 'dev', [
		'default',
		'makepot'
	]);

	grunt.registerTask( 'i18n', [
		'shell:txpush',
		'shell:txpull',
		'potomo'
	]);

	grunt.registerTask( 'deploy', [
		'clean:deploy',
		'copy:deploy'
	]);

	grunt.registerTask( 'build', [
		'dev',
		'i18n',
		'deploy'
	]);
};
