const fs = require('fs');
const presetPath = require.resolve('./index.js');

module.exports = async command => {
  const appDirectory = fs.realpathSync(process.cwd());
  const preset = require(presetPath);
  const action = preset[command];

  try {
    const { persistent = false } = await action({
      context: presetPath,
      workerOptions: { cwd: appDirectory },
    });

    if (!persistent) {
      process.exit(0);
    }
  } catch (error) {
    if (error.name !== 'WorkerError') {
      console.error(error);
    }

    process.exit(1);
  }
};
