export const asc = (by: string) => (a: any, b: any) =>
    a.props[by] > b.props[by] ? 1 : -1;

export const desc = (by: string) => (a: any, b: any) =>
    a.props[by] > b.props[by] ? -1 : 1;
