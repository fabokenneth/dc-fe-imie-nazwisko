# Digital Colliers Task

The goal of the task is to create a SPA that will allow its users to browse characters of
Rick & Morty series and create a list of favorite characters.

###  Link To The app
[https://dreamy-shannon-a90ada.netlify.app/](https://dreamy-shannon-a90ada.netlify.app/)

### Available Functionalities
1. List All Characters
    1. List All Characters 
    2. Mark/Unmark Some Characters as Favorite
    3. Go to Specific page 
    4. Filter by Name, Identifier or Episode

2. List Favorites Characters
    1. Unmark Some Characters as Favorite
    2. List All Favorites
    3. Filter by Name, Identifier or Episode    

3. User is able to choose between the following languages 
    1. English
    2. French
    3. German

Searching by episode has been left over because I needed more information to better understand the intention 
behind the current GraphQL API structure.    
    
###  Technologies
1. Vue 3 (with 100% composition API)
2. Vite
3. TypeScript
4. GraphQL
5. Tailwind CSS
6. Cypress for End-to-End Testing   
7. JEST for some unit tests
8. Axios (Make the http call REST Browser-agnostic)


### To run the app locally

1. go to the root folder of the project and execute ` npm run dev`
2. You will have the link to access the app locally (ex: `http://localhost:3000/`)

### Scenarios Covered by E2E Tests
1. List All Characters
    1. List All Characters
    2. Mark/Unmark Some Characters as Favorite
    3. Go to Specific page
    4. Filter by Name or Identifier    

2. List Favorites Characters
    1. List All Favorites
    2. Filter by Name, Identifier or Episode
    3. Specific Message if empty character list

### To run the e2e tests
1. go to the root folder of the project and execute ` npm run dev`
2. execute this command `npm run test:e2e_debug` then you will have cypress interface opened
3. Choose the TestSuite you want to execute and choose the browser to use.

### Unit tests
Some unit tests have been implemented too. They target reusable components in priority.
The tests components are:
- Gender.vue
- LanguagePicker.vue

The other components were not tested because I did not have enough times. The idea here is just to demonstrate 
my capabilities to write unit tests for VUE3 components.

### Run Unit Tests
Just execute the following instruction from the project root directory: `npm run test:unit`