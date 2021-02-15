# chubbyjs-laminas-config

[![CI](https://github.com/chubbyjs/chubbyjs-laminas-config/workflows/CI/badge.svg?branch=master)](https://github.com/chubbyjs/chubbyjs-laminas-config/actions?query=workflow%3ACI)
[![Build Status](https://api.travis-ci.org/chubbyjs/chubbyjs-laminas-config.png?branch=master)](https://travis-ci.org/chubbyjs/chubbyjs-laminas-config)
[![Coverage Status](https://coveralls.io/repos/github/chubbyjs/chubbyjs-laminas-config/badge.svg?branch=master)](https://coveralls.io/github/chubbyjs/chubbyjs-laminas-config?branch=master)
[![Infection MSI](https://badge.stryker-mutator.io/github.com/chubbyjs/chubbyjs-laminas-config/master)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyjs/chubbyjs-laminas-config/master)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyjs_chubbyjs-laminas-config&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyjs_chubbyjs-laminas-config)

## Description

Chubbyjs container adapter using laminas service manager configuration.

## Requirements

 * node: 10
 * [@chubbyjs/chubbyjs-container][2]: ^1.0.0

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyjs/chubbyjs-laminas-config][1].

```sh
npm i @chubbyjs/chubbyjs-laminas-config@1.0
```

## Usage

```ts
import Config from '@chubbyjs/chubbyjs-laminas-config/dist/Config';
import ContainerFactory from '@chubbyjs/chubbyjs-laminas-config/dist/ContainerFactory';
import LaminasDelegatorInterface from '@chubbyjs/chubbyjs-laminas-config/dist/LaminasDelegatorInterface';
import LaminasFactoryInterface from '@chubbyjs/chubbyjs-laminas-config/dist/LaminasFactoryInterface';
import PsrContainerInterface from '@chubbyjs/psr-container/dist/ContainerInterface';

const container: PsrContainerInterface = ContainerFactory(new Config({
    dependencies: {
        services: new Map<string, any>(),
        factories: new Map<string, LaminasFactoryInterface>(),
        aliases: new Map<string, string>(),
        delegators: new Map<string, Array<LaminasDelegatorInterface>>()
    },
    // ... other configuration
}));
```

## Copyright

Dominik Zogg 2020

[1]: https://www.npmjs.com/package/@chubbyjs/chubbyjs-laminas-config

[2]: https://www.npmjs.com/package/@chubbyjs/chubbyjs-container
