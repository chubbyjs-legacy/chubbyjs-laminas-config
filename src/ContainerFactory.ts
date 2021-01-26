import ConfigInterface from './ConfigInterface';
import ContainerInterface from '@chubbyjs/chubbyjs-container/dist/ContainerInterface';
import MinimalContainer from '@chubbyjs/chubbyjs-container/dist/MinimalContainer';

const ContainerFactory = (config: ConfigInterface, container?: ContainerInterface): ContainerInterface => {
    container = container || new MinimalContainer();
    config.configureContainer(container);

    return container;
};

export default ContainerFactory;
