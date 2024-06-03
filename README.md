<img width="849" alt="Screenshot 2024-05-27 at 5 56 37 PM" src="https://github.com/myselfakashagarwal/pweb/assets/106314226/a2505e19-4b3b-40c3-aa4b-1e2228ad0831">

## About 
pweb is a codebase intigrated, containerised modular pipeline with Continuous Intigrations & Devivery with semi automatic deployments. Used for building webGL portfolio website.

## Components 
- Develop   - for continious intigrations and development
- Build     - for creating deployable builds and pushing them to artifact repository 
- Deploy    - for deployments 
- Update    - for updating old deployments with new ones 

### Develop
The development phase is handled with containers init the complete legacy codebase is mounted with its compatiable environment at the run time, this combination removes the environment dependency errors needed by the legacy codebase but also provides features like hot reload and ability to freely develop in the controlled environment.

### Build 
The build phase is handled by pweb:build containerised instance this image is build on top of jenkins with two jobs pweb_build pweb_push, the build job generates needed generic static files required from the code base using bundler, after that creates a deployable AMI with nginx base image. The deployable build created is then pushed to registery by the pweb_push job. The modularity is such that the builds which are created are stored on the host, configuration files are mounted from the codebase (provides flexibility to change any configurations) and host daemon is used to run containers for tasks inside jobs.

### Deploy & Update 
Meanwhile a cloud VM instance with docker setup is kept running with two instances, one the deployable build created during the build phase and other watch tower. The watch tower handles the work of automatic deployments by automaticially pulling the new builds (on push) and replacing them with old version with same configurations and graceful shutdowns.  

## Working 
The whole pipeline can be abstracted with pweb.yml a docker-compose file which contains multiple configured environments. The profiles are defined within fro spawning envs as per needed, like development profile for development phase build profle for building phase and deploy and update for the cloud.

## Use
(assumed user in present inside the cloned repo)

To spawn the environment ANY <syntax>
```bash
docker-compose -f pweb.yml --profile ${DESIRED-ENV} up
```

To spawn the environment for development <command>
```bash
docker-compose -f pweb.yml --profile development up
```

To spawn the environment for creatinfg and pushing builds <command>
```bash
docker-compose -f pweb.yml --profile build up
```

To spawn complete pipeline <command>
```
docker-compose -f pweb.yml --profile pweb up
```

<hr>
