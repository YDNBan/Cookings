Welcome to the -components folder, 

- The reason this exist is because upon figuring up how to set up a Express / React environment
- I knew files we going to get messy really fast and it was going to be hard to keep track.

For react, a component based UI tool, I've decided to opt for a structure architecture called "ATOMIC STRUCTURE"

Here's how it works:

- In the -src folder, all components will go in the -components folder
- The -components folder is further organized into 5 differnet folders

    1. Atoms 
        - This is where basic single level dom elements will exist
        - Like a button
    2. Molecules
        - This is where a small collection of atoms will exist
        - Like a form element that consist of input tags and a submit button
    3. Organisms
        - This is where more complex UI components will exist, this is a larger collection of atoms amd molecules to serve a specific purpose
        - Like a Navbar, or Carousel
    4. Templates
        - Templates define your structure and layout that multiple pages might use, this does not include any data yet.
        - Acts as a blueprint for pages
        - This includes stuff like header, footer, main-layout
    5. Pages 
        - Your final product goes here, pages use templates and add *real data*. 
        - Pages incoporates EVERYTHING from the components folder mentioned above, it will use templates, organisms, molecules, and atoms.
        - This includes pages like your: home, profile, dashboard, about us, etc

Additional Important Information

- Let's say you want to create a navbar component. What does that look like?
- When creating components, first decide where does it make sense to put. 
- Navbar would most likely be a organisms since it serves a specific purpose
- Now that you decided it belongs in -organisms, you have to create another subfolder called navbar as well
- All components will consist of 2 files, js for functionaility and css for styling
- So your navbar subfolder will have 2 files --> navbar.js and navbar.css
- This is the convention I need you all to follow when creating components


- TLDR --> all components will further be organized into subfolders named after themselves. 
       --> i.e navbar.js and navbar.css are in -navbar which is in -organisms