import LaminasFactoryInterface from '../../src/LaminasFactoryInterface';
import Invokable2 from './Invokable2';

const Factory2: LaminasFactoryInterface = () => {
    return new Invokable2();
};

export default Factory2;
