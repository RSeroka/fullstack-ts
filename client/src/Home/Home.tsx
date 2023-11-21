

import './Home.css';
import ClientStackImg from './clientstack.svg';
import ServerStackImg from './serverstack.svg';
import DockerImageStackImg from './dockerimage.svg';
import AWSEC2InstanceStackImg from './awsec2instance.svg';

import FontAwesomeIconElementFactory from '../FontAwesomeFacade/FontAwesomeElementFactory';

function Home() {
    return (
      <div>
        <h3>Fullstack Application</h3>

        <p>This website is put together as a fullstack application comprised of client-side framework working in conjunction with server-side REST API services.</p>
        <p>All source code found at <a target="_blank" rel="noreferrer" href="https://github.com/RSeroka/fullstack-ts">github.com/RSeroka/fullstack-ts</a>&nbsp;<span>{FontAwesomeIconElementFactory.instance.create('arrow-up-right-from-square')}</span> </p>
        <p></p>

        <h4>Client</h4>

        <p>The client is written in TypeScript and CSS as a Progressive Web App (PWA) with the React Application Framework.   It also utilizes the Bootstrap UI Framework and Font Awesome Fonts.</p>
        
        <img className="home__diagrams" src={ClientStackImg} alt="Client Stack Diagram" />

        <p></p>

        <h4>Server</h4>
        <p>Server application is based upon the Express Web application framework running on the Node.js runtime environment.</p>
 

        <img className="home__diagrams" src={ServerStackImg} alt="Server Stack Diagram" />
        <p></p>

        <h3>Deployment</h3>

        <h4>Docker</h4>

        <p>The source code contains a script and Dockerfile configuration file to create a Docker image.  
            This image is publicly available through Docker Hub as&nbsp; 
            <a target="_blank" rel="noreferrer" href="https://hub.docker.com/r/rseroka/fullstack-ts">rseroka/fullstack-ts</a>&nbsp;<span>{FontAwesomeIconElementFactory.instance.create('arrow-up-right-from-square')}</span>,  and contains the full application including the client and server components. </p>

        {   // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img className="home__diagrams" src={DockerImageStackImg} alt="Docker Image Stack Diagram" /> 
        }

        <p></p>

        <h4>AWS</h4>
        <p>Since we are not expecting any appreciable volume and high availability is not a constraint, a single AWS EC2 instance without AWS EKS Kubernetes services is used to host the Web Application</p>
        <p>AWS's EC2 was used to create a single instance of a Ubuntu 22.04, t2.micro, with minimum storage.</p>
        <p>A Docker Engine was installed from Docker's apt repository onto the single AWS ECS instance.</p>
        <p>Docker commands load the Docker Image from Docker Hub and subsequently start container to run the Web Application.</p>

        <img className="home__diagrams" src={AWSEC2InstanceStackImg} alt="AWS EC2 Instance Stack Diagram" /> 

      </div>
    );
  }


  export default Home;