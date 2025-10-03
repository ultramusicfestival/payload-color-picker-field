import type { Field, TextField } from "payload"

const PACKAGE_NAME = '@ultramusicfestival/payload-color-picker-field'

export const colorPickerField = (
  options?: {
    colors?: string[]
  } & Partial<TextField>,
): Field => {
  const { colors, ...rest } = options || {}

  return {
    ...rest,
    name: rest?.name || 'colorPicker',
    type: 'text',
    admin: {
      ...rest?.admin,
      components: {
        ...rest?.admin?.components,
        Field: {
          clientProps: {
            colors
          },
          path: `${PACKAGE_NAME}/components#ColorPickerFieldComponent`,
        },
      },
    },
    label: rest?.label || 'Color Picker',
  } as TextField
}
