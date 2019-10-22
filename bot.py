import discord, os

TOKEN = os.environ.get('TOKEN')

client = discord.Client()

@client.event
async def on_message(message):
    # we do not want the bot to reply to itself
    if message.author == client.user:
        return

    if message.content.startswith('!hello'):
        msg = 'Hello {0.author.mention}'.format(message)
        # await client.send_message(message.channel, msg)
        await message.channel.send(msg)

@client.event
async def on_member_update(before, after):
    if str(before.activity) == 'None' and str(after.activity) != 'None':  
        await after.guild.system_channel.send("Пэздюк " + after.display_name + " поехал в " + str(after.activity))

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

client.run(TOKEN)
