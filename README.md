# Examples for GitHub Actions

You can choose to write your GitHub actions using either Docker or JavaScript.
The _action.yml_ file is called _metadata file_ and uses the [metadata syntax for GitHub Actions](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions).

> Docker and JavaScript actions require a metadata file. The metadata filename must be either action.yml or action.yaml. The data in the metadata file defines the inputs, outputs and main entrypoint for your action ([about YAML syntax for GitHub Actions](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#about-yaml-syntax-for-github-actions)).

## Deploy with scp (Docker Action)

This action uses a Docker container to copy files with scp.

The [Dockerfile](./.github/actions/deploy-with-scp-docker/Dockerfile) executes [entrypoint.sh](./.github/actions/deploy-with-scp-docker/entrypoint.sh) and this script executes _sshpass_ with the values of the input fields which are declared in the [action.yml](./.github/actions/deploy-with-scp-docker/action.yml) metadata file.

Set the values for _runs:_ in your _action.yml_ to specify which Dockerfile to use

```yml
runs:
  using: "docker"
  image: "Dockerfile"
```

_Dockerfile_

```Dockerfile
FROM alpine:3.11.6
RUN apk add --update openssh sshpass
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
```

To access the value of an input field inside your _entrypoint.sh_ you have to add the prefix \_\$INPUT\_\_\_ and use uppercase letters.

_entrypoint.sh_

```bash
#!/bin/sh -l
export SSHPASS=$INPUT_PASSWORD
sshpass -e scp -r -q -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $INPUT_SOURCE $INPUT_USERNAME@$INPUT_HOSTNAME:$INPUT_TARGET
```

For more information checkout the [documentation about creating a Docker container action](https://help.github.com/en/actions/creating-actions/creating-a-docker-container-action) and the [documentation about Dockerfile support](https://help.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions).

## Deploy with sftp (JavaScript Action)

This action uses Node.js to copy files with sftp.

The [index.js](./.github/actions/deploy-with-sftp-javascript/index.js) uses the [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client) package with the input fields which are declared in the [action.yml](./.github/actions/deploy-with-sftp-javascript/action.yml) metadata file to upload files with sftp.

Set the values for _runs:_ in your _action.yml_ to specify which JavaScript file to execute. We use the _deploy-with-sftp-javascript/dist/index.js_ file because the _deploy-with-sftp-javascript/index.js_ file got compiled using [@zeit/ncc](https://github.com/zeit/ncc).

> As an alternative to checking in your node_modules directory you can use a tool called zeit/ncc to compile your code and modules into one file used for distribution ([commit, tag and push your action to GitHub documentation](https://help.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github)).

```yml
runs:
  using: "node12"
  main: "dist/index.js"
```

To access the value of an input field inside your _index.js_ you have to use the [@actions/core](https://www.npmjs.com/package/@actions/core) package.

_index.js_

```js
const core = require("@actions/core");
const SftpClient = require("ssh2-sftp-client");

async function main() {
  const client = new SftpClient();
  const source = core.getInput("source");
  const target = core.getInput("target");
  const sftpConfig = {
    host: core.getInput("hostname"),
    username: core.getInput("username"),
    password: core.getInput("password"),
  };

  try {
    await client.connect(sftpConfig);
    client.on("upload", (info) => {
      console.log(`Uploaded ${info.source}`);
    });
    return await client.uploadDir(source, target);
  } finally {
    client.end();
  }
}

main()
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    core.setFailed(err.message);
  });
```

For more information checkout the [documentation about creating a JavaScript container action](https://help.github.com/en/actions/creating-actions/creating-a-javascript-action) and the [GitHub Actions Toolkit](https://github.com/actions/toolkit) is a really great collections of useful packages for developing GitHub JavaScript actions.
