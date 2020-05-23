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
