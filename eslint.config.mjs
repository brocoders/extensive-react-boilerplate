import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // Base JavaScript recommendations
  js.configs.recommended,

  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
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
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "array-callback-return": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      eqeqeq: "error",
      "no-alert": "error",
      "no-return-assign": "error",
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
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "playwright-report/**",
      "test-results/**",
      "*.config.js",
      "*.config.mjs",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
