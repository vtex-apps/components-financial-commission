/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
import type { DocumentNode } from 'graphql'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { PageBlock, Tag } from 'vtex.styleguide'

import { status } from '../../constants'
import TableComponent from '../Table'
import PaginationComponent from '../Table/pagination'

interface DetailProps {
  invoicesQuery: DocumentNode
  account?: string
  sellerName?: string
  startDate?: string
  finalDate?: string
  dataTableInvoice: Invoice[]
  setDataTableInvoice: (data: Invoice[]) => void
}

const SellerInvoices: FC<DetailProps> = ({
  sellerName,
  invoicesQuery,
  startDate,
  finalDate,
  dataTableInvoice,
  setDataTableInvoice,
}) => {
  const { query } = useRuntime()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

  const { data: dataInvoices } = useQuery(invoicesQuery, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerInvoiceParams: {
        sellerName,
        dates: {
          startDate,
          endDate: finalDate,
        },
        pagination: {
          page,
          pageSize,
        },
      },
    },
  })

  useEffect(() => {
    if (sellerName === '' && !query?.sellerName) {
      setDataTableInvoice([])
      setTotalItems(0)
    }
  }, [query, sellerName, setDataTableInvoice])

  useEffect(() => {
    if (dataInvoices) {
      setDataTableInvoice(dataInvoices.invoicesBySeller.data)
      setTotalItems(dataInvoices.invoicesBySeller.pagination.total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInvoices, sellerName])

  const schemaTableInvoice = [
    {
      id: 'columnId',
      title: <FormattedMessage id="admin/table-seller-invoice" />,
      // eslint-disable-next-line react/display-name
      cellRenderer: (props: any) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href={`/admin/app/commission-report/invoice/${props.data.href}`}
            style={{ color: '#0C389F' }}
            target="_self"
            rel="noreferrer"
          >
            {props.data.idVisible}
          </a>
        )
      },
    },
    {
      id: 'invoiceCreatedDate',
      title: <FormattedMessage id="admin/table-seller-created" />,
    },
    {
      id: 'status',
      title: <FormattedMessage id="admin/table-seller-status" />,
      cellRenderer: (props: any) => {
        // eslint-disable-next-line array-callback-return
        const getColor = Object.keys(status).find(
          (itemStatus) => itemStatus === props.data
        )

        const bgColor = getColor ? status[getColor].bgColor : ''
        const fontcolor = getColor ? status[getColor].fontColor : ''

        return (
          <Tag bgColor={bgColor} color={fontcolor}>
            {props.data}
          </Tag>
        )
      },
    },
    {
      id: 'downloadFiles',
      title: <FormattedMessage id="admin/table-seller-download" />,
      // eslint-disable-next-line react/display-name
      cellRenderer: (props: any) => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <>
            <a
              href={`/_v/financial-commission/${props.data.sellerId}/invoice/${props.data.id}/generate/xml?sellerName=${props.data.sellerName}`}
              style={{ color: '#0C389F' }}
              target="_self"
              rel="noreferrer"
            >
              {/* {props.data.idVisible} */}
              XML
            </a>
            <span> | </span>
            <a
              href={`/_v/financial-commission/${props.data.sellerId}/invoice/${props.data.id}/generate/csv?sellerName=${props.data.sellerName}`}
              style={{ color: '#0C389F' }}
              target="_self"
              rel="noreferrer"
            >
              {/* {props.data.idVisible} */}
              CSV
            </a>
          </>
        )
      },
    },
  ]

  const changeRows = (row: number) => {
    setPageSize(row)
    setItemTo(row)
    setItemFrom(1)
    setPage(1)
  }

  const onNextClick = () => {
    const nextPage = page + 1

    const currentTo = pageSize * nextPage
    const currentFrom = itemTo + 1

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(nextPage)
  }

  const onPrevClick = () => {
    const previousPage = page - 1

    const currentTo = itemTo - pageSize
    const currentFrom = itemFrom - pageSize

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(previousPage)
  }

  return (
    <PageBlock>
      <div>
        <TableComponent
          schemaTable={schemaTableInvoice}
          items={dataTableInvoice}
          loading={false}
        />
        <PaginationComponent
          setPageSize={setPageSize}
          currentPage={itemFrom}
          pageSize={itemTo}
          setPage={setPage}
          totalItems={totalItems}
          onNextClick={onNextClick}
          changeRows={changeRows}
          onPrevClick={onPrevClick}
        />
      </div>
    </PageBlock>
  )
}

export default SellerInvoices
