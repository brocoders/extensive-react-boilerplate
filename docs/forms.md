# Forms

## Table of Contents <!-- omit in toc -->

- [Forms](#forms)
  - [Introduction](#introduction)
  - [Rules](#rules)
    - [Do not depend your form's structure on backend's request or response](#do-not-depend-your-forms-structure-on-backends-request-or-response)
    - [Use `reset` function for set data for editing.](#use-reset-function-for-set-data-for-editing)

## Introduction

For building forms we use [react-hook-form](https://react-hook-form.com/) package which help us to build performant forms with minimal effort.

## Rules

### Do not depend your form's structure on backend's request or response

Often backend send or receive data comfortable for them, but not for frontend and this grow bad forms. To avoid problem with this we recommend to use `transform` function for transform data from backend to frontend and vice versa.

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

### Use `reset` function for set data for editing.

`reset` function is provided by `useForm` hook. Do not use `setValue` function for set data for editing. This function is provided by `useForm` hook too, but will not put data as default values, this can grow bugs with form's state, like `isDirty`, etc.

---

Previous: [Testing](testing.md)
