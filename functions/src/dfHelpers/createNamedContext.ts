export const createNamedContext = (
  name: string,
  parameters: Record<string, string>
) => ({
  name,
  lifespan: 1,
  parameters,
});
