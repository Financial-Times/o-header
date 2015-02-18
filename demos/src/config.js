module.exports = {
	"options": {
		"sass": "demos/src/scss/demo.scss",
		"js": "demos/src/demo.js",
		"bodyClasses": "o-hoverable-on",
		"template": "main.mustache",
		"data": {
			"content": require('fs').readFileSync('demos/src/content.html')
		}
	},
	"demos": [
		{
			"name": "skeleton",
			"data": {
				"o-header": {
					"primary": require('fs').readFileSync('demos/src/primary/skeleton.html'),
					"secondary": require('fs').readFileSync('demos/src/secondary/skeleton.html')
				}
			}
		},
		{
			"name": "header",
			"sass": "demos/src/scss/header.scss",
			"data": {
				"o-header": {
					"primary": require('fs').readFileSync('demos/src/primary/header.html'),
					"secondary": require('fs').readFileSync('demos/src/secondary/header.html')
				}
			}
		},
		{
			"name": "branded",
			"sass": "demos/src/scss/branded.scss",
			"data": {
				"o-header": {
					"primary": require('fs').readFileSync('demos/src/primary/branded.html'),
					"secondary": require('fs').readFileSync('demos/src/secondary/branded.html')
				}
			}
		},
		{
			"name": "mega-dropdown-primary",
			"sass": "demos/src/scss/mega-dropdown.scss",
			"template": "demos/src/mega-dropdown-primary.mustache"
		},
		{
			"name": "mega-dropdown-secondary",
			"sass": "demos/src/scss/mega-dropdown.scss",
			"template": "demos/src/mega-dropdown-secondary.mustache"
		},
		{
			"name": "header-no-secondary",
			"data": {
				"o-header": {
					"primary": require('fs').readFileSync('demos/src/primary/header-no-secondary.html')
				}
			}
		}
	]
};
