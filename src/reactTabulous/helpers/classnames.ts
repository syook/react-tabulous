function classnames(...classNames: Array<string | Record<string, boolean>>): string {
  const finalClassNames: string[] = [];

  for (let i = 0; i < classNames.length; i++) {
    const arg = classNames[i];
    if (typeof arg === 'string') {
      finalClassNames.push(arg);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          finalClassNames.push(key);
        }
      }
    }
  }

  return finalClassNames.join(' ');
}

export default classnames;
