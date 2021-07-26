import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';
import { expect, test } from '@jest/globals';
import Config from '../src/Config';
import LaminasDelegatorInterface from '../src/LaminasDelegatorInterface';
import LaminasFactoryInterface from '../src/LaminasFactoryInterface';
import Delegator1 from './TestAsset/Delegator1';
import Delegator2 from './TestAsset/Delegator2';
import Delegator3 from './TestAsset/Delegator3';
import Factory1 from './TestAsset/Factory1';
import Factory2 from './TestAsset/Factory2';
import Invokable1 from './TestAsset/Invokable1';
import Invokable2 from './TestAsset/Invokable2';

test('test none', () => {
    const container = new MinimalContainer();

    const data = { key: 'value' };

    const config = new Config(data);

    config.configureContainer(container);

    expect(container.has('config')).toBe(true);

    expect(container.get('config')).toBe(data);
});

test('test service', () => {
    const container = new MinimalContainer();

    const service1 = new Invokable1();
    const service2 = new Invokable2();

    const config = new Config({
        dependencies: {
            services: new Map<string, any>().set('name1', service1).set('name2', service2),
        },
    });

    config.configureContainer(container);

    expect(container.has('name1')).toBe(true);
    expect(container.has('name2')).toBe(true);

    expect(container.get('name1')).toBe(service1);
    expect(container.get('name2')).toBe(service2);
});

test('test factories', () => {
    const container = new MinimalContainer();

    const config = new Config({
        dependencies: {
            factories: new Map<string, LaminasFactoryInterface>()
                .set(Invokable1.name, Factory1)
                .set(Invokable2.name, Factory2),
        },
    });

    config.configureContainer(container);

    expect(container.has(Invokable1.name)).toBe(true);
    expect(container.has(Invokable2.name)).toBe(true);

    expect(container.get(Invokable1.name)).toBeInstanceOf(Invokable1);
    expect(container.get(Invokable2.name)).toBeInstanceOf(Invokable2);
});

test('test aliases', () => {
    const container = new MinimalContainer();

    const config = new Config({
        dependencies: {
            factories: new Map<string, LaminasFactoryInterface>().set(Invokable1.name, Factory1),
            aliases: new Map<string, string>().set('name1', Invokable1.name).set('name2', Invokable1.name),
        },
    });

    config.configureContainer(container);

    expect(container.has('name1')).toBe(true);
    expect(container.has('name2')).toBe(true);

    expect(container.get(Invokable1.name)).toBe(container.get('name1'));
    expect(container.get(Invokable1.name)).toBe(container.get('name2'));

    expect(container.get('name1')).toBeInstanceOf(Invokable1);
    expect(container.get('name2')).toBeInstanceOf(Invokable1);
});

test('test delegators', () => {
    const container = new MinimalContainer();

    const config = new Config({
        dependencies: {
            services: new Map<string, any>().set('name2', new Invokable1()),
            factories: new Map<string, LaminasFactoryInterface>().set(Invokable1.name, Factory1),
            aliases: new Map<string, string>().set('name1', Invokable1.name),
            delegators: new Map<string, Array<LaminasDelegatorInterface>>()
                .set('name2', [Delegator1, Delegator2])
                .set(Invokable1.name, [Delegator1, Delegator2])
                .set('name1', [Delegator3]),
        },
    });

    config.configureContainer(container);

    expect(container.has('name2')).toBe(true);
    expect(container.has(Invokable1.name)).toBe(true);
    expect(container.has('name1')).toBe(true);

    const service1: Invokable1 = container.get(Invokable1.name);

    expect(service1).toBe(container.get('name1'));

    expect(service1.key1).toBe('value1');
    expect(service1.key2).toBe('value2');
    expect(service1.key3).toBe(undefined);

    const service2: Invokable1 = container.get('name2');

    expect(service2.key1).toBe(undefined);
    expect(service2.key2).toBe(undefined);
    expect(service1.key3).toBe(undefined);
});

test('test delegators missing factory', () => {
    const container = new MinimalContainer();

    const config = new Config({
        dependencies: {
            delegators: new Map<string, Array<LaminasDelegatorInterface>>().set(Invokable1.name, [
                Delegator1,
                Delegator2,
            ]),
        },
    });

    config.configureContainer(container);

    expect(() => container.get(Invokable1.name)).toThrow('Could not create service with id "Invokable1"');
});
