var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: process.env.BOT_TOKEN,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ' + bot.username);
});
// onGameChange hook
var usersStatus = new Map();
bot.on('presence', function (user, userID, status, game, event) {
	logger.info(user + ' changed!\n' + JSON.stringify(event));
	// bot.sendMessage({ to: '456917371882307605', message: user + ' changed somehow!'});
	if (game != null) {
		if (!usersStatus.has(userID) || usersStatus.get(userID) != game.name) {
			bot.sendMessage({ to: '456917371882307605', message: user + ' отправился в ' + game.name + '!' });
		}
		usersStatus.set(userID, game.name);
	}
	if (game == null && usersStatus.has(userID)) {
		usersStatus.delete(userID);
	}
});
