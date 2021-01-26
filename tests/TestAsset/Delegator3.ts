import Invokable1 from './Invokable1';
import LaminasDelegatorInterface from '../../src/LaminasDelegatorInterface';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const Delegator3: LaminasDelegatorInterface = (container: PsrContainerInterface, name: string, factory: Function) => {
    const invokable1: Invokable1 = factory();

    invokable1.key3 = 'value3';

    return invokable1;
};

export default Delegator3;
