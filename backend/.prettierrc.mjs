/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,
    singleQuote: true,
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    importOrder: [
        '<BUILTIN_MODULES>',
        '<THIRD_PARTY_MODULES>',
        '^./(.*)$',
        '^../(.*)$',
        '^@/(.*)$',
        '<TYPES>',
        '<TYPES>^(@)',
        '<TYPES>^[.]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};

export default config;
