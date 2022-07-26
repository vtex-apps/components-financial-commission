import type { FC } from 'react'
import React, { useState } from 'react'
import {
  ButtonWithIcon,
  IconFilter,

  IconDelete,
  ButtonGroup,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { SelectComponent, DatePickerComponent } from './itemsFilter'
import { getDateString, firstDay, yesterday, today } from '../../utils/calculateDate'

const Filter: FC<FilterProps> = (props) => {
  const [dataFilter, setDataFilter] = useState<DateFilter>({
    startDateFilter: firstDay,
    finalDateFilter: props.defaultDate?.today ? today : yesterday,
    dataFilter: [],
    statusFilter: []
  })

  const changesValuesTable = () => {
    let stringId = '', stringStatus = '', countTotalItems = 0
    dataFilter.dataFilter.forEach((item: SellerSelect) => {
      stringId += props.setStatusOrders ? `${item.label},` : `${item.value.id},`
      countTotalItems += 1
    })
    dataFilter.statusFilter.forEach((status) => {
      stringStatus += `${status.label},`
    })
    props.filterDates && props.filterDates(getDateString(dataFilter.startDateFilter), getDateString(dataFilter.finalDateFilter))
    props.setTotalItems && props.setTotalItems(countTotalItems)
    props.setSellerId(stringId.slice(0, -1))
    props.setStatusOrders && props.setStatusOrders(stringStatus.slice(0, -1))
  }

  const modifyDataFilterSeller = (values: any) => {
    setDataFilter({ ...dataFilter, dataFilter: values })
  }

  const modifyDataFilterStatus = (values: any) => {
    setDataFilter({ ...dataFilter, statusFilter: values })
  }

  const changeDate = (date: Date, type: string) => {
    if (type === "start") setDataFilter({ ...dataFilter, startDateFilter: date })
    else if (type === "final") setDataFilter({ ...dataFilter, finalDateFilter: date })
  }

  const cleanFilter = () => {
    const lastDate = props.defaultDate?.today ? today : yesterday
    setDataFilter({ ...dataFilter, dataFilter: [], startDateFilter: firstDay, finalDateFilter: lastDate, statusFilter: [] })
    props.filterDates && props.filterDates(getDateString(firstDay), getDateString(lastDate))
    props.setSellerId('')
    props.setTotalItems && props.setTotalItems(0)
  }

  return (
    <div className="flex flex-wrap pa0">
      {!props.disableSelect && (
        <div className="w-100">
          <SelectComponent
            options={props.optionsSelect}
            dataFilter={dataFilter.dataFilter}
            setDataFilter={modifyDataFilterSeller}
            multi={props.multiValue}
            customLabel={
              <FormattedMessage id="admin/table.title-seller-label" />
            }
          />
        </div>
      )}
      {props.optionsStatus && (
        <div className="w-100 pt5 mb3">
          <SelectComponent
            options={props.optionsStatus}
            dataFilter={dataFilter.statusFilter}
            setDataFilter={modifyDataFilterStatus}
            multi
            customLabel={
              <FormattedMessage id="admin/table.title-status-label" />
            }
          />
        </div>
      )}
      <div className="flex-ns w-100 justify-around items-end justify-end">
        <div className="w-100-ns pt2 pr2">
          <DatePickerComponent
            startDatePicker={dataFilter.startDateFilter}
            changeDate={changeDate}
            finalDatePicker={dataFilter.finalDateFilter}
            today={props.defaultDate ? props.defaultDate.today : false}
          />
        </div>
        <div className="pt7 fr z-0">
          <ButtonGroup
            buttons={[
              <ButtonWithIcon
                isActiveOfGroup
                onClick={() => changesValuesTable()}
                icon={<IconFilter />}
                size="small"
              >
                {<FormattedMessage id="admin/table.title-filter" />}
              </ButtonWithIcon>,
              <ButtonWithIcon
                isActiveOfGroup={false}
                size="small"
                onClick={() => cleanFilter()}
                icon={<IconDelete />}
              />,
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
