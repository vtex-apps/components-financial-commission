import type { FC } from 'react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { DatePicker } from 'vtex.styleguide'
import { addDays } from 'date-fns'

const DatePickerComponent: FC<DatepickerProps> = (props) => {
  const { culture } = useRuntime()

  return (
    <div className="flex flex-nowrap">
      <div id="datepicker-left">
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-start" />}
          value={
            props.startDateFilter !== ''
              ? props.startDateFilter
              : props.startDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(start: Date) => props.changeStartDate(start)}
          locale={culture.locale}
          size="small"
        />
      </div>
      <div id="datepicker-right">
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-final" />}
          value={
            props.finalDateFilter !== ''
              ? props.finalDateFilter
              : props.finalDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(final: Date) => props.changeFinalDate(final)}
          locale={culture.locale}
          size="small"
        />
      </div>
    </div>
  )
}

export default DatePickerComponent
