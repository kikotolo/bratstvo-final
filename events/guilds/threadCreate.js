module.exports = {
    name: "threadCreate",
    once: false,
    async execute(client, thread) {
        if (thread.isText()) thread.join();
        const logChannel = client.channels.cache.get('996673386266763274');
        logChannel.send(`Nome do Tópico: ${thread.name}`);
    },
};