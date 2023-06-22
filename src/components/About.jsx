import React from 'react';
import aboutImage from '../assets/images/about-image.jpg';
import githubImage from '../assets/images/github-image.svg';

const About = () => {
  return (
    <div className="board-content about">
      <div>
        <h1>milohill</h1>
        <a href="https://github.com/milohill"><img src={githubImage} alt="github image" /></a>
      </div>
      <div>
        <img src={aboutImage} alt="about image" />
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
          vitae, blanditiis minus rerum voluptate ut laboriosam eum
          exercitationem molestiae sequi ipsa sapiente esse suscipit aliquam
          voluptatem similique quibusdam alias mollitia quos. Repudiandae
          expedita eveniet, mollitia placeat corporis enim, asperiores minima
          ratione error consequuntur incidunt rem voluptatibus quidem. Alias
          deleniti, ipsam officia, ea laboriosam accusamus delectus corrupti
          quod aut quisquam tenetur eum iure blanditiis optio, nam ullam soluta
          dicta impedit excepturi. Deserunt, accusantium assumenda enim maxime
          sed iusto ex iure placeat id tenetur dolor natus aperiam autem ab
          consequuntur unde, praesentium fugiat. Labore dolorem consequuntur
          impedit ut nemo commodi maxime nisi?
        </div>
      </div>
    </div>
  );
};

export default About;
