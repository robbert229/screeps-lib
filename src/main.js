import { JobConfiguration, RoomConfiguration, Configuration } from './config';
import Factory from './factory';

/**
 * loop is the main application loop that screeps will run.
 * @param {Configuration} configuration
 */
export function BuildLoop(configuration) {
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

export { JobConfiguration, RoomConfiguration, Configuration };