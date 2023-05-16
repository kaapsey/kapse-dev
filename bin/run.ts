import prompts from 'prompts';
import spawn from 'cross-spawn';

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