# Forms

## Table of Contents <!-- omit in toc -->

- [Forms](#forms)
  - [Introduction](#introduction)
  - [Rules](#rules)
    - [Do not depend your form's structure on backend's request or response](#do-not-depend-your-forms-structure-on-backends-request-or-response)
    - [Use the `reset` function to set data for editing.](#use-the-reset-function-to-set-data-for-editing)

## Introduction

For building forms we use [react-hook-form](https://react-hook-form.com/) package which help us to build performant forms with minimal effort.

## Rules

### Do not depend your form's structure on backend's request or response

Often, the backend sends or receives data in a format comfortable for them, but not for the frontend, leading to poorly designed forms. To avoid problems like this, we recommend using the transform function to convert data from the backend to the frontend and vice versa.

Example:

```ts
const backendData = {
  first_name: 'John',
  email: 'some@example.com',
  role_id: 1,
};

// Some code here...

const transformIn = (data) => ({
  firstName: data.first_name,
  email: data.email,
  role: {
    id: data.role_id,
  }
});

const transformOut = (data) => ({
  first_name: data.firstName,
  email: data.email,
  role_id: data.role.id,
});

// Some code here...

const { reset } = useForm(
  // Some code here...
);

useEffect(() => {
  reset(transformIn(backendData))
}, []);

// Some code here...

const onSubmit = (data) => {
  const transformedData = transformOut(data);
  // Some code here...
};
```

### Use the `reset` function to set data for editing.

The `reset` function is provided by the `useForm` hook. Do not use the `setValue` function to set data for editing. This function is also provided by the `useForm` hook, but it will not set data as default values. This can lead to bugs in the form's state, such as `isDirty`, etc.

---

Previous: [Testing](testing.md)
