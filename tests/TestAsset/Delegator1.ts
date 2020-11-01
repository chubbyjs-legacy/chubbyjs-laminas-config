import Invokable1 from './Invokable1';
import LaminasDelegatorInterface from '../../src/LaminasDelegatorInterface';
import PsrContainerInterface from 'psr-container/dist/ContainerInterface';

const Delegator1: LaminasDelegatorInterface = (container: PsrContainerInterface, name: string, factory: Function) => {
    const invokable1: Invokable1 = factory();

    invokable1.key1 = 'value1';

    return invokable1;
};

export default Delegator1;
