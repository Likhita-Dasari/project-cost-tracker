<h1>Project Cost Tracker 
</h1> <br/>
A mini web application to track project costs, built with React, Redux Toolkit, Chakra UI, and Firebase. Users can log in, add/edit/delete items and other costs, and view the total cost dynamically. The app includes offline persistence using Redux middleware to save state to localStorage.
<a href="https://drive.google.com/file/d/1eEi3dHUMMuYdUAUKwTKeuPfMVeUMev-B/view">Project-live-Demo</a>
Screenshots:
<img src="https://res.cloudinary.com/deitn1wgd/image/upload/v1747996517/Screenshot_154_p4qh0w.png" />
<img src="https://res.cloudinary.com/deitn1wgd/image/upload/v1747996680/Screenshot_155_ykp9kn.png" />
<img src="https://res.cloudinary.com/deitn1wgd/image/upload/v1747996731/Screenshot_156_jm62fk.png" />
<img src="https://res.cloudinary.com/deitn1wgd/image/upload/v1747996791/Screenshot_157_wos4og.png" />
<h1>Features</h1>

User Authentication: Sign up and log in using Firebase Authentication.



Cost Tracking: Add, edit, and delete items (name and cost) and other costs (description and amount).



Dynamic Total Cost: Automatically calculate and display the total cost of all items and other costs.



Responsive UI: Built with Chakra UI for a clean and responsive design.



Offline Persistence: State (items and other costs) is saved to localStorage for offline access using Redux middleware.



Real-time Data Sync: Syncs data with Firebase Firestore when online.

<h1>Usage</h1>





Sign Up/Login: Use the login page to create an account or sign in with an existing account.



Add Items and Costs:On the dashboard, use the "Add Item" button to add items (name and cost).Use the "Add Other Cost" button to add other costs (description and amount).



Edit/Delete: Click "Edit" or "Delete" next to an item or cost to modify or remove it.



View Total Cost: The total cost updates dynamically at the top of the dashboard.



Offline Persistence: Items and other costs are saved to localStorage, so they persist across browser sessions. Note: You’ll need to log in again after a refresh, as authentication state is managed by Firebase.
