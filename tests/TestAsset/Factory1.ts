import LaminasFactoryInterface from '../../src/LaminasFactoryInterface';
import Invokable1 from './Invokable1';

const Factory1: LaminasFactoryInterface = () => {
    return new Invokable1();
};

export default Factory1;
