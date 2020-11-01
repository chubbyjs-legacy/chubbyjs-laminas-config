import Invokable1 from './Invokable1';
import LaminasDelegatorInterface from '../../src/LaminasDelegatorInterface';
import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

const Delegator2: LaminasDelegatorInterface = (container: PsrContainerInterface, name: string, factory: Function) => {
    const invokable1: Invokable1 = factory();

    invokable1.key2 = 'value2';

    return invokable1;
};

export default Delegator2;
