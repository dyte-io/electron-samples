import { FormEvent, FormEventHandler, useState } from 'react';

export default function useInputs<T>(defaultValues: T) {
  const [values, setValues] = useState<T>(defaultValues);

  const onInput = (key: keyof T) => {
    return (e: FormEvent<HTMLInputElement>) => {
      setValues((values) => ({ ...values, [key]: (e.target as HTMLInputElement).value }));
    };
  };

  return { values, onInput };
}
