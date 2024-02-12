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
10. `
11.  
 
