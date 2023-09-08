# FridGPT Angular Frontend

## Tests

### Location

The test files are located next to the files they test. They are named `<file_name>.spec.ts`.

A dedicated folder named `tests` contains helper functions and fake services used in the tests.

### Run

To run all the frontend tests, cd into the `frontend` folder and run :

```bash
npm test
```

This command will find every test file following this naming convention: `<file_name>.spec.ts`. and will run them.

We configured the project so that the command `ng test` runs the tests only once (set --watch=true in the angular.json to run build when files changes)

To run specific files, you can specify a component folder to run the test associated with a single component, just run : 

```bash
ng test --include='**/componentFolder/*.spec.ts'
```

for example, to run the "recipe" component test simply run:
```bash
ng test --include='**/recipe/*.spec.ts'
```

### Others

HTML elements with the 'test-id' attributes are elements used in the tests. the 'test-id' is used to locate them.
We did not use ids or class names to avoid a strong link between them and the tests and avoid breaking the tests every time we change class names.
Using additionnal attributes makes it also very easy to spot the elements covered / used by the tests.

### Linter

We have added ESLint to our project to improve code quality and maintainability. 
ESLint is a static code analysis tool that helps identify and fix code issues, enforce coding style guidelines, and catch potential bugs.

to run it simply run 
```bash
ng lint
```
By default, this command will analyze all the TypeScript and HTML files in the project using the linting rules defined in the project's configuration.
