# Module Structure

Each module is a directory with the following structure:

```
module-name/
├── index.ts
├── other-files.ts
```

## Entry file

:::warning Import Module
When you want to import a module, you should not import from `@fastjs/core/module-name`, you should import from `@fastjs/core`.

Importing modules with a wrong method will cause a lot of problems.
:::

The entry file is `index.ts`. It is the only file that is exported from the module.

## Entry file content

In the entry file, it usually contains the following content:

```typescript
/*   Module Main Class(es)   */
import FastjsModuleBaseClass from './fastjsModuleBaseClass';

/*   Encapsulated Function(s)   */
const func = (x: number, y: string) => {
    return new FastjsModuleBaseClass(x, y).solution();
};

/*   Exports   */
export default {
    func
}
export {
    FastjsModuleBaseClass
}
```

As you can see, we write some common functions in the entry file for basic use.

If you want to customize the usage, you can import the class and use it directly.

## Other files

Other files may includes:
- classes
- functions
- interfaces
- types
- etc.