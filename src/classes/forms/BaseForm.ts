type FormMap<T> = { [key: string]: T | BaseForm<any> | undefined };

export class BaseForm<T> {
  form: FormMap<T>;

  constructor(initial?: FormMap<T>) {
    this.form = initial || {};
  }

  set(key: string, value: T | undefined) {
    this.form[key] = value;
  }

  asObject(): object | Array<any> {
    const form: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(this.form)) {
      const formValue = value instanceof BaseForm ? value.asObject() : value;

      form[key] = formValue;
    }

    return form;
  }
}
