import type { FC } from 'react'
import React from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  Spinner,
  EXPERIMENTAL_useTableSort as useTableSort,
  // EXPERIMENTAL_useCheckboxTree as useColumnsWithCheckboxes
} from 'vtex.styleguide'

import EmptyTable from '../EmptyTable'

const TableV2: FC<TableData> = (props) => {
  const measures = useTableMeasures({ size: props.items.length })
  const sorting = useTableSort()

  if (sorting.sorted.by && sorting.sorted.order) {
    props.sorting(sorting.sorted)
  }


  const ColumnsExample = () => {
    return (
      <div>
        {props.items.length > 0 ? (
          <Table
            measures={measures}
            items={props.items}
            columns={props.schemaTable}
            highlightOnHover
            sorting={sorting}
          />
        ) : (
          <EmptyTable />
        )}
      </div>
    )
  }

  if (props.loading) {
    return (
      <div className="tc">
        <Spinner />
      </div>
    )
  }

  return <ColumnsExample />
}

export default TableV2
