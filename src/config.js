import Factory from './factory';

/**
 * @property {string} type
 * @property {Array<string>} body
 * @property {number} count
 * @property {Object} baseMemory
 */
export class JobConfiguration {
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

export class RoomConfiguration {
    /**
     * @param {string} room - room is the name of the room that this configuration configures.
     * @param {Array<JobConfiguration>} jobs
     */
    constructor(room, jobs) {
        this.room = room;
        this.jobs = jobs;
    }
}

export class Configuration {
    /**
     * @param {Array<RoomConfiguration>} roomConfigurations
     */
    constructor(roomConfigurations) {
        this.roomConfigurations = roomConfigurations;
    }
}
