# React simple form validator
[![Node.js CI](https://github.com/perscrew/react-simple-form-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/perscrew/react-simple-form-validator/actions/workflows/ci.yml)
[![Npm package version](https://badgen.net/npm/v/react-simple-form-validator)](https://www.npmjs.com/package/react-simple-form-validator)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

React simple form validator is a simple library to validate your form fields with `React JS` or `React native`.
The library is easy to use and is written with `typescript`.

The library exposes a `useValidation` hook or a `ValidationComponent` for class based component.

You can view a live demo [here](https://github.com/perscrew/react-simple-form-validator).

## 1. Installation
* Run the following commands :
```sh
# with npm
npm install react-simple-form-validator --save

# or with yarn
yarn add react-simple-form-validator
```

## 2. Use it in your app

### For Functional component:

You will use `useValidation` hook inside your component like this :

```js
import { useValidation } from 'react-simple-form-validator';

const MyFunction = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldRules: {
      email: { email: true },
      name: { required: true }
    },
    state: { email, name }
  });
  
  return (
    <form>
      <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
      <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
    </form>
  );
}
```
You need to pass the form field state to the `useValidation` hook in the `state` propery like above.

You can also pass custom `messages`, `labels`, `rules`, `locale` (check the documentation below).

The description of the `object returned` by the `hook` is :

|Function / Variable|Output|Benefits|
|-------|--------|--------|
|isFormValid|boolean|This variable indicates if the form is valid and if there are no errors.|
|isFieldInError(fieldName: string)|boolean|This function indicates if a specific field has an error. The field name will match with your form state|
|getErrorMessages(separator: string, separator = '\n')|string|This method returns the different error messages bound to your form state. The argument is optional, by default the separator is a \n. Under the hood a join method is used.|
|getErrorsInField(fieldName: string)|string[]|This method returns the error messages bound to the specified field. The field name will match with your form state. It returns an empty array if no error was bound to the field.|
|getErrorsForField(fieldName: string)|Errors|This method returns an `Errors` object containing 3 properties : `fieldName: string`, `failedRules: string[]`, and `messages: string[]`.|
|getFailedRules()|{[fieldName: string]: string[]}|This methods returns the failed rules of your form state|
|getFailedRulesInField(fieldName: string)|string[]|This method returns the failed rules bound to a specific field name.|
### For class component:

Extend "ValidationComponent" class on a your component :
```js
import React from 'react';
import ValidationComponent from 'react-simple-form-validator';

export default class MyForm extends ValidationComponent {
  ...
}
```
The `ValidationComponent` extends the `React.Component` class.

To ensure form validation you have to call the `validate` method in a custom component (herited from `ValidationComponent`)
```js
class ClassForm extends ValidationComponent {
  constructor(props) {
    super(props);

    this.fieldRules = {
      email: { email: true },
      name: { required: true }
    };

    this.state = {
      email: '',
      name: ''
    };
  }

   render() {
    return ( 
        <form>
            <input
              id="email"
              type="email"
              onChange={(e) => this.validate({ email: e.target.value, fieldRules: this.fieldRules })}
              value={this.state.email}
              placeholder="Seize an email"
            />
            <input
              id="name"
              type="text"
              onChange={(e) => this.validate({ name: e.target.value, fieldRules: this.fieldRules })}
              value={this.state.name}
              placeholder="Seize a name"
            />
          <button disabled={!this.isFormValid}>Submit</button>
        </form>
    );
   }
```
The `validate` method takes as first argument the new state to validate. For instance if you have to validate an email, pass the email value.

The second argument is your field rules validation. You can omit this argument if you set the `validation` prop in your component.

Once you have extended `ValidationComponent` your class component can use one of the below methods :

|Method / Member|Output|Benefits|
|-------|--------|--------|
|this.validate(newState, fieldRules?)|void|This method ensures form validation within the object passed in argument. First argument is the new state to validate. Second argument is your field rules validation|
|this.isFormValid|boolean|This member indicates if the form is valid and if there are no errors.|
|this.isFieldInError(fieldName: string)|boolean|This method indicates if a specific field has an error. The field name will match with your React state|
|this.getErrorMessages(separator: string, separator = '\n')|string|This method returns the different error messages bound to your React state. The argument is optional, by default the separator is a \n. Under the hood a join method is used.|
|this.getErrorsInField(fieldName: string)|string[]|This method returns the error messages bound to the specified field. The field name will match with your React state. It returns an empty array if no error was bound to the field.|
|this.getErrorsForField(fieldName: string)|Errors|This method returns an `Errors` object containing 3 properties : `fieldName: string`, `failedRules: string[]`, and `messages: string[]`.|
|this.getFailedRules()|{[fieldName: string]: string[]}|This methods returns the failed rules of your form state|
|this.getFailedRulesInField(fieldName: string)|string[]|This method returns the failed rules bound to a specific field name.|

### Existing rules :

You will find bellow the default rules available in the library [defaultRules.ts](./src/rules/defaultRules.ts) :

|Rule|Benefits|
|-------|--------|
|numbers|Check if a state variable is a number.|
|email|Check if a state variable is an email.|
|required|Check if a state variable is not empty.|
|date|Check if a state variable respects the date pattern. Ex: date: 'YYYY-MM-DD'|
|minlength|Check if a state variable is greater than minlength.|
|maxlength|Check if a state variable is lower than maxlength.|
|equalPassword|Check if a state variable is equal to another value (useful for password confirm).|
|hasNumber|Check if a state variable contains a number.|
|hasUpperCase|Check if a state variable contains a upper case letter.|
|hasLowerCase|Check if a state variable contains a lower case letter.|
|hasSpecialCharacter|Check if a state variable contains a special character.|

You can also extend these rules with your own custom rules :

* For function component :

```js
import { defaultRules } from 'react-simple-form-validator';

// extend default rules with my custom any rule
const customRules = { ...defaultRules, any: /^(.*)$/ };

const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldRules: {
      email: { email: true },
      name: { required: true }
    },
    state: { firstName, lastName, email, civility },
    rules: customRules
  });
```

* For class component :

```js
import { defaultRules } from 'react-simple-form-validator';

// extend default rules with my custom any rule
const customRules = { ...defaultRules, any: /^(.*)$/ };

<FormTest rules={customRules} />

// Or override the custom rules into the super class child constructor

// FormTest.js
class FormTest extends ValidationComponent {
  constructor(props) {
    super({...props, rules: { ...defaultRules, any: /^(.*)$/ }});

    this.fieldRules = {
      email: { email: true },
      name: { required: true }
    };
  }
}
```

### Existing messages :

The library also contains a [defaultMessages.ts](./src/defaultMessages.ts) file which includes the errors label for a language locale.

* For function component :

```js
import { defaultMessages } from 'react-simple-form-validator';

const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
  fieldRules: {
    email: { email: true },
    name: { required: true }
  },
  state: { email, name },
  messages: {
    en: {...defaultMessages.en, numbers: "error on numbers !"},
    fr: {...defaultMessages.fr,numbers: "erreur sur les nombres !"}
  }
});
```

* For class component : 

You can override the `messages` component React props :
```js
import { defaultMessages } from 'react-simple-form-validator';

const messages = {
  en: {...defaultMessages.en, numbers: "error on numbers !"},
  fr: {...defaultMessages.fr,numbers: "erreur sur les nombres !"}
};

<FormTest messages={messages} />
```

### Custom labels for error message interpolation :

You can add custom labels, which will be useful if you want to change the error messages label or translate it to the local language :

* For function component : 

```js
import { defaultMessages } from 'react-simple-form-validator';

const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
  fieldRules: {
    email: { email: true },
    name: { required: true }
  },
  state: { email, name },
  labels: {
    name: 'Name',
    email: 'E-mail',
    number: 'Phone number'
  }
});
```

* For class component : 

```js
const labels = {
  name: 'Name',
  email: 'E-mail',
  number: 'Phone number'
};

<FormTest labels={labels} />

// Or override the custom labels into the super class child constructor

// FormTest.js
class FormTest extends ValidationComponent {
  constructor(props) {
    const labels = {
      name: 'Name',
      email: 'E-mail',
      number: 'Phone number'
    };
    super({...props, labels});

    this.fieldRules = {
      email: { email: true },
      name: { required: true }
    };
  }
}
```

### Specify language locale :

You can specify the default custom local language :

* For function component : 

```js
const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
  fieldRules: {
    email: { email: true },
    name: { required: true }
  },
  state: { email, name },
  locale: 'fr'
});
```

* For class component : 

```js
<FormTest locale="fr" />

// Or override the custom locale into the super class child constructor

// FormTest.js
class FormTest extends ValidationComponent {
  constructor(props) {
    super({...props, locale: 'fr'});

    this.fieldRules = {
      email: { email: true },
      name: { required: true }
    };
  }
}
```

## 3. Complete example

You can find a concrete `Functional component` example on [FunctionForm.tsx](./examples/react-js/src/components/FunctionForm.tsx) (Typescript) :
### Function Component:

```ts
import React, { Fragment, FunctionComponent, useState } from 'react';
import { defaultMessages, defaultRules, FieldsToValidate, useValidation } from 'react-simple-form-validator';

interface FunctionFormProps {
  validation: FieldsToValidate;
}

const FunctionForm: FunctionComponent<FunctionFormProps> = (props) => {
  const [touchedFields, setTouchedFields] = useState({
    civility: false,
    email: false,
    firstName: false,
    lastName: false
  });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [civility, setCivility] = useState('');

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: props.validation,
    state: { firstName, lastName, email, civility },
    rules: { ...defaultRules, customCivilityRule: /^(Mrs|Ms|Miss)$/ },
    messages: {
      ...defaultMessages,
      en: { ...defaultMessages['en'], customCivilityRule: 'Civility is incorrect (Mrs/Ms/Miss)' }
    }
  });

  const onBlurHandler = (event: React.FormEvent<HTMLElement>, field: string) =>
    setTouchedFields((prevFields) => ({ ...prevFields, [field]: true }));

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form values : ', civility, email, firstName, lastName);
    setFirstName('');
    setLastName('');
    setEmail('');
    setCivility('');
    setTouchedFields({ firstName: false, lastName: false, email: false, civility: false });
  };

  return (
    <Fragment>
      <h2>Functional Form</h2>
      <form onSubmit={formSubmitHandler}>
        <div className="form-control">
          <label htmlFor="gender">Civility</label>
          <input
            id="civility"
            type="text"
            onChange={(e) => setCivility(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'civility')}
            value={civility}
            placeholder="Seize a civility (Mrs or Ms or Miss)"
          />
          <p className="error-text">
            {touchedFields.civility && isFieldInError('civility') && getErrorsInField('civility').join('\n')}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'email')}
            value={email}
            placeholder="Seize an email"
          />
          <p className="error-text">
            {touchedFields.email && isFieldInError('email') && getErrorsInField('email').join('\n')}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'firstName')}
            value={firstName}
            placeholder="Seize a first name"
          />
          <p className="error-text">
            {touchedFields.firstName && isFieldInError('firstName') && getErrorsInField('firstName').join('\n')}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="astName">Last Name</label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => onBlurHandler(e, 'lastName')}
            value={lastName}
            placeholder="Seize a last name"
          />
          <p className="error-text">
            {touchedFields.lastName && isFieldInError('lastName') && getErrorsInField('lastName').join('\n')}
          </p>
        </div>
        <div className="actions">
          <button disabled={!isFormValid}>Submit</button>
        </div>
      </form>
    </Fragment>
  );
};

export default FunctionForm;
```
### Class component:

You can find a concrete `Class component` example on [ClassForm.tsx](./examples/react-js/src/components/ClassForm.tsx) (Typescript) :
```ts
import ValidationComponent, { ClassValidationProps, FormState } from 'react-simple-form-validator';
import { Fragment } from 'react';

class ClassForm extends ValidationComponent<ClassValidationProps, FormState> {
  constructor(props: ClassValidationProps) {
    super(props);

    this.state = {
      civility: '',
      email: '',
      firstName: '',
      lastName: '',
      touchedFields: { civility: false, firstName: false, lastName: false, email: false }
    };
  }

  onBlurHandler(event: React.FormEvent<HTMLElement>, field: string): void {
    this.setState({ touchedFields: { ...this.state.touchedFields, [field]: true } });
  }

  formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { civility, email, firstName, lastName } = this.state;

    console.log('Form Values : ', civility, email, firstName, lastName);

    this.setState({
      civility: '',
      email: '',
      firstName: '',
      lastName: '',
      touchedFields: { civility: false, firstName: false, lastName: false, email: false }
    });
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <h2>Class based Form</h2>
        <form onSubmit={this.formSubmitHandler.bind(this)}>
          <div className="form-control">
            <label htmlFor="gender">Civility</label>
            <input
              id="civility"
              type="text"
              onChange={(e) => this.validate({ civility: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'civility')}
              value={this.state.civility}
              placeholder="Seize a civility (Mrs or Ms or Miss)"
            />
            <p className="error-text">
              {this.state.touchedFields.civility &&
                this.isFieldInError('civility') &&
                this.getErrorsInField('civility').join('\n')}
            </p>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={(e) => this.validate({ email: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'email')}
              value={this.state.email}
              placeholder="Seize an email"
            />
            <p className="error-text">
              {this.state.touchedFields.email &&
                this.isFieldInError('email') &&
                this.getErrorsInField('email').join('\n')}
            </p>
          </div>
          <div className="form-control">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              onChange={(e) => this.validate({ firstName: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'firstName')}
              value={this.state.firstName}
              placeholder="Seize a first name"
            />
            <p className="error-text">
              {this.state.touchedFields.firstName &&
                this.isFieldInError('firstName') &&
                this.getErrorsInField('firstName').join('\n')}
            </p>
          </div>
          <div className="form-control">
            <label htmlFor="astName">Last Name</label>
            <input
              id="lastName"
              type="text"
              onChange={(e) => this.validate({ lastName: e.target.value })}
              onBlur={(e) => this.onBlurHandler(e, 'lastName')}
              value={this.state.lastName}
              placeholder="Seize a last name"
            />
            <p className="error-text">
              {this.state.touchedFields.lastName &&
                this.isFieldInError('lastName') &&
                this.getErrorsInField('lastName').join('\n')}
            </p>
          </div>
          <button disabled={!this.isFormValid}>Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default ClassForm;

```

## 4. How to contribute

If you want to contribute to this project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.

### Method 

1. Create a personal fork of the project on Github.
2. Clone the fork on your local machine. 
3. Implement/fix your feature, comment your code.
4. Follow the code style of this project, including indentation.
5. Write or adapt tests as needed.
6. Add or change the documentation as needed.
7. Squash your commits into a single commit with git's interactive rebase. Create a new branch if necessary.
8. Push your branch to your fork on Github, the remote origin.
9. From your fork open a pull request in the correct branch. Target the project's master branch.

### Install the project

Run this command to install the library dependencies :

```sh
npm install
```

Build the library :
```sh
npm run build 
```

Launch tests : 
```sh
# single run
npm run test 

# watch mode
npm run test:watch
```

Run the `React JS` example project :

```sh
cd examples/react-js && yarn install
```

Start the example project :
```
yarn start
```

* If you modify the library don't forget to re-run `npm run build` to apply modifications into the example project.