
![Logo](https://urbanfarmer.netlify.app/static/media/urban-farmer-logo.747fb3c3338aabdcd514.png)


# UrbanFarmer-Client

A user-friendly app for connecting city residents passionate about urban farming and craft food production. Streamlined item listing for trade and facilitated community connections for food enthusiasts.


## Requirements

This app requires [UrbanFarmer-server](https://github.com/gabrielabl/UrbanFarmer-server) installed and running.


## Packages
AXIOS
DOTENV REACT-ROUTER-DOM SASS MATERIAL UI
## Local Installation

1. Clone project to local machine

```bash
gh repo clone gabrielabl/UrbanFarmer-client
```
2. Move to UrbanFarmer-server folder

```bash
cd UrbanFarmer-server
```

3. Install node modules

```bash
npm i 
```
3. Rename .env.sample file

```bash
mv .env.sample .env
```
  
5. Update environment variable to local server

`REACT_APP_BASE_URL= <urbanfarmer-server>`

6. Run application


```bash
npm run
```
## Functionality

- AUTH: Login & Signup
- PROFILE - create and edit
- COLLECTION ITEM: add,edit and delete
- SEARCH: get all collection items or defined by user
- MESSAGES: communicate with other users, create new conversations and send messages


## Future Implementation 


### Phase 2

- Friends: Enabling feature to link and add other users to your profile. The user profile will include a box that contains all friends and other profiles will have an “add friend” button. 

### Phase 3

- Testimonials: Enables users that have a link throughout friendship to post testimonials in each other's profile. Also enabling the receiver to delete testimonials. 

- Likes: Implementing a like button in the profile.

- Views: Implementing a view counter that will be updated every time another user visualizes the user’s profile. 

## Deployed version

https://urbanfarmer.netlify.app/



## Author

[@gabrielabl](https://github.com/gabrielabl)

