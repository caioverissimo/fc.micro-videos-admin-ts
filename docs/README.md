# FullCycle Course - Projeto prático - TypeScript(Back-end)

src: [Configuração do Dockler](https://plataforma.fullcycle.com.br/courses/3b8c4f2c-aff9-4399-a72a-ad879e5689a2/242/168/196/conteudos?capitulo=196&conteudo=11472)

## Steps

1. Initialize Dockerfile
```yml
FROM node:20.5.1-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]
```

2. Initialize docker-compose.yml
```yml
version: '3'

services:
  app:
    build: .
    command: ./.docker/start.sh
    ports:
      - 3000:3000
    volumes:
      - .:/home/node/app
```

3. Initialize .docker/start.sh
```bash
#!/bin/bash

npm install

tail -f /dev/null
```

4. Adds execution permission to '.docker/start.sh'
```bash
chmod +x .docker/start.sh

```
5. Create a Dev Containers Config file
  THIS ITEM IS BLOCKED BECAUSE AN ISSUE WITH EXTENSION!!!

6. Initializes NPM, scaffolds a typescript project, install jest
```bash
npm init -y
npm i typescript -D
npx tsc --init
npm i jest @types/jest -D
```
7. Adds swc (built in Rust) for transpiling ts to js for jest 
```bash
npm i @swc/core @swc/cli @swc/jest -D
```

8. Generate jest structure
```bash
npx jest --init
```

9. Updates jest.config.ts
```bash
// A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
```
10. Install ts-node
```zsh
npm i ts-node -D
```
11. Integrate with Dev Container.
- Open VS Code Command Palette with the following shortcut: ```Cmd + Shift + P```
- Select "Dev Containers: Open Folder in Container", and choose the project location
  - For "How would you like to create your container configuration?" question, select "From 'docker-compose.yaml"
  - For "Select additional features to install", search for 'zsh', and select both:
    - ZSH Plugins
    - Common Utilities
    - Shell History
  - For "Keep Feature defaults or configure options?", select:
    - Keep Defaults
  - For the warning alert "Workspace does not exist": 
    - Select "Open Workspace"
    - And type the path of the container application:
      - in this case: "/home/node/app" (pay attention for some issued autocompletion. Sometimes VS Code adds '/workspace' at the end. We don't want this for this case). Confirm the path with "Enter" key.
  - WIP (select basically all default options)

12. Update devcontainer settings (fixing some default values applied by the plugin). 
- With opened ".devcontainer/devcontainer.json", replace "workspaceFolder" value with the internal project path, and updates "name" value with any possible project name:
```json
"name": "FC Micro Videos Admin",
```
```json
"workspaceFolder": "home/node/app",
```
- Optional tip: Can be a good addition to devcontainers.json if we specify some zsh plugins like:
```json
		"ghcr.io/devcontainers-contrib/features/zsh-plugins:0": {
			"plugins": "git git-flow F-Sy-H zsh-autosuggestions zsh-completions",
			"omzPlugins": "https://github.com/z-shell/F-Sy-H https://github.com/zsh-users/zsh-autosuggestions https://github.com/zsh-users/zsh-completions"
		},
```
- Now in ".devcontainer/docker-compose.yaml", replace "volumes" property value and comment the "command" property:
```yaml
    volumes:
      # Update this to wherever you want VS Code to mount the folder of your project
      - .:/home/node/app:cached

    # Uncomment the next four lines if you will use a ptrace-based debugger like C++, Go, and Rust.
    # cap_add:
    #   - SYS_PTRACE
    # security_opt:
    #   - seccomp:unconfined

    # Overrides default command so things don't shut down after the process ends.
    # command: /bin/sh -c "while sleep 1000; do :; done"
```
- After any Dev Container files modifications, remember to rebuild the Dev Container: through Command Palette (```Cmd + Shift + P```), select:
  - "Dev Container: Rebuild Container"