import { Mock, It } from 'moq.ts';
import ConfigInterface from '../src/ConfigInterface';
import ContainerFactory from '../src/ContainerFactory';
import ContainerInterface from 'chubbyjs-container/dist/ContainerInterface';
import MinimalContainer from 'chubbyjs-container/dist/MinimalContainer';

test('container factory without existing container', () => {
    const config = new Mock<ConfigInterface>()
        .setup((instance) => instance.configureContainer(It.Is((value) => value instanceof MinimalContainer)))
        .returns()
        .object();

    expect(ContainerFactory(config)).toBeInstanceOf(MinimalContainer);
});

test('container factory with existing container', () => {
    const container = new Mock<ContainerInterface>().object();

    const config = new Mock<ConfigInterface>()
        .setup((instance) => instance.configureContainer(container))
        .returns()
        .object();

    expect(ContainerFactory(config, container)).toBe(container);
});
