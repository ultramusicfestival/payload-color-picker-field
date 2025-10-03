'use client'

import type { ChangeEvent} from 'react';

import { useConfig, useField, useLocale, withCondition } from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import type { ColorPickerFieldClientComponent } from './types'

import './index.scss'
import { isFieldRTL } from '../../utils/isFIeldRTL'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles'
import { ColorPickerInput } from './Input'

const ColorPickerField: ColorPickerFieldClientComponent = (props) => {
  const {
    colors,
    field,
    field: {
      admin: { className, description, placeholder, rtl } = {},
      label,
      localized,
      maxLength,
      minLength,
      required,
    },
    inputRef,
    path,
    readOnly,
    validate,
  } = props

  const locale = useLocale()

  const {
    config: {
      localization
    }
  } = useConfig()

  const memoizedValidate = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, maxLength, minLength, required })
      }
    },
    [validate, minLength, maxLength, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = useField({
    path,
    validate: memoizedValidate,
  })

  const renderRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== value) {
      setValue(e.target.value);
    }
  }, [value, setValue])

  return (
    <ColorPickerInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      colors={colors}
      Description={Description}
      description={description}
      Error={Error}
      inputRef={inputRef}
      Label={Label}
      label={label}
      localized={localized}
      onChange={handleChange}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={renderRTL}
      showError={showError}
      style={styles}
      value={(value as string) || ''}
    />
  )
}

export const ColorPickerFieldComponent: ColorPickerFieldClientComponent = withCondition(ColorPickerField)
