import ContainerInterface from '@chubbyjs/chubbyjs-container/dist/ContainerInterface';

interface ConfigInterface {
    configureContainer(container: ContainerInterface): void;
}

export default ConfigInterface;
