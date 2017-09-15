/**
 * Factory returns
 * @param {RoomConfiguration} roomConfiguration
 * @param {Game} game
 * @returns {{type: string, count: number, baseMemory: object}|null}
 */
export default function Factory(roomConfiguration, game) {
    for (let i = 0; i < roomConfiguration.jobs.length; i++) {
        const job = roomConfiguration.jobs[i];

        const inJob = Object.keys(game.creeps)
            .map(key => game.creeps[key])
            .filter(c => c.memory.type === job.type && c.memory.home === roomConfiguration.room);

        if (inJob.length < job.count) {
            const memory = Object.assign({}, job.baseMemory, {
                type: job.type,
                home: roomConfiguration.room,
            });
            return Object.assign({}, { memory, body: job.body });
        }
    }

    return null;
}