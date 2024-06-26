/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
	useTabs: true,
	printWidth: 100,
	singleQuote: false,
	trailingComma: "none",
	semi: true,
	quoteProps: "consistent",
	endOfLine: "lf",
	bracketSpacing: true,
	arrowParens: "always"
};

// {
//   "arrowParens": "always",
//   "bracketSpacing": true,
//   "embeddedLanguageFormatting": "auto",
//   "htmlWhitespaceSensitivity": "css",
//   "insertPragma": false,
//   "jsxBracketSameLine": false,
//   "jsxSingleQuote": false,
//   "proseWrap": "preserve",
//   "quoteProps": "as-needed",
//   "requirePragma": false,
//   "semi": true,
//   "singleQuote": false,
//   "tabWidth": 2,
//   "trailingComma": "es5",
//   "useTabs": false,
//   "vueIndentScriptAndStyle": false,
//   "printWidth": 100
// }
