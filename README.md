<!-- README copied from https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DWC01/dapp-sandbox-contracts">
    <img src="/images/logo.png" alt="Logo" width="419" height="128">
  </a>

  <p align="center">
	Crypto asset tracking made easy.
  </p>
  <br />
  <br />
  <a href="https://blocksight.io/" target="_blank">View Demo</a>
  ·
  <a href="https://github.com/DWC01/blocksight-backend/issues" target="_blank">Report Bug</a>
  ·
  <a href="https://github.com/DWC01/blocksight-backend/issues" target="_blank">Request Feature</a>
</div>

<!-- TABLE OF CONTENTS -->
<br/>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#useful-links">Useful Links</a></li>
  </ol>
</details>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

This project holds the backend code for BlockSight. The frontend code can be found in the [BlockSight Frontend](https://github.com/DWC01/blocksight-frontend) project.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [Docker](https://www.docker.com/)
-   [Kubernetes](https://kubernetes.io/)
-   [Helm](https://helm.sh/)
-   [NestJs](https://nestjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Yarn](https://yarnpkg.com/)
-   [Prettier](https://prettier.io/)
-   [ESLint](https://eslint.org/)

### Deployed On

-   [AWS EKS](https://aws.amazon.com/eks/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-   Node (LTS Version) [Install Instructions](https://github.com/nvm-sh/nvm)

-   Yarn [Install Instructions](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

-   Nest CLI [Install Instructions](https://docs.nestjs.com/cli/overview)

-   Docker [Intall Instructions](https://docs.docker.com/get-docker/)

-   Kubernetes [Intall Instructions](https://kubernetes.io/docs/setup/)

-   Helm [Intall Instructions](https://helm.sh/docs/intro/install/)

-   MiniKube [Intall Instructions](https://minikube.sigs.k8s.io/docs/start/)

-   Telepresence [Install Instructions](https://www.telepresence.io/docs/latest/install/)

### Installation

1. Clone the repo

    ```sh
    git clone git@github.com:DWC01/blocksight-backend.git
    ```

2. Install NPM packages
    ```sh
    yarn
    ```

### Quick Start

1. Start MiniKube (VM for spinning up local nodes)

    ```sh
     yarn mk:start
    ```

2. Startup the Database

    ```sh
    yarn install:psql:dev
    ```

    Export Password:

    ```sh
    export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgresql-development -o jsonpath="{.data.postgresql-password}" | base64 --decode)
    ```

    Forward Port to host:

    ```sh
    kubectl port-forward --namespace default svc/postgresql-development 5432:5432 &
    PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres -d postgres -p 5432
    ```

3. yarn start:dev

### Slow Start (local K8s development)

3. Deploy Kubernetes locally

    ```sh
    cd blocksight-chart
    ```

    ```sh
    yarn deploy:dev
    ```

4. Expose 'blocksight-node-service' with MiniKube Tunnel

    ```sh
    minikube tunnel
    ```

5. Intercept local node server with Telepresence
    ```sh
    telepresence intercept blocksight-node-deployment --port=3001:3001
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Development

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USEFUL LINKS -->

## Useful Links

-   [Kubernetes Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

<p align="right">(<a href="#top">back to top</a>)</p>
