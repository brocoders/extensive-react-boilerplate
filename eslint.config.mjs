import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Additional build/test ignores
    "node_modules/**",
    "dist/**",
    "playwright-report/**",
    "test-results/**",
    "*.config.js",
    "*.config.mjs",
  ]),

  // Custom rules and overrides
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      "prettier/prettier": [
        "error",
        {
          tabWidth: 2,
          semi: true,
          endOfLine: "auto",
          singleQuote: false,
          trailingComma: "es5",
        },
      ],

      // TypeScript overrides
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // Code quality rules
      "array-callback-return": "error",
      eqeqeq: "error",
      "no-alert": "error",
      "no-return-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-unsafe-optional-chaining": "error",
      "no-empty-pattern": "error",
      "no-unused-vars": "off", // Let TypeScript handle this

      // React Hook Form best practices
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.property.name=required][callee.object.callee.property.name=nullable]",
          message:
            ".nullable() should be after .required() for correct validation and type inference. Example: id: yup.string().required().nullable()",
        },
        {
          selector:
            "CallExpression[callee.name=watch], MemberExpression[object.name=methods][property.name=watch]",
          message:
            '"watch" re-render the whole form component. Use hook "useWatch" instead.',
        },
        {
          selector:
            "VariableDeclarator > ObjectPattern > Property[key.name=formState]",
          message:
            '"formState" re-render the whole form component. Use hook "useFormState" instead.',
        },
        {
          selector: "MemberExpression[object.name=React][property.name=/^use/]",
          message:
            'Use hooks without "React" prefix. For avoid using both import styles. Example: "useEffect" instead of "React.useEffect".',
        },
        {
          selector:
            "ConditionalExpression[consequent.type=Literal][consequent.value=true][alternate.type=Literal][alternate.value=false]",
          message:
            'Do not use "condition ? true : false". Simplify "someVariable === 42 ? true : false " to "someVariable === 42"',
        },
      ],

      // Import restrictions
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material",
              message:
                "Please use \"import ComponentName from '@mui/material/ComponentName'\" instead.",
            },
            {
              name: "@mui/icons-material",
              message:
                "Please use \"import IconName from '@mui/icons-material/IconName'\" instead.",
            },
            {
              name: "next/link",
              message:
                'Please use "import Link from "@/components/link"" instead. This is need for "leave page" logic',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
