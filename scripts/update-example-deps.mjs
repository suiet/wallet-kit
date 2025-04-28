#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
  // Read the source package.json from packages/kit
  const sourcePackageJsonPath = path.join(rootDir, 'packages', 'kit', 'package.json');
  const sourcePackageJson = JSON.parse(await fs.readFile(sourcePackageJsonPath, 'utf8'));
  
  // Extract the versions we need to sync
  const walletKitVersion = sourcePackageJson.version;
  const suiVersion = sourcePackageJson.peerDependencies['@mysten/sui'];
  
  console.log(`Source versions - @suiet/wallet-kit: ${walletKitVersion}, @mysten/sui: ${suiVersion}`);
  
  // Look for package.json files in examples and website directories
  const examplesDir = path.join(rootDir, 'examples');
  const websiteDir = path.join(rootDir, 'website');
  
  // Get all example directories
  const exampleDirs = await fs.readdir(examplesDir);
  
  // Track if any files were updated
  let updatedFiles = [];
  
  // Process each example directory
  for (const exampleDir of exampleDirs) {
    const packageJsonPath = path.join(examplesDir, exampleDir, 'package.json');
    try {
      const updated = await updatePackageJson(packageJsonPath, walletKitVersion, suiVersion);
      if (updated) {
        updatedFiles.push(packageJsonPath);
      }
    } catch (error) {
      console.error(`Error updating ${packageJsonPath}:`, error.message);
    }
  }
  
  // Process website directory
  const websitePackageJsonPath = path.join(websiteDir, 'package.json');
  try {
    const updated = await updatePackageJson(websitePackageJsonPath, walletKitVersion, suiVersion);
    if (updated) {
      updatedFiles.push(websitePackageJsonPath);
    }
  } catch (error) {
    console.error(`Error updating ${websitePackageJsonPath}:`, error.message);
  }
  
  if (updatedFiles.length > 0) {
    console.log(`✅ Updated ${updatedFiles.length} package.json files`);
    
    // Create git commit for the changes
    try {
      // Add all updated files
      await execAsync(`git add ${updatedFiles.join(' ')}`);
      
      // Create commit
      const commitMessage = `chore: update examples and website to wallet-kit v${walletKitVersion} and sui v${suiVersion}`;
      await execAsync(`git commit -m "${commitMessage}"`);
      
      console.log(`✅ Created git commit: ${commitMessage}`);
    } catch (error) {
      console.error('Failed to create git commit:', error.message);
    }
  } else {
    console.log('No files were updated. All dependencies are already at the correct versions.');
  }
}

async function updatePackageJson(packageJsonPath, walletKitVersion, suiVersion) {
  // Read the target package.json
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  
  let updated = false;
  
  // Update dependencies if they exist
  if (packageJson.dependencies && packageJson.dependencies['@suiet/wallet-kit']) {
    console.log(`Updating @suiet/wallet-kit from ${packageJson.dependencies['@suiet/wallet-kit']} to ${walletKitVersion} in ${packageJsonPath}`);
    packageJson.dependencies['@suiet/wallet-kit'] = walletKitVersion;
    updated = true;
    
    if (packageJson.dependencies['@mysten/sui']) {
      console.log(`Updating @mysten/sui from ${packageJson.dependencies['@mysten/sui']} to ${suiVersion} in ${packageJsonPath}`);
      packageJson.dependencies['@mysten/sui'] = suiVersion;
      updated = true;
    }
  }
  
  if (updated) {
    // Write the updated package.json
    await fs.writeFile(
      packageJsonPath, 
      JSON.stringify(packageJson, null, 2) + '\n',
      'utf8'
    );
    console.log(`Updated ${packageJsonPath}`);
  } else {
    console.log(`No updates required for ${packageJsonPath}`);
  }
  
  return updated;
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
