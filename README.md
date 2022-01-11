# Factory

This package makes testing easier by creating factories for your entities/models. One could find inspiration came from the [Factory Boy](https://github.com/FactoryBoy/factory_boy) python package.

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

To declare a factory, you have to declare which adapter your using (plain Object, typeorm, ...), the entity you are building and the fields to be populated.

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

#### Fuzzy generation with Faker/Chance etc...

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

#### Exploiting our created factories

We can use our factories to create new instances of entities:

```typescript
const userFactory = new UserFactory();
```

The factory and its adapters expose some functions:

- make: to create an object (and eventually generate data / subfactories)
- create: same as make but persist object in database via ORM "save" method
- makeMany and createMany allow to create several instances in one go

```typescript
const user: User = await userFactory.create();
const users: User[] = await userFactory.createMany(5);
```

To overridde factory default attributes, add them as parameter to the create function:

```typescript
const user: User = await userFactory.create({ email: 'adrien@example.com' });
```

### SubFactories

It is fairly common for entities to have relations (manyToOne, oneToMany, oneToOne etc...) between them. In this case we create factories for all the entities and make use of `SubFactory` to create a link between them. Subfactories will be resolve when instance are built. Note that tis is pure syntaxic sugar as one could use an arrow function calling another factory.

#### Example

If one user has a profile entity linked to it: we use the `UserFactory` as a subfactory on the `ProfileFactory`

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
