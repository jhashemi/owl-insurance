export const createTaskAttributesContext = (attributes: object) => ({
  name: "task-attributes",
  lifespan: 1,
  parameters: {
    task_attributes: attributes,
  },
});
