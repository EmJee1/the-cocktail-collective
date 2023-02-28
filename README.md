# The Cocktail Collective

<!-- Describe where this readme is about.  -->

The Cocktail Collective is a community-driven platform to upload and share cocktail recipes.
This is the monorepo that contains the server, client & a shared models package

## ✨ See it in action ✨

| Environment  | Web   | API   |
|--------------|-------|-------| 
| `Production` | `TBD` | `TBD` |

<!--
## 🧰 External tooling

Provide links to external used tooling, like a Sketch, Jira, etc.
-->

## 🚀 Getting started

### Prerequisites

<!-- 
   Which software or libraries are needed to be able to install this project?
 -->

- [WebStorm](https://www.jetbrains.com/webstorm/) or [Visual Studio Code](https://code.visualstudio.com/)
- [Volta](https://docs.volta.sh/guide/getting-started) (recommended) or Node Version Manager ([Mac](https://github.com/nvm-sh/nvm) | [Windows](https://github.com/coreybutler/nvm-windows))
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
- Access to the `the-cocktail-collective` Google project

### Installation

<!-- How to install this project (after having the prerequisites)? -->

[Setup application default credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) in the gcloud cli. 
This is needed to authenticate for gcloud services like Cloud Storage.

```shell
# Make sure you are using the correct node version, Volta does this automatically
# When using nvm, locate the `volta.node` key in `package.json` and set the version accordingly
nvm use <version>

# Install npm dependencies
npm i
```

### Development

<!-- How to actually start developing? -->

```shell
# Run a dev-server for the api
npm run dev -w server

# In a separate terminal, run a dev-server for the client
npm run dev -w client
```

### Deployment / Release process

GitHub Actions are used for automatic code-checking.

- On merge for the main branch:
    - Run tests for the server
    - Run a build for the server

## 🤚 Good to know

<!-- 
  A place to provide extra information (or links to it) about the project.
-->

### Workspaces

We use npm workspaces to manage the monorepo. To install packages, run it in the root and specify which workspace you need it in like this:

```shell
npm i <package> -w server # To install <package> in the server workspace
npm run dev -w client # To run the dev command in the client workspace
```

### Dependabot

We use Dependabot for automatic dependency updates
- Creates a PRs for all outdated dependencies
- Checks for NPM & GitHub Actions dependencies
- Every monday at 6:00 (GMT+1)
