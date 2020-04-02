/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

import path from 'path';
import fs from 'fs-extra';
import { Tree } from './type';

type Props = {
  paths: Tree,
  loc: string,
};

type Copier = (docPath: string, filePath: string) => Promise<void>;

/**
 * Copies a documentation file or resource to a location within the docs structure.
 *
 * @param docPath The absolute path of the source document.
 * @param filePath The path of the target document relative to `process.cwd`
 */
const copyFile: Copier = (docPath: string, filePath: string) => {
  const relPath = path.relative(process.cwd(), docPath);
  try {
    return fs.copy(relPath, filePath, { overwrite: false });
  } catch (error) {
    console.warn('Error writing', filePath, relPath, error);
    return Promise.resolve();
  }
};

/**
 * Symlinks a documentation file or resource to a location within the docs structure.
 *
 * @param docPath The absolute path of the source document.
 * @param filePath The path of the target document relative to `process.cwd`
 */
const symlinkFile: Copier = (docPath: string, filePath: string) => {
  const relPath = path.relative(path.dirname(filePath), docPath);
  try {
    console.log('ensureSymlink', docPath, relPath, filePath);
    return fs.ensureSymlink(relPath, filePath);
    // return Promise.resolve();
  } catch (error) {
    console.warn('Error writing', filePath, relPath, error);
    return Promise.resolve();
  }
};

/**
 * Copies or symlinks all doc files from a `Tree` object to their correct locations in the
 * documentation file hierarchy.
 *
 * @param props.loc The path of the root of the target doc hierarchy, relative to `process.cwd`
 * @param props.paths The `Tree` object describing the hierarchy and source file locations.
 */
const writeTree = (props: Props, copier: Copier) => {
  const { paths, loc } = props;
  const promises = [] as Promise<any>[];
  Object.keys(paths).forEach(async (key:string) => {
    try {
      const branch = {
        paths: paths[key],
        loc: path.join(loc, key),
      };
      if (typeof paths[key] === 'object') {
        try {
          fs.ensureDirSync(branch.loc);
          promises.push(writeTree(branch as Props, copier));
        } catch (error) {
          console.warn('Error creating directory', branch, loc, error);
        }
      } else {
        const filePath = path.join(loc, key);
        const docPath = (branch.paths as string);
        promises.push(copier(docPath, filePath));
      }
    } catch (error) {
      console.warn('Error writing key', key, error);
    }
  });
  return Promise.all(promises);
};


/**
 * Copies or symlinks docsify resources to the root of the docs tree.
 *
 * @param loc The path of the root directory of the docs tree, relative to `process.cwd`.
 */
const writeResources = async (loc: string, copier: Copier) => {
  const resourceDir = path.dirname(require.resolve(path.join('..', 'resources', 'index.html')));
  // const resourceDir = '/Users/km/jj/2789-Bodiless-JS';
  console.log('resourceDir', resourceDir);
  const resources = fs.readdirSync(resourceDir)
    .filter(fn => fs.statSync(path.join(resourceDir, fn)).isFile());
  console.log('loc, copier', loc, copier);
  console.log('resources', resources);
  const fn = 'README.md';
  const rootPath = path.resolve('../..', fn);
  const resourcePath = path.join(resourceDir, fn);
  const targetPath = path.join(loc, fn);
  console.log('root path', rootPath);
  const getContent = () => fs.readFileSync(targetPath, 'utf8').substr(0, 100);
  // await copier(rootPath, targetPath);
  // console.log('readme content 1', getContent());
  setTimeout(async () => {
    await copier(resourcePath, targetPath);
    console.log('readme content 2', getContent());
  }, 3000);
  // return resources.map(fn => copier(
  //   path.join(resourceDir, fn),
  //   path.join(loc, fn),
  // ));
};

export {
  writeTree, writeResources, copyFile, symlinkFile,
};
