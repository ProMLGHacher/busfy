type Mods = Record<string, boolean | string>
export function classNames(cls: string, mods?: Mods, additional?: (string | undefined)[]): string {
  return [
    cls,
    ...(additional?.filter(Boolean) || []),
    ...(mods ? Object.entries(mods).filter(([_, value]) => Boolean(value))
      .map(([key]) => key) : [])
  ].join(' ');
}