import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

interface LaminasFactoryInterface {
    (container: PsrContainerInterface, name: string): any;
}

export default LaminasFactoryInterface;
