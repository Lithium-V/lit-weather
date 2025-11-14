fx_version("cerulean")
name("lit-weather")
author("Dz6k")
game("gta5")

client_scripts({
	"dist/client.js",
})

server_scripts({
	"dist/server.js",
})

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/alpine.js',
	'html/tailwindcss.js',
}
