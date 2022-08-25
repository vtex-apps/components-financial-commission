**📢 Don't fork this project. Use, contribute, or open issues through Store Discussion.**

# COMPONENTS FINANCIAL COMMISSION

**Components Financial Commission**  is an app that can be used to create the interfaces in other apps in charge of generating and showing the sales commissions 


## How use this app

Add in the section `dependencies` of the manifest file of the app to use, the next instruction that show you below.

```powershell
"dependencies":{
  "vtex.components-financial-commission": "0.x"
}
```

**Important:** Remember to validate the version. For this, go to the repository [Here](https://github.com/vtex-apps/components-financial-commission)

## Project Structure

Here you find the structure of the project folder. The changes made in this app will be reflected in the apps using the **Components Financial Commission** app in the dependencies

![image](https://user-images.githubusercontent.com/8409481/186645144-3aeb1c81-245b-4948-b80c-8bf653499b3f.png)


**Components folder**

Here you find all elements shared or common between screens. 

A large part of components receives the data from `props`.

**Utils Folder**

In this folder you find the common operations, for example: 

- Get the date in string format to the using it in the services request
- Get the first day of the month
- Functions of filters to use in the components related with filters


**Typings Folder**

Add the interfaces or commons types to you'll use in the app.

**Root Folder**

Here you can find the folder `message`. Here add the files `en.json` with all the dynamic text. Also, you should add the file `context.json` with the explanation of the use of each dynamic text.

---

**Other things about the project:**

- Please, don't upload the file `yarn.lock`. Remove this file of the `commit`.
- When you clone the project, create your work branch from `develop`.
- Upload your changes by making a `pull request`.
- Not forget to update the version and documentation. This last only if this is necessary. 
