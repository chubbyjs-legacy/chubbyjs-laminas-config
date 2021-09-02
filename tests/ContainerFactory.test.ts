import ContainerInterface from '@chubbyjs/chubbyjs-container/dist/ContainerInterface';
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import ArgumentInstanceOf from '@chubbyjs/chubbyjs-mock/dist/Argument/ArgumentInstanceOf';
import Call from '@chubbyjs/chubbyjs-mock/dist/Call';
import MockByCalls, { mockByCallsUsed } from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';
import { expect, test } from '@jest/globals';
import ConfigInterface from '../src/ConfigInterface';
import ContainerFactory from '../src/ContainerFactory';

const mockByCalls = new MockByCalls();

test('container factory without existing container', () => {
    const config = mockByCalls.create<ConfigInterface>(
        class Config {
            public configureContainer(container: ContainerInterface): void {}
        },
        [Call.create('configureContainer').with(new ArgumentInstanceOf(MinimalContainer))],
    );

    expect(ContainerFactory(config)).toBeInstanceOf(MinimalContainer);

    expect(mockByCallsUsed(config)).toBe(true);
});

test('container factory with existing container', () => {
    const container = mockByCalls.create<ContainerInterface>(class Container {}, []);

    const config = mockByCalls.create<ConfigInterface>(
        class Config {
            public configureContainer(container: ContainerInterface): void {}
        },
        [Call.create('configureContainer').with(container)],
    );

    expect(ContainerFactory(config, container)).toBe(container);

    expect(mockByCallsUsed(config)).toBe(true);
});
