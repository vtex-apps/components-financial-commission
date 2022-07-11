/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/display-name */
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  Tab,
  Tabs,
  PageBlock,
  PageHeader,
  Divider,
  Modal,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import type { DocumentNode } from 'graphql'

import SellerInvoices from './components/SellerInvoices'
import SellerOrders from './components/SellerOrders'
import Orders from './components/Orders'
// import SettingsTable from './components/SettingsTable'
import { Filter } from './components'
import { status } from './constants'

interface DetailProps {
  account?: string
  dataSellers?: any
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}

const CommissionReportDetail: FC<DetailProps> = (props) => {
  const {
    account,
    ordersQuery,
    invoiceMutation,
    dataSellers,
    invoicesQuery,
    settingsQuery,
  } = props

  const [startDate, setStartDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [defaultStartDate, setDefaultStartDate] = useState('')
  const [defaultFinalDate, setDefaultFinalDate] = useState('')
  const [optionsSelect, setOptionsSelect] = useState<DataFilter[]>([])
  const [sellerName, setSellerName] = useState(account ?? '')
  const [sellerId, setSellerId] = useState('')
  const [tabs, setTabs] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [dateRate, setDataRate] = useState<any>([])
  const [optionsStatus, setOptionsStatus] = useState<any>([])
  const [statusOrders, setStatusOrders] = useState('')

  const formatDate = (valueDate: number) => {
    const validateDate = valueDate <= 9 ? `0${valueDate}` : valueDate

    return validateDate
  }

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (dataSellers) {
      const builtSelectSeller: DataFilter[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSellerSelect) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSellers])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (!optionsStatus.length) {
      const buildSelectStatus: any[] = []

      Object.keys(status).forEach((orderStatus) => {
        buildSelectStatus.push({
          value: { id: orderStatus, name: orderStatus },
          label: orderStatus,
        })
      })
      setOptionsStatus(buildSelectStatus)
    }
  }, [optionsStatus])

  useEffect(() => {
    const defaultDate = new Date()
    let defaultStart: Date = new Date()
    const defaultfinal = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      defaultDate.getDate()
    )

    const defaultFinalString = `${defaultfinal.getFullYear()}-${formatDate(
      defaultfinal.getMonth() + 1
    )}-${formatDate(defaultfinal.getDate())}`

    if (defaultDate.getDate() <= 1) {
      defaultStart = defaultfinal
    } else {
      defaultStart = new Date(
        defaultDate.getFullYear(),
        defaultDate.getMonth(),
        1
      )
    }

    const defaultStartString = `${defaultStart.getFullYear()}-${formatDate(
      defaultStart.getMonth() + 1
    )}-${formatDate(defaultStart.getDate())}`

    setStartDate(defaultStartString)
    setFinalDate(defaultFinalString)
    setDefaultStartDate(defaultStartString)
    setDefaultFinalDate(defaultFinalString)
  }, [])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.detail-title" />}
        />
      }
    >
      {/* <SettingsTable schemaTable={[]} /> */}
      <Modal
        centered
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
      >
        <div className="mb3">
          {dateRate.map((elmRate: any) => (
            <div key="elmRate">
              <h2>Item ID: #{elmRate.itemId}</h2>
              <p>
                <b>Name Item: </b> {elmRate.nameItem}
              </p>
              <p>
                <b>Freight Commission Percentage: </b>
                {elmRate.rate.freightCommissionPercentage}%
              </p>
              <p>
                <b>Producto Commission Percentage: </b>
                {elmRate.rate.productCommissionPercentage}%
              </p>
              <Divider />
            </div>
          ))}
        </div>
      </Modal>
      <div className="mt4 mb7">
        {startDate && finalDate && (
          <div className="mt2">
            <PageBlock>
              <Filter
                startDatePicker={new Date(`${startDate}T00:00:00`)}
                finalDatePicker={new Date(`${finalDate}T00:00:00`)}
                optionsSelect={optionsSelect}
                setStartDate={setStartDate}
                setFinalDate={setFinalDate}
                defaultStartDate={defaultStartDate}
                defaultFinalDate={defaultFinalDate}
                setSellerId={setSellerName}
                setId={setSellerId}
                multiValue={false}
                optionsStatus={optionsStatus}
                setStatusOrders={setStatusOrders}
                disableSelect={Boolean(account)}
              />
            </PageBlock>
          </div>
        )}
      </div>
      <div className="mt7">
        <Tabs fullWidth>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-commission" />}
            active={tabs === 1}
            onClick={() => setTabs(1)}
          >
            <div className="mt5">
              {settingsQuery ? (
                <SellerOrders
                  ordersQuery={ordersQuery}
                  account={account}
                  sellerName={sellerName}
                  startDate={startDate}
                  finalDate={finalDate}
                  statusOrders={statusOrders}
                  setDataRate={setDataRate}
                  sellerId={sellerId}
                  invoiceMutation={invoiceMutation}
                  setOpenModal={setOpenModal}
                  openModal={openModal}
                  settingsQuery={settingsQuery}
                />
              ) : (
                <Orders
                  ordersQuery={ordersQuery}
                  account={account}
                  sellerName={sellerName}
                  startDate={startDate}
                  finalDate={finalDate}
                  statusOrders={statusOrders}
                  setDataRate={setDataRate}
                  sellerId={sellerId}
                  invoiceMutation={invoiceMutation}
                  setOpenModal={setOpenModal}
                  openModal={openModal}
                />
              )}
            </div>
          </Tab>
          <Tab
            label={<FormattedMessage id="admin/table.title-tab-invoices" />}
            active={tabs === 2}
            onClick={() => setTabs(2)}
          >
            <div className="mt5">
              <SellerInvoices
                invoicesQuery={invoicesQuery}
                account={account}
                sellerName={sellerName}
                startDate={startDate}
                finalDate={finalDate}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CommissionReportDetail
