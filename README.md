# Factory

This package makes testing easier by providing way to create factories for your entities/models. Inspiration came from the [Factory Boy](https://github.com/FactoryBoy/factory_boy) python package, [Factory Girl](https://github.com/simonexmachina/factory-girl). You also check these projects:

- [typeorm-seeding](https://github.com/jorgebodega/typeorm-seeding)
- [typeorm-factories](https://github.com/owl1n/typeorm-factories)
- [typeorm-factory](https://github.com/linnify/typeorm-factory)
- [factory-girl-typeorm](https://github.com/wymsee/factory-girl-typeorm)

It has been created with only 2 adapters and others might be added if needed.

## Installation

**NPM**

```bash
npm install @teamMay/factory --save-dev
```

**Yarn**

```bash
yarn add @teamMay/factory --dev
```

## Usage

This section provides a quick overview of what you can achieve with this package.

### Factories

#### Declaration

To declare a factory, you have to provide:

- An adapter: ObjectAdapter, TypeormAdapter, ...
- An entity: the model you are building
- The fields to be populated (theirs default values or ways to generate them)

The adapter allows you to persist your data. If you want to save your data in a database via typeorm, you can use the `TypeormAdapter`. Default Adapter is `ObjectAdapter` and does not persist anything. You can create your own adapter to persist your data the way you want.

```typescript
import { Factory } from '@teamMay/factory';

export class UserFactory extends Factory<User> {
  entity = User;
  attrs = {
    email: 'adrien@factory.com',
    role: 'basic',
  };
  // By default, adapter is ObjectAdapter
}

export class AdminUserFactory extends Factory<User> {
  entity = User;
  attrs = {
    email: 'adrien@factory.com',
    role: 'admin',
  };
}
```

#### Adapters

You can provide your own adapter to extend this library. This library provides for now `ObjectAdapter` (default) and `TypeormAdapter`.
To ease testing, this library provides a `TypeormFactory` class.

The following example shows how to use them:

```typescript
import { Factory, TypeormFactory, TypeormAdapter } from '@teamMay/factory';

export class UserFactory extends Factory<User> {
  entity = User;
  attrs = {
    email: 'adrien@factory.com',
    role: 'basic',
  };
  adapter = TypeormAdapter();
}

// Same as:
export class TypeormUserFactory extends TypeormFactory<User> {
  entity = User;
  attrs = {
    email: 'adrien@factory.com',
    role: 'admin',
  };
}
```

#### Fuzzy generation with Fakerjs/Chancejs/...

To generate pseudo random data for our factories, we can take advantage of libraries like:

- [Fakerjs](https://github.com/MilosPaunovic/community-faker)
- [Chancejs](https://chancejs.com)
- ...

```typescript
import { TypeormFactory } from '@teamMay/factory';
import Chance from 'chance';

const chance = new Chance();

export class ProfileFactory extends TypeormFactory<Profile> {
  entity = Profile;
  attrs = {
    name: () => chance.name(),
    email: () => chance.email(),
    description: () => chance.paragraph({ sentences: 5 }),
  };
}
```

Note: Faker/Change are not included in this library. We only use the fact that a function passed to `attrs` is called every time a factory is created. Thus, you can use Faker/Chancejs to generate data.

#### Exploiting our created factories

We can use our factories to create new instances of entities:

```typescript
const userFactory = new UserFactory();
```

The factory and its adapters expose some functions:

- build: to create an object (and eventually generate data / subFactories)
- create: same as make but persist object in database via ORM "save" method
- buildMany and createMany allow to create several instances in one go

```typescript
const user: User = await userFactory.create();
const users: User[] = await userFactory.createMany(5);
```

To override factory default attributes, add them as parameter to the create function:

```typescript
const user: User = await userFactory.create({ email: 'adrien@example.com' });
```

### SubFactories

It is fairly common for entities to have relations (manyToOne, oneToMany, oneToOne etc...) between them. In this case we create factories for all the entities and make use of `SubFactory` to create a link between them. SubFactories will be resolve when instance are built. Note that this is pure syntactic sugar as one could use an arrow function calling another factory.

#### Example

If one user has a profile entity linked to it: we use the `UserFactory` as a SubFactory on the `ProfileFactory`

```typescript
import { Factory, SubFactory } from '@teamMay/factory';
import { UseFactory } from './user.factory.ts'; // factory naming is free of convention here, don't worry about it.

export class ProfileFactory extends Factory<Profile> {
  attrs = {
    name: 'Handsome name',
    user: new SubFactory(UserFactory),
  };
}
```

### Sequences

Sequences allow you to get an incremental value each time it is ran with the same factory.
That way, you can use a counter to have more meaningful data.

```typescript
import { Factory, Sequence } from '@teamMay/factory';

export class UserFactory extends Factory<User> {
  attrs = {
    customerId: new Sequence((nb: number) => `cust__abc__xyz__00${nb}`),
  };
}
```

### Post Generations

To perform actions after an instance has been created, you can use the `PostGeneration` decorator.

```typescript
import { Factory, PostGeneration } from '@teamMay/factory';

export class UserFactory extends Factory<User> {
  ...

  @PostGeneration()
  postGenerationFunction() {
    // perform an action after creation
  }

  @PostGeneration()
  async actionOnCreatedUser(user: User) {
    // do something with user
  }
}
```
