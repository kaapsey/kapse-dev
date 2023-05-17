import prompts from 'prompts';
import spawn from 'cross-spawn';
import path from 'path';
import fs from 'fs';

type FrameWork = {
    name: string;
    displayName: string;
    color: string;
    variants: FrameWorkVariant[];
}
type FrameWorkVariant = {
    name: string;
    displayName: string;
    color: string;
    cssVariants: FrameWorkVariantCss[];
}
type FrameWorkVariantCss = {
    name: string;
    displayName: string;
    color: string;
}

const CSS_VARIANTS: FrameWorkVariantCss[] = [
    {
        name: 'chakra-ui',
        displayName: 'Chakra UI',
        color: 'teal',
    },
    {
        name: 'tailwind-css',
        displayName: 'Tailwind CSS',
        color: 'blue',
    },
];

const FRAMEWORKS: FrameWork[] = [
    {
        name: 'react',
        displayName: 'React',
        color: 'blue',
        variants: [
            {
                name: 'react-ts',
                displayName: 'React + TypeScript',
                color: 'blue',
                cssVariants: CSS_VARIANTS,
            },
            {
                name: 'react-js',
                displayName: 'React + JavaScript',
                color: 'yellow',
                cssVariants: CSS_VARIANTS,
            },
        ],
    },
    {
        name: 'next',
        displayName: 'Next.js',
        color: 'yellow',
        variants: [
            {
                name: 'next-ts',
                displayName: 'Next + TypeScript',
                color: 'blue',
                cssVariants: CSS_VARIANTS,
            },
            {
                name: 'next-js',
                displayName: 'Next + JavaScript',
                color: 'yellow',
                cssVariants: CSS_VARIANTS,
            },
        ],
    }
];

export async function init() {
    // const args = process.argv.slice(2);

    let result: prompts.Answers<'projectName' | 'framework' | 'frameworkVariant' | 'cssVariant'>;

    try {
        // get project name, framework, framework variant and css variant from user
        result = await prompts([
            {
                type: 'text',
                name: 'projectName',
                message: 'Project name:',
            },
            {
                type: 'select',
                name: 'framework',
                message: 'Select the Framework:',
                choices: FRAMEWORKS.map((framework) => ({
                    title: framework.displayName,
                    value: framework.name,
                })),
            },
            {
                type: 'select',
                name: 'frameworkVariant',
                message: 'Select the Framework Variant:',
                choices: (prev) => FRAMEWORKS.find((framework) => framework.name === prev)?.variants.map((variant) => ({
                    title: variant.displayName,
                    value: variant.name,
                })),
            },
            {
                type: 'select',
                name: 'cssVariant',
                message: 'Select the CSS Variant:',
                choices: CSS_VARIANTS.map((variant) => ({
                    title: variant.displayName,
                    value: variant.name,
                })),
            },
        ]);
    } catch (error: any) {
        // handle cancellation
        console.log(error.message);
        return;
    }

    const { projectName, framework, frameworkVariant, cssVariant } = result;

    let command: string = '';

    // get the command for creating the project based on framework
    switch (framework) {
        case 'react':
            command = getViteCommand(projectName, frameworkVariant);
            break;
        case 'next':
            command = getNextCommand(projectName, frameworkVariant, cssVariant);
            break;
    }

    // scaffold the next or react project using vite or next cli
    spawn.sync(command, { stdio: 'inherit', shell: true });

    // use the user selected options to update the scaffold project to match the templates
    // get the correct template directory path
    const dir = getTemplateDir(framework, frameworkVariant, cssVariant);

    // copy the template directory to the project directory
    copyTemplate(dir, projectName);
}

// get vite command for creating react or react-ts project
function getViteCommand(projectName: string, frameworkVariant: string) {
    let command: string = `npm create vite@latest ${projectName}`;

    if(getNpmVersion() >= '7.0.0') {
        command += ' --';
    }

    switch(frameworkVariant) {
        case 'react-js':
            command += ' --template react';
            break;
        case 'react-ts':
            command += ' --template react-ts';
            break;
    }

    return command;
}

// get next js command for creating next or next-ts project
function getNextCommand(projectName: string, frameworkVariant: string, cssVariant: string) {
    let command: string = `npx create-next-app ${projectName}`;

    switch(frameworkVariant) {
        case 'next-js':
            command += ` --js --no-eslint --src-dir --app --import-alias @/*`;
            break;
        case 'next-ts':
            command += ` --ts --no-eslint --src-dir --app --import-alias @/*`;
            break;
    }

    switch(cssVariant) {
        case 'chakra-ui':
            command += ` --no-tailwind`;
            break;
        case 'tailwind-css':
            command += ` --tailwind`;
            break;
    }

    return command;
}

// get the version of npm installed
function getNpmVersion() {
    const npmVersion = spawn.sync('npm', ['-v']).stdout.toString().trim();
    return npmVersion;
}

// get the template directory according to selected framework, frameworkVariant and cssVariant
function getTemplateDir(framework: string, frameworkVariant: string, cssVariant: string) {

    // resolving the path to the template directory
    let templateDir = 'templates';

    switch(framework) {
        case 'react':
            templateDir += '/react/template-react';

            if(frameworkVariant === 'react-ts') {
                templateDir += '-ts';
            }
            break;
        case 'next':
            templateDir += '/next/template-next';
            
            if(frameworkVariant === 'next-ts') {
                templateDir += '-ts';
            }
            break;
    }

    switch(cssVariant) {
        case 'chakra-ui':
            templateDir += '-chakra';
            break;
        case 'tailwind-css':
            templateDir += '-tailwind';
            break;
    }
    
    // removing build from __dirname
    const correctDir = __dirname.replace('build', '');

    // return the resolved path
    return path.resolve(correctDir, templateDir);
}

// copy the template directory to the project directory
function copyTemplate(dir: string, projectName: string) {

    // read the template directory and copy the files and directories to the project directory
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if(fileStat.isFile()) {
            fs.copyFileSync(filePath, path.join(projectName, file));
        } else if(fileStat.isDirectory()) {

            // ignore node_modules directory
            if(file === 'node_modules') {
                return;
            }

            // if config directory is present in the template directory, execute extra configuration
            if(file === 'config') {
                configuration(filePath, path.join(projectName));
                return;
            }

            // check if the directory is present in the project directory, if not create it
            if(!fs.existsSync(path.join(projectName, file))) {
                fs.mkdirSync(path.join(projectName, file));
            }

            copyTemplate(filePath, path.join(projectName, file));
        }
    });
}

// extra configuration for the project
function configuration(dir: string, projectDir: string) {
    // get the config.json file from the template directory
    const config = require(path.join(dir, 'config.json'));

    // get the package.json file from the project directory
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json')).toString());

    // leave all the package.json scripts as it is, and add scripts, dependencies and devDependencies from config.json
    packageJson.scripts = {
        ...packageJson.scripts,
        ...config.package.scripts,
    };

    packageJson.dependencies = {
        ...packageJson.dependencies,
        ...config.package.dependencies,
    };

    packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...config.package.devDependencies,
    };

    // write the updated package.json file to the project directory
    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));
}