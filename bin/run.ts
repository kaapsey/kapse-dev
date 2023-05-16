import prompts from 'prompts';

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

    let result;

    try {
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
        console.log(error.message);
        return;
    }

    // const { packageName } = result;

    console.log(result);
}