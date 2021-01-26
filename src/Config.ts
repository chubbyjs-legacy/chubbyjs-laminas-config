import ConfigInterface from './ConfigInterface';
import ContainerInterface from '@chubbyjs/chubbyjs-container/dist/ContainerInterface';
import FactoryInterface from '@chubbyjs/chubbyjs-container/dist/FactoryInterface';
import LaminasDelegatorInterface from './LaminasDelegatorInterface';
import LaminasFactoryInterface from './LaminasFactoryInterface';
import Parameter from '@chubbyjs/chubbyjs-container/dist/Parameter';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

type config = {
    dependencies?: {
        services?: Map<string, any>;
        factories?: Map<string, LaminasFactoryInterface>;
        aliases?: Map<string, string>;
        delegators?: Map<string, Array<LaminasDelegatorInterface>>;
    };
    [x: string]: any;
};

class Config implements ConfigInterface {
    private config: config;

    public constructor(config: config) {
        this.config = config;
    }

    public configureContainer(container: ContainerInterface): void {
        container.factory('config', Parameter(this.config));

        const dependencies = this.config.dependencies;

        if (undefined === dependencies) {
            return;
        }

        const services = dependencies.services || new Map<string, any>();
        const factories = dependencies.factories || new Map<string, LaminasFactoryInterface>();
        const aliases = dependencies.aliases || new Map<string, string>();
        const delegators = dependencies.delegators || new Map<string, Array<LaminasDelegatorInterface>>();

        this.addServices(container, services);
        this.addFactories(container, factories);
        this.addAliases(container, aliases);
        this.addDelegators(container, delegators, services, aliases);
    }

    private addServices(container: ContainerInterface, services: Map<string, any>): void {
        services.forEach((service: any, name: string) => {
            container.factory(name, () => {
                return service;
            });
        });
    }

    private addFactories(container: ContainerInterface, factories: Map<string, LaminasFactoryInterface>): void {
        factories.forEach((factory: LaminasFactoryInterface, name: string) => {
            container.factory(
                name,
                (psrContainer: PsrContainerInterface): FactoryInterface => {
                    return factory(psrContainer, name);
                },
            );
        });
    }

    private addAliases(container: ContainerInterface, aliases: Map<string, string>): void {
        aliases.forEach((target: string, name: string) => {
            container.factory(
                name,
                (psrContainer: PsrContainerInterface): FactoryInterface => {
                    return psrContainer.get(target);
                },
            );
        });
    }

    private addDelegators(
        container: ContainerInterface,
        delegators: Map<string, Array<LaminasDelegatorInterface>>,
        services: Map<string, any>,
        aliases: Map<string, string>,
    ): void {
        delegators.forEach((delegatorList: Array<LaminasDelegatorInterface>, name: string) => {
            if (services.has(name) || aliases.get(name)) {
                return;
            }

            delegatorList.forEach((delegator: LaminasDelegatorInterface) => {
                container.factory(
                    name,
                    (psrContainer: PsrContainerInterface, previous?: FactoryInterface): FactoryInterface => {
                        if (!previous) {
                            throw new Error('Missing previous');
                        }

                        return delegator(psrContainer, name, () => {
                            return previous(psrContainer);
                        });
                    },
                );
            });
        });
    }
}

export default Config;
