import type { FC } from 'react'
import React from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useTableMeasures,
  Spinner,
  EXPERIMENTAL_useTableSort as useTableSort,
  EXPERIMENTAL_useTableVisibility as useTableVisibility,

  // EXPERIMENTAL_useCheckboxTree as useColumnsWithCheckboxes
} from 'vtex.styleguide'

import EmptyTable from '../EmptyTable'

const TableV2: FC<TableData> = (props) => {
  const measures = useTableMeasures({ size: props.items.length })
  const sorting = useTableSort()
  let hiddenColumns = [...props.schemaTable]
  const visibility = useTableVisibility({
    columns: props.schemaTable,
    hiddenColumns: [],
  })

  const buttonColumns = {
    label: 'Toggle visible fields',
    showAllLabel: 'Show All',
    hideAllLabel: 'Hide All',
    visibility,
  }

  if (props.hiddenColumn?.length) {
    hiddenColumns = hiddenColumns.filter((val: any) => !props.hiddenColumn?.includes(val.id))
  }

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
            columns={props.hiddenColumn?.length ? hiddenColumns : visibility.visibleColumns}
            highlightOnHover
            sorting={sorting}
            visi
          >
            <Table.Toolbar>
              <Table.Toolbar.ButtonGroup>
                <Table.Toolbar.ButtonGroup.Columns {...buttonColumns} />
              </Table.Toolbar.ButtonGroup>
            </Table.Toolbar>
          </Table>
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
