export function deprecatedWarn(param: string | {name: string, message: string, migrationDoc?: string}) {
  if (typeof param === 'string') {
    console.warn(`[DEPRECATED] ${param}`);
    return;
  }
  const {name, message, migrationDoc} = param;
  console.warn(`[DEPRECATED] ${name} is no longer supported. ` + message + (migrationDoc ? ` | Check migration doc: ${migrationDoc}` : ''))
}