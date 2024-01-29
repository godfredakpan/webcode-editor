const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const { writeFile, unlink } = require('fs/promises');
const { join } = require('path');


const executeCode = async (req, res) => {
  const { language, code } = req.body;

  if (!language) {
    res.status(400).json({ error: 'Language not specified' });
    return;
  }

  const fileExtensionMap = {
    python: 'py',
    typescript: 'ts',
    javascript: 'js',
  };

  const fileExtension = fileExtensionMap[language];

  if (!fileExtension) {
    res.status(400).json({ error: 'Unsupported language' });
    return;
  }

  console.log('Language:', language);
  console.log('Code:', code);

  try {
    const tempFilePath = join(__dirname, `Files/temp.${fileExtension}`);
    await writeFile(tempFilePath, code, 'utf-8');

    if (language === 'python') {
        
      const result = await execFile('python', [tempFilePath]);
      res.json({ output: result.stdout });
    } else if (language === 'typescript' || language === 'javascript') {
      await execFile('tsc', ['--outDir', __dirname, tempFilePath]);
      const result = await execFile('node', [join(__dirname, 'temp.js')]);
      res.json({ output: result.stdout });
    } else {
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ error: 'Error executing code' });
  } finally {
    try {
      const tempFilePath = join(__dirname, `Files/temp.${fileExtension}`);
      await unlink(tempFilePath);
    } catch (cleanupError) {
      console.error('Error cleaning up:', cleanupError);
    }
  }
};

module.exports = { executeCode };
