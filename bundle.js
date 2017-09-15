/**
 * Factory returns
 * @param {RoomConfiguration} roomConfiguration
 * @param {Game} game
 * @returns {{type: string, count: number, baseMemory: object}|null}
 */
function Factory(roomConfiguration, game) {
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

class JobConfiguration {
    /**
     *
     * @param {string} type
     * @param {Array<string>} body
     * @param {number} count
     * @param {Object} baseMemory
     */
    constructor(type, body, count, baseMemory = {}) {
        this.type = type;
        this.body = body;
        this.count = count;
        this.baseMemory = baseMemory;
    }
}

class RoomConfiguration {
    /**
     * @param {string} room - room is the name of the room that this configuration configures.
     * @param {Array<JobConfiguration>} jobs
     */
    constructor(room, jobs) {
        this.room = room;
        this.jobs = jobs;
    }
}

class Configuration {
    /**
     * @param {Array<RoomConfiguration>} roomConfigurations
     */
    constructor(roomConfigurations) {
        this.roomConfigurations = roomConfigurations;
    }
}

/**
 * loop is the main application loop that screeps will run.
 * @param {Configuration} configuration
 */
function BuildLoop(configuration) {
    return function (game) {
        for(var name in Memory.creeps) {
            if (!game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        configuration.roomConfigurations.forEach(roomConfig => RunRoom(roomConfig, game));
    };
}

/**
 * RunRoom executes makes sure that the room's state matches the rooms configuration, creating creeps, and placing
 * structures if required.
 *
 * @param {RoomConfiguration} roomConfiguration
 * @param {Game} game
 */
function RunRoom(roomConfiguration, game) {
    const newCreep = Factory(roomConfiguration, game);
    if (!newCreep) {
        return;
    }

    const spawn = game.spawns['Spawn1'];
    const canCreate = spawn.canCreateCreep(newCreep.body);
    if (canCreate === OK) {
        const newName = spawn.createCreep(newCreep.body, undefined, newCreep.memory);
        console.log('Spawning new ' + newCreep.memory.type + ": " + newName);
    } else {
        console.log('Unable to create a new ' + newCreep.memory.type + ": " + canCreate);
    }
}

export { BuildLoop, JobConfiguration, RoomConfiguration, Configuration };
