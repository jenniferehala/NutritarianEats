<div id="top"></div>




[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jenniferehala/NutritarianEats">
    <img src="https://user-images.githubusercontent.com/87871681/168386875-f130757d-54b7-4bb5-b81f-49c550101faa.png" alt="Logo" width="180" height="180">
  </a>

  
  
  
<h3 align="center">Nutritarian Eats</h3>

  <p align="center">
    The NutritarianEats website is a tool for users to create their favorite recipes, either inspired by others or create new recipes for themselves, and have a repository of this information at their fingertips. Many nutritarian recipes are hard to come by and need a paid subscription to access. This website is free to use and access so that everyone can incorporate healthy living into their every day food choices.
    <br />
    <a href="https://github.com/jenniferehala/NutritarianEats"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/f2GPT2cmJBs">View Demo</a>
    ·
    <a href="https://github.com/jenniferehala/NutritarianEats/issues">Report Bug</a>
    ·
    <a href="https://github.com/jenniferehala/NutritarianEats/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1419" alt="Screen Shot 2022-05-13 at 4 48 15 PM" src="https://user-images.githubusercontent.com/87871681/168387278-3ce92bba-4353-4cea-b5e4-d31d76781bf6.png">

As a society, we continue to pursue healthy lifestyles and healthy living, and even create diet plans to help with our diet goals. As people face constant messaging on what healthy foods are, finding appropriate online resources is important for their optimal health. NutritarianEats was inspired to facilitate access to healthy recipes at no cost. A repository of free nutritarian recipes.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Bootstrap](https://getbootstrap.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/jenniferehala/NutritarianEats.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Login/Registration 
  <p> Login and Registration with validations such as validating unique email address and validating that both 
  passwords match that were input by the user to confirm. </p>
  
https://user-images.githubusercontent.com/87871681/168390340-03c542f1-a63e-45c8-b1cc-7d3eb6616e2b.mov

<br />
  
- [ ] Home Page
  <p> Classic homepage layout with a navbar, functional search bar, hyperlinks to latest recipes, random recipes, and grouped recipes by cuisine. </p>


https://user-images.githubusercontent.com/87871681/168390652-75a7899e-a95c-4f50-bd56-cde0dea44615.mov


<br />

- [ ] Randomizing Feature
   <p> Random feature allows user to go through the database with the on click function to randomize recipes. </p>
https://user-images.githubusercontent.com/87871681/168362188-37b1be82-feb1-418b-9ebb-f84a74e619e9.mov

<br />


- [ ] Rating Feature
  <p> A star rating component was used to display on a single details page. Making sure the limit was five stars and would display the correct amount of yellow stars versus the grey stars indicating an empty rating. </p>
  

https://user-images.githubusercontent.com/87871681/168393129-550c8e46-cdc0-453a-9af2-c4b2065cb578.mov



<br />
  
- [ ] Create Feature
    <p> Create page allows user to create their own recipe which is protected by requirement validations to make sure each field is used. The ingredients section is a nested feature with each unique key pair value within the ingredients list object. The handlers for adding and removing multiple ingredients allows for easier viewing and reading when entering and displaying data on the details page.</p>


https://user-images.githubusercontent.com/87871681/168392604-4d54b7e7-0fe2-446a-bde1-e9d670e47539.mov

<br />

- [ ] Search Feature
  <p> Searching for recipes is made easy by the search bar in the navigation section that is visible and functional on every page on the website. It uses regex search match to find and match the keyword entered in the input.  </p>
  
  

https://user-images.githubusercontent.com/87871681/168394749-6c08ad29-d8f8-4e34-9fba-8545b4763d8b.mov


  
  

  See the [open issues](https://github.com/jenniferehala/NutritarianEats/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jennifer Ehala - [@jenniferehala](https://twitter.com/jenniferehala) - jennifer.ehala@gmail.com

Project Link: [https://github.com/jenniferehala/NutritarianEats](https://github.com/jenniferehala/NutritarianEats)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jenniferehala/NutritarianEats.svg?style=for-the-badge
[contributors-url]: https://github.com/jenniferehala/NutritarianEats/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jenniferehala/NutritarianEats.svg?style=for-the-badge
[forks-url]: https://github.com/jenniferehala/NutritarianEats/network/members
[stars-shield]: https://img.shields.io/github/stars/jenniferehala/NutritarianEats.svg?style=for-the-badge
[stars-url]: https://github.com/jenniferehala/NutritarianEats/stargazers
[issues-shield]: https://img.shields.io/github/issues/jenniferehala/NutritarianEats.svg?style=for-the-badge
[issues-url]: https://github.com/jenniferehala/NutritarianEats/issues
[license-shield]: https://img.shields.io/github/license/jenniferehala/NutritarianEats.svg?style=for-the-badge
[license-url]: https://github.com/jenniferehala/NutritarianEats/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: "https://user-images.githubusercontent.com/87871681/168387278-3ce92bba-4353-4cea-b5e4-d31d76781bf6.png">


<!--  *********************************** -->



