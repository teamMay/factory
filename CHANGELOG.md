# Changelog

## v0.3.0 (2024/05/30)

* ⬆️ Upgrade all deps
* 🏷️ Evolve typing to allow usage of LazyAttribute, Sequence etc... outside of factory definition and directly within factories instances.
* 💥 *BREAKING CHANGE* : Drop support for node 18, start support for node 20

## v0.2.1 (2023/08/28)

* ⬆️ Upgrade all deps
* ✨ Adding a first version of SECURITY.md file (quite empty for now)
* ✏️ Correct typo in copyright in LICENSE
* 🔧 Dependabot config: .github config

## v0.2.0 (2023/03/21)

### Changes

**Breaking changes**:
💥 Drop support for node 16, start support for node 18

* ⬆️ Upgrade all deps
* ⬆️ Migrate to node 18
* 🏷️ Fix typing errors with migration

## v0.1.0 (2022/06/28)

### Changes

🎉 New contributor: @matthieuMay (<https://github.com/matthieuMay>)

* ⬆️ Migrate to typeorm 0.3 and remove peer dep
* 🔧 Move to node 16 (LTS)
* 🙈 DS_Store in gitignore
* 📝 fix import origin in documentation

## v0.0.3 (2022/01/13)

### Changes

* 🚸 Factory: Allow to pass entity key even if absent from factory in .create/.build input

## v0.0.2

❌ This version has been removed from the repository.

## v0.0.1 (2022/01/12)

🎉 First release with the following features:

* Typeorm adapter, Object adapter
* Factories accept subfactories, sequences, lazy attributes, lazy sequences and functions as attributes
* Post generation hooks
* Fuzzy generation with Fakerjs/Chancejs/...is possible
* TypeScript support
