import type { FC } from 'react'
import React from 'react'
import { EmptyState } from 'vtex.styleguide'

const EmptyTable: FC = () => {
  return (
    <div className="mt5">
      <EmptyState title="There's nothing here">
        <p>Use the filters to search and display data</p>
      </EmptyState>
    </div>
  )
}

export default EmptyTable
