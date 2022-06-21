interface Invoice {
  comment?: string
  invoiceCreateDate?: string
  orders?: [Order]
  seller?: Seller
  status?: string
  totalizers?: Totalizers
}

interface DataFilter {
  label: string
  value: {
    id: string
    name: string
  }
}

interface CellRendererProps {
  data: string
  density: string
  motion: {
    transaction: string
    willChange: string
  }
  rowHeight: number
}

interface DataSellerSelect {
  account: string
  freightCommissionPercentage: number
  id: string
  isActive: boolean
  name: string
  productCommissionPercentage: number
}

interface ModalConfirmData {
  buttonMessage: any
  messages: MessagesData
  sellerData: SellerData
  invoiceMutation: any
  disabled: boolean
}

interface MessagesData {
  confirmation: any
  warning: any
}

interface SellerData {
  startDate: string
  finalDate: string
  sellerName: string
  id: string
}

interface TableData {
  items: any
  schemaTable: SchemaTable[]
  loading: boolean
  sorting?: any
  hiddenColumn?: string[]
}

interface SchemaTable {
  id: string
  title: any
  cellRenderer?: (props: CellRendererProps) => void
}

interface CellRendererProps {
  data: string
  density: string
  motion: {
    transaction: string
    willChange: string
  }
  rowHeight: number
}

interface FilterProps {
  startDatePicker?: Date
  finalDatePicker?: Date
  optionsSelect: SellerSelect[]
  setStartDate?: (v: string) => void
  setFinalDate?: (v: string) => void
  defaultStartDate?: string
  defaultFinalDate?: string
  setTotalItems?: (v: number) => void
  setPages?: (v: number) => void
  setSellerId: (v: string) => void
  setId?: (v: string) => void
  multiValue: boolean
  optionsStatus?: any
  setStatusOrders?: any
  disableSelect?: boolean
}

interface SellerSelect {
  value: {
    id: string
    name: string
  }
  label: string
}

interface SelectProps {
  options: DataFilter[]
  dataFilter: DataFilter[]
  setDataFilter: (v: DataFilter[]) => void
  multi: boolean
  customLabel: any
}

interface DataFilter {
  label: string
  value: {
    id: string
    name: string
  }
}

interface DatepickerProps {
  startDateFilter: Date | string
  startDatePicker: Date | undefined
  changeStartDate: (start: Date) => void
  finalDateFilter: Date | string
  finalDatePicker: Date | undefined
  changeFinalDate: (final: Date) => void
}

interface PaginationProps {
  setPageSize: (v: number) => void
  currentPage: number
  pageSize: number
  setPage: (v: number) => void
  totalItems: number
  onNextClick: () => void
  changeRows: (row: number) => void
  onPrevClick: () => void
}
