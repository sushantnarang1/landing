import { cpSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const stagingDirectory = mkdtempSync(join(tmpdir(), 'narangos-static-'));
const excludedDirectories = new Set(['.git', '.next', 'build', 'node_modules', 'out']);

try {
  cpSync(projectRoot, stagingDirectory, {
    recursive: true,
    filter(source) {
      const path = relative(projectRoot, source);
      if (!path) return true;

      const parts = path.split(sep);
      if (parts.some((part) => excludedDirectories.has(part) || part.startsWith('.env'))) {
        return false;
      }

      return !(parts[0] === 'src' && parts[1] === 'app' && parts[2] === 'api');
    },
  });

  symlinkSync(join(projectRoot, 'node_modules'), join(stagingDirectory, 'node_modules'), 'dir');

  const pagesBasePath = process.env.NEXT_BASE_PATH ?? '';
  const build = spawnSync('npm', ['run', 'build', '--', '--webpack'], {
    cwd: stagingDirectory,
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_EXPORT: 'true',
      NEXT_BASE_PATH: pagesBasePath,
    },
  });

  if (build.error) throw build.error;
  if (build.status !== 0) process.exitCode = build.status ?? 1;
  else {
    const outputDirectory = join(projectRoot, 'out');
    rmSync(outputDirectory, { recursive: true, force: true });
    cpSync(join(stagingDirectory, 'out'), outputDirectory, { recursive: true });
    writeFileSync(join(outputDirectory, '.nojekyll'), '');
    console.log(`Static site exported to ${outputDirectory}`);
  }
} finally {
  rmSync(stagingDirectory, { recursive: true, force: true });
}
