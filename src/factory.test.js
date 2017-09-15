import {
    RoomConfiguration,
    JobConfiguration,
} from './config';

import Factory from './factory';

describe('factory', () => {
    test('should try to create a new miner at the specified source', () => {
        const spec = new RoomConfiguration('testRoom', [
            new JobConfiguration('miner-1', ['work', 'carry', 'move'], 1, { role: 'miner', sourceIndex: 1 })]);
        const mockedGame = {
            creeps: {
                'joe': {
                    memory: {},
                },
            },
        };

        const step = Factory(spec, mockedGame);

        expect(step).not.toBe(null);
        expect(step).toEqual({
            body: ['work', 'carry', 'move'],
            memory: { type: 'miner-1', role: 'miner', sourceIndex: 1, home: 'testRoom' }
        });
    });

    test("shouldn't create a creep when all jobs are fullfilled", () => {
        const spec = new RoomConfiguration('testRoom', [
            new JobConfiguration('miner', ['work','work', 'carry', 'move'], 1, {}),
            new JobConfiguration('upgrader', ['work', 'carry', 'move'], 1, {}),
        ]);
        const mockedGame = {
            creeps: {
                'joe': {
                    memory: {
                        type: 'miner',
                        home: 'testRoom',
                    },
                },
                'bob': {
                    memory: {
                        type: 'upgrader',
                        home: 'testRoom',
                    }
                }
            },
        };

        const step = Factory(spec, mockedGame);

        expect(step).toBe(null);
    });
});