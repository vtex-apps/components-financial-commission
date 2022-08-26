**📢 Don't fork this project. Use, contribute, or open issues through Store Discussion.**



# COMPONENTS FINANCIAL COMMISSION 

**Components Financial Commission**  is an app that can be used to create the interfaces in other apps in charge of generating and showing the sales commissions 

</br>
 </br>

 > :warning:
 > **This app was designed to be used in the Financial Commission App**. Please, validate if you want to use this app in another implementation.
 
 </br>

## How to import this app

Add in the section `dependencies` of the manifest file of the app to use, the next instruction that show you below.

```powershell
"dependencies":{
  "vtex.components-financial-commission": "0.x"
}
```
</br>

**Important:** Remember to validate the version. For this, go to the repository [Here](https://github.com/vtex-apps/components-financial-commission)

</br>

## Project Structure

Here you find the structure of the project folder. The changes made in this app will be reflected in the apps using the **Components Financial Commission** app in the dependencies

![image](https://user-images.githubusercontent.com/8409481/186645144-3aeb1c81-245b-4948-b80c-8bf653499b3f.png)

</br>


**Components folder**

Here you find all elements shared or common between screens. 

A large part of components receives the data from `props`.

</br>

**Utils Folder**

In this folder you find the common operations, for example: 

- Get the date in string format to the using it in the services request
- Get the first day of the month
- Functions of filters to use in the components related with filters
</br>


**Typings Folder**

Add the interfaces or commons types to you'll use in the app.

</br>

**Root Folder**

Here you can find the folder `message`. Here add the files `en.json` with all the dynamic text. Also, you should add the file `context.json` with the explanation of the use of each dynamic text.

</br>

## How to use this app

Import the components that you need in your project, for example:

```jsx
import { detail as Detail } from 'vtex.components-financial-commission'

return (
    <Detail
      dataSellers={dataSellers}
      ordersQuery={SEARCH_ORDERS}
      invoiceMutation={CREATE_INVOICE}
      invoicesQuery={SELLER_INVOICES}
      settingsQuery={GET_SETTINGS}
    />
  )

/** Types */
interface DetailProps {
  account?: string
  dataSellers?: {
    getSellers: {
      pagination: Pagination
      sellers: [DataSellerSelect]
    }
  }
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}
```
</br>

The components available with the assigned types:

```jsx
import { settings as Settings } from 'vtex.components-financial-commission'

return (
    <Settings
      getSellersQuery={GET_SELLERS}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
      editToken={EDIT_TOKEN}
      createTokenMutation={CREATE_TOKEN}
      getTokenQuery={GET_TOKEN}
    />
  )

/** Types */
interface DetailProps {
  account?: string
  dataSellers?: {
    getSellers: {
      pagination: Pagination
      sellers: [DataSellerSelect]
    }
  }
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}
```

```tsx
import { commissionReport as Report } from 'vtex.components-financial-commission'

return (
    <Report
      getSellersQuery={GET_SELLERS}
      searchStatsQuery={SEARCH_STATS}
      searchSellersQuery={SEARCH_SELLERS}
    />
  )

/** Types */
interface ReportProps {
  getSellersQuery: DocumentNode
  searchStatsQuery: DocumentNode
  searchSellersQuery: DocumentNode
}
```

```tsx
import { settingsDetail as SettingsDetail } from 'vtex.components-financial-commission'

return (
    <SettingsDetail
      createTokenMutation={CREATE_TOKEN}
      editToken={EDIT_TOKEN}
      getTokenQuery={GET_TOKEN}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
    />
  )

/** Types */

interface SettingsDetailProps {
  createTokenMutation: DocumentNode
  editToken: DocumentNode
  getTokenQuery: DocumentNode
  createSettingsMutation: DocumentNode
  getSettingsQuery: DocumentNode
}
```

```jsx
import { invoiceDetail as InvoiceDetail } from 'vtex.components-financial-commission'

return (
    <InvoiceDetail
      invoiceQuery={GET_INVOICE}
      getTemplate={GET_TEMPLATE}
      sendEmail={SEND_EMAIL}
    />
  )

/** Types */

interface InvoiceDetailProps {
  invoiceQuery: DocumentNode
  getTemplate: DocumentNode
  sendEmail: DocumentNode
}
```

Use the types to identify the data to pass between props of the components.


---

**Other things about the project:**

`🚫` Please, don't upload the file `yarn.lock`. Remove this file of the `commit`.

`✅` When you clone the project, create your work branch from `develop`.

`✅` Upload your changes by making a `pull request`.

`⚠️` Not forget to update the version and documentation. This last only if this is necessary.
